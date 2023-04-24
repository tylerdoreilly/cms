<template>
  <exai-loader v-if="loading === true"></exai-loader>
  <div v-else>
    <page-layout sidebar>
      <template v-slot:content>

        <PageHeader title="Edit Template">
          <exai-button text="Preview" @click.native="preview = !preview"></exai-button>
          <exai-button text="Save" variation="primary" @click.native="saveTemplate()"></exai-button>
        </PageHeader>
        <PageDetails 
          :title="template.title" 
          :type="template.type" 
          :date="template.date_created" 
          :asof="template.date_asof" 
          :updated="template.date_updated">
          <exai-button text="Edit" @click.native="editTemplateDetails = !editTemplateDetails"></exai-button>
          <exai-button text="Details" @click.native="showDetails = !showDetails"></exai-button>
          <exai-button text="Lock/Unlock" icon-left="fa-lock" @click.native="lockItems()"></exai-button>   
        </PageDetails>

        <template-container v-if="preview == false && items">
          <div v-for="(item, index) in items" :key="item.id" ref="item" :class="handleDropClasses(item)"       
            draggable
            @dragstart.self="pickupElem($event, item, index);"
            @dragover.prevent="showDropPlace($event, item, index);"
            @dragenter.prevent
            @drop="moveElem($event, item, index);"
            @dragend.prevent="dragEndClear();">

            <component 
                v-if="item"
                class="template-list__item"
                :class="{'template-list__item--is-dragged': dragedElem && item.id === dragedElem.id}"
                :is="item['field']" 
                :data="item" 
                :title="item['name']"
                :listCount="items.length"
                v-bind:showDetails="showDetails"
                v-bind:activated="true" 
                @remove-item="checkBeforeRemove($event)"
                @save-custom-item="openCustomItemModal($event)"
                @lock-item="lockItem(item)">
            </component>
          
          </div>
        </template-container>
       
        <document-preview :data="items" v-if="preview == true"></document-preview>

      </template>
      <template v-slot:sidebar-right>
        <template-toolbar 
          v-if="templateItems && customTemplateItems"
          title="Toolbar"
          :toolbarItems="templateItems"
          :libraryItems="customTemplateItems"
          @dragTemplateItem="dragTemplateItem">
        </template-toolbar>
      </template>
    </page-layout>

    <exai-prompt 
      v-if="itemToRemove"
      v-show="showPrompt"
      title="Remove Template Item" 
      message="Are you sure you want to remove this item?" 
      :data="itemToRemove"
      @close-modal="showPrompt = false" 
      @close-and-submit="removeItem($event)">
    </exai-prompt>

    <template-details-edit 
      v-if="editTemplateDetails"
      :data="template"
      :types="templateTypes"
      @close-modal="editTemplateDetails = false" 
      @update-template-details=" updateTemplateDetails($event)">
    </template-details-edit>

    <template-save-custom-item 
      v-if="showSaveCustomItem"
      :data="customTemplateItem"
      @close-modal="showSaveCustomItem = false" 
      @save-custom-item=" saveCustomTemplateitem($event)">

    </template-save-custom-item>
  </div>
</template>

<script>
  import PageLayout from '../../../components/layout/PageLayout.vue'
  import PageHeader from '../../../components/layout/PageHeader.vue'
  import PageDetails from '../../../components/layout/PageDetails.vue'
  import TemplateContainer from '../../../components/templates/TemplateContainer.vue'
  import TemplateToolbar from '../../../components/templates/templateToolbar/TemplateToolbar.vue'
  import TemplateDetailsEdit from '../../../components/templates/TemplateDetailsEdit.vue'
  import TemplateSaveCustomItem from '../../../components/templates/TemplateSaveCustomItem.vue'
  import DocumentPreview from '../../../components/templates/DocumentPreview.vue'
  import ExaiButton from '../../../components/shared/ExaiButton.vue'
  import ExaiLoader from '../../../components/shared/ExaiLoader.vue'
  import ExaiPrompt from '../../../components/shared/ExaiPrompt.vue'
  import TemplateItemTextBlock from '../../../components/templates/templateItems/TemplateItemTextBlock.vue'
  import TemplateHeading from '../../../components/templates/templateItems/TemplateHeading.vue'
  import TemplateItemTextField from '../../../components/templates/templateItems/TemplateItemTextField.vue'
  import TemplateItemList from '../../../components/templates/templateItems/TemplateItemList.vue'
  import TemplateLayoutSingle from '../../../components/templates/templateItems/TemplateLayoutSingle.vue'
  import { getAllTemplateData } from '../../../services/TemplatesService'

  const axios = require('axios');

  export default {
    name: 'AdminTemplatesCreate',

    components: {
      PageLayout,
      PageHeader,
      PageDetails,
      TemplateContainer,
      TemplateDetailsEdit,
      TemplateSaveCustomItem,
      TemplateHeading,
      TemplateItemTextField,
      TemplateItemTextBlock,
      TemplateItemList,
      TemplateLayoutSingle,
      TemplateToolbar,     
      ExaiButton,
      ExaiLoader,
      ExaiPrompt,
      DocumentPreview,
    },

    data() {
        return {
          items: [],
          templateItems:[],
          templateTypes:[],
          customTemplateItems:[],
          id: this.$route.params.id,
          template: [],
          customTemplateItem:'',
          layouts:[],
          availableTemplateItems: [
            { id: 1, name: "Heading", position: 1, field:'TemplateHeading', content:'place heading here'},
            { id: 2, name: "Text Field", position: 2, field:'TemplateItemTextField', content:'place text here'},
            { id: 3, name: "Text Area", position: 3, field: 'TemplateItemTextBlock', content:'place paragraph here'},
            { id: 4, name: "List", position: 4, field: 'TemplateItemList', content:'place list here'}
          ],
          showPrompt:false,
          showDetails:false,
          dragedElem: null,
          overElem: null,
          preview: false,
          newInstance:false,
          lockedItems:false,
          itemToRemove:'',
          editTemplateDetails:false,
          showSaveCustomItem:false,
          loading:false,
      }
    },

    computed: {
      handleDropClasses() {
        return item => {
          let newElem = { ...this.dragedElem }
          let existingItemIds = this.items.map(a => a.id);
          let existingItem = existingItemIds.includes(newElem.id);
          console.log('existing item',existingItem)
          let itemsLength = this.items.length;

          if (!this.overElem || !this.overElem.id) {
            return "";
          }
          if(this.newInstance){
            if(itemsLength == 1 && this.overElem.id === item.id){
              console.log("item id",  item.id);
              console.log("over id", this.overElem.id);
              return "drop-place drop-place--after";
            }
            else if(itemsLength > 1 && this.overElem.id === item.id){
              console.log("item id",  item.id);
              console.log("over id", this.overElem.id);
              return "drop-place drop-place--after";
            }
          }
          else{
            if ( this.overElem.id === item.id && item.position < this.dragedElem.position) {
              console.log("before");
              return "drop-place drop-place--before";
            }
            if (
              this.overElem.id === item.id &&
              item.position > this.dragedElem.position
            ) {
              console.log("after");
              return "drop-place drop-place--after";
            }
          }
        };
      },

      randomId(){
        let randomId = Math.random() * Math.floor(1000);
        return Math.round(randomId)
      }
    },

    methods: {

      // Drag and Drop Methods
      dragEndClear() {
        console.log("dragEnd");
        this.dragedElem = null;
        this.overElem = null;
        console.log('overElem',this.dragedElem)
      },

      pickupElem(event, elem) {
        console.log(elem);
        event.dataTransfer.dropEffect = "move";
        this.dragedElem = { ...elem };
      },

      showDropPlace(event, elem) {
        if (elem.id !== this.dragedElem.id) {
          this.overElem = { ...elem };
          console.log('over element', this.overElem)
        } else {
          this.overElem = null;
          console.log('over element', this.overElem)
        }
      },

      moveElem(event, elem, index) {
        console.log(
          `moveElem: event: ${event} | elem: ${elem} | index: ${index}`
        );

        let newElem = { ...this.dragedElem }
        let existingItemIds = this.items.map(a => a.id);
        let existingItem = existingItemIds.includes(newElem.id);

        if(!existingItem){
          this.dragedElem = this.generateId(newElem);
          this.updateListOrder(index);
        }
        else{
          this.updateListOrder(index);
        }
           this.dragEndClear();     
      },

      updateListOrder(index){
        let newElem = { ...this.dragedElem }
        let existingItemIds = this.items.map(a => a.id);
        let existingItem = existingItemIds.includes(newElem.id);
        this.items = this.items.filter(item => item.id !== this.dragedElem.id);
        if(!existingItem){
          if(this.items.length == 1){
            this.items.splice(1, 0, { ...this.dragedElem });
            this.items.forEach((item, index) => (item.position = index + 1));
          }
          else{
            this.items.splice(index + 1, 0, { ...this.dragedElem });
            this.items.forEach((item, index) => (item.position = index + 1));
          }
        }else{
          this.items.splice(index, 0, { ...this.dragedElem });
          this.items.forEach((item, index) => (item.position = index + 1));
        }
        
       
        console.log('items',this.items)
      },

      addCard: function (template) {
        let randomId = Math.random() * Math.floor(1000);
        let selectedTemplate = this.availableTemplateItems.find(item => item.cardType == template);
        selectedTemplate['id'] = Math.round(randomId);

        this.items.push(selectedTemplate)
      },
      
      generateId: function (elem) {
        let randomId = Math.random() * Math.floor(1000);
        elem['id'] = Math.round(randomId);
        return elem
      },

      addLayout: function (layout) {
        let randomId = Math.random() * Math.floor(1000000);
        let selectedTemplate = this.availableTemplateItems.find(item => item.cardType == item);
        selectedTemplate['id'] = randomId;
        
        this.layouts.push({id: randomId, name: "Single Col Layout", position: 1, layoutType: layout})
      },

      dragTemplateItem(event, elem){
        this.dragedElem = { ...elem };
        this.showDropPlace(event, elem);
        this.newInstance = true;
        console.log('test')
      },

      setDefaultItem(){
        let randomId = Math.random() * Math.floor(1000);
        let defaultItem = {
          id: Math.round(randomId), 
          name: "Heading", 
          position: 1, 
          field:'TemplateHeading', 
          content:'place heading here'
        }
        this.items.push(defaultItem)
      },

      // Other Methods
      checkBeforeRemove(event){
        const elem = this.items.find(item => item.id == event)
        this.itemToRemove = elem;
        this.showPrompt = true;
      },

      removeItem(event){
        console.log('parent remove',event)
        const index = this.items.indexOf(event);
        if (index > -1) {
          this.items.splice(index, 1);
        }
        this.showPrompt = false;
      },

      lockItem(elem){
        console.log(elem)
        console.log(this.$refs)
        // let items = this.$refs
        this.$refs.item.forEach(item =>{
          item.draggable = false;
        })
      //  this.$ref.templateList.draggable = false
      },

      lockItems(){
        console.log(this.$refs)
        this.$refs.item.forEach(item =>{
          if(item.draggable == true){
            item.draggable = false;
            this.lockedItems = true;
          }else{
            item.draggable = true;
            this.lockedItems = false;
          }
          
        })
      },

      getDate(){
        let currentDate = new Date(Date.now()).toISOString();
        console.log(currentDate);
        return currentDate
      },

      toggleDetails(){
        this.showDetails = !this.showDetails;
      },

      openCustomItemModal(event) {
        this.showSaveCustomItem = true;
        this.customTemplateItem = event;
        console.log('template to save',event)
      },

      // Get and Save
      async saveTemplate(){
        this.template.data = [];
        let templateData = JSON.stringify(this.items);
          if (this.id) {
            let type = this.template.type_id;
            this.template.date_updated = this.getDate();
            this.template.type_new = type;
            this.template.data = templateData;
            const putData = this.template;

            try {
             await axios.put(`/api/templates/${this.id}`, putData, {
                headers: {
                  "x-access-token": "token-value",
                },
              });

              // const result = res;
              this.$toast("Template Saved Successfully");
            } 
            catch (err) {
             console.log(err)
            }
          }
      },

      async saveCustomTemplateitem(data){
        let clonedData = {...data}
        const customTemplateItemsLength = this.customTemplateItems.length;
        clonedData.id = customTemplateItemsLength + 1; 
        const putData = clonedData; 

        try {
          await axios.post(`/api/templateItemsCustom/`, putData, {
            headers: {
              "x-access-token": "token-value",
            },
          });

          this.$toast("Custom Template Item Created Successfully");

          this.customTemplateItems.push(clonedData);
        } 
        catch (err) {
          console.log(err)
        }
      },

      async updateTemplateDetails(data){
          if (this.id) {
            const putData = data;

            try {
             await axios.put(`/api/templates/${this.id}`, putData, {
                headers: {
                  "x-access-token": "token-value",
                },
              });

              // const result = res;
              this.$toast("Template Saved Successfully");
            } 
            catch (err) {
             console.log(err)
            }
          }
      },

      getAllData(){
        this.loading = true;
        getAllTemplateData(this.id).then(
          axios.spread(({data: template}, {data:templateItems}, {data:templateItemsCustom}, {data:templateTypes}) => {
            console.log({template, templateItems, templateItemsCustom, templateTypes });
            this.template = template.find(item => item);
            this.templateItems = templateItems;
            this.customTemplateItems = templateItemsCustom;
            this.templateTypes = templateTypes;

            if(this.template.data == null){
              this.setDefaultItem();
            }
            else{
              this.items = this.template.data;
            }
  
          })
        )
        .catch(error => {console.log(error) })
        .finally(() => (this.loading = false))
      },
    },

    mounted () {
      this.getAllData();
    }
  }
</script>

<style lang="scss">
 
  .template-list__item {
    // cursor: row-resize;
    // border: 1px solid $gunmetal;
    // padding: 5px;
    // margin-bottom: 10px;
    // transition: all 0.3s ease;
    // background:#fff;
  }

  .template-list__item--is-dragged {
    opacity: 0.7;
    border: 1px dashed skyblue;
  }

  .drop-place {
    position: relative;
    transition: all 0.3s ease;
  }
  .drop-place--before {
    padding-top: 80px;
  }
  .drop-place--after {
    padding-bottom: 80px;
  }
  .drop-place--before:before {
    position: absolute;
    top: 5px;
    left: 0;
    text-align: center;
    content: "Drop here";
    width: 100%;
    padding: 20px 0;
    opacity: 0.7;
    border: 1px dashed skyblue;
    background:$white-smoke;
  }
  .drop-place--after:after {
    position: absolute;
    bottom: 5px;
    left: 0;
    text-align: center;
    content: "Drop here";
    width: 100%;
    padding: 20px 0;
    opacity: 0.7;
    border: 1px dashed skyblue;
    background:$white-smoke;
  }

</style>
