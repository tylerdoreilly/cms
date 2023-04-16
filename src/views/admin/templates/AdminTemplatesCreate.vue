<template>
  <div class="inner-container">
    <div class="inner-content">
      <PageHeader title="Edit Template"></PageHeader>
      <PageDetails :title="template.title" :type="template.type" :date="template.date_created" :asof="template.date_asof">
        <exai-button text="Details" variation="secondary" @click.native="showDetails = !showDetails">Preview</exai-button>
        <div v-if="!lockedItems">
          <exai-button text="Lock Items" variation="secondary" icon-left="fa-lock"  @click.native="lockItems()"></exai-button>
        </div>
        <div v-else>
          <exai-button text="Unlock Items" variation="secondary" icon-left="fa-lock"  @click.native="lockItems()"></exai-button>
        </div>
             
        <exai-button text="Preview" variation="secondary" @click.native="preview = !preview">Preview</exai-button>
        <exai-button text="Save" variation="primary" @click.native="saveTemplate()">Save</exai-button>
      </PageDetails>
      
      <div class="list" v-if="preview == false && items">
        
        <div v-for="(item, index) in items" :key="item.id" ref="item" :class="handleDropClasses(item)"       
          draggable
          @dragstart.self="pickupElem($event, item, index);"
          @dragover.prevent="showDropPlace($event, item, index);"
          @dragenter.prevent
          @drop="moveElem($event, item, index);"
          @dragend.prevent="dragEndClear();">

          <div class="list__elem" :class="{'list__elem--is-dragged': dragedElem && item.id === dragedElem.id}">
            <component 
              v-if="item"
              :is="item['field']" 
              :data="item" 
              :title="item['name']"
              :listCount="items.length"
              v-bind:showDetails="showDetails"
              v-bind:activated="true" 
              @remove-item="checkBeforeRemove($event)"
              @lock-item="lockItem(item)"
             >
            </component>
          </div>
          <!-- {{ item }} -->
        </div>

        <!-- <div
          v-for="(item, index) in layouts"
          :key="item.id"
          :class="handleDropClasses(item)"
          draggable
          @dragstart.self="pickupElem($event, item, index);"
          @dragover.prevent="showDropPlace($event, item, index);"
          @dragenter.prevent
          @drop="moveElem($event, item, index);"
          @dragend.prevent="dragEndClear();">

          <div class="list__elem" :class="{'list__elem--is-dragged': dragedElem && item.id === dragedElem.id}">
            <component :is="item['layoutType']" title="test">
              <div
                v-for="(item, index) in items"
                :key="item.id"
                :class="handleDropClasses(item)"
                draggable
                @dragstart.self="pickupElem($event, item, index);"
                @dragover.prevent="showDropPlace($event, item, index);"
                @dragenter.prevent
                @drop="moveElem($event, item, index);"
                @dragend.prevent="dragEndClear();">

                <div class="list__elem" :class="{'list__elem--is-dragged': dragedElem && item.id === dragedElem.id}">
                  <component :is="item['cardType']" :title="item['name']"></component>
                </div>
              </div>
            </component>
          </div>
        </div> -->
      </div>

      <div class="document-preview" v-if="preview == true">
        <div v-for="(item) in items" :key="item.id">
          <div v-html="item.content"></div>
        </div>
      </div>
    </div>
    <aside class="column--right">
        <template-toolbar 
          v-if="templateItems && customTemplateItems"
          title="Toolbar"
          :toolbarItems="templateItems"
          :libraryItems="customTemplateItems"
          @dragTemplateItem="dragTemplateItem">
        </template-toolbar>
    </aside>
    <exai-prompt 
      v-if="itemToRemove"
      v-show="showPrompt"
      title="Remove Template Item" 
      message="Are you sure you want to remove this item?" 
      :data="itemToRemove"
      @close-modal="showPrompt = false" 
      @close-and-submit="removeItem($event)">
    </exai-prompt>
  </div>
</template>

<script>
  import PageHeader from '../../../components/layout/PageHeader.vue'
  import PageDetails from '../../../components/layout/PageDetails.vue'
  import TemplateToolbar from '../../../components/templates/templateToolbar/TemplateToolbar.vue'
  import ExaiButton from '../../../components/shared/ExaiButton.vue'
  import ExaiPrompt from '../../../components/shared/ExaiPrompt.vue'
  import TemplateItemTextBlock from '../../../components/templates/templateItems/TemplateItemTextBlock.vue'
  import TemplateHeading from '../../../components/templates/templateItems/TemplateHeading.vue'
  import TemplateItemTextField from '../../../components/templates/templateItems/TemplateItemTextField.vue'
  import TemplateItemList from '../../../components/templates/templateItems/TemplateItemList.vue'
  import TemplateLayoutSingle from '../../../components/templates/templateItems/TemplateLayoutSingle.vue'
  import { updateTemplate, getTemplate, getTemplateItems, getCustomTemplateItems } from '../../../services/TemplatesService'

  const axios = require('axios');
  export default {
    name: 'AdminTemplatesCreate',
    components: {
      TemplateItemTextBlock,
      TemplateHeading,
      TemplateItemTextField,
      PageHeader,
      PageDetails,
      TemplateLayoutSingle,
      TemplateItemList,
      TemplateToolbar,     
      ExaiButton,
      ExaiPrompt,
      updateTemplate,
      getTemplate,
      getTemplateItems,
      getCustomTemplateItems
    },
    props: {
      msg: String
    },
    data() {
        return {
          showPrompt:false,
          showDetails:false,
          testTy:[],
          templateItems:[],
          customTemplateItems:[],
          id: this.$route.params.id,
          template: [],
          layouts:[],
          availableTemplateItems: [
            { id: 1, name: "Heading", position: 1, field:'TemplateHeading', content:'place heading here'},
            { id: 2, name: "Text Field", position: 2, field:'TemplateItemTextField', content:'place text here'},
            { id: 3, name: "Text Area", position: 3, field: 'TemplateItemTextBlock', content:'place paragraph here'},
            { id: 4, name: "List", position: 4, field: 'TemplateItemList', content:'place list here'}
          ],
          items: [
          // { id: 1, name: "Heading", position: 1, field:'TemplateHeading', content:'place heading here'},

          ],
          dragedElem: null,
          overElem: null,
          preview: false,
          newInstance:false,
          lockedItems:false,
          itemToRemove:''
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

      // Get and Save
      async saveTemplate(){
        this.template.data = [];
        var myJsonString = JSON.stringify(this.items);
          if (this.id) {
            this.template.data = myJsonString;
            const putData = this.template;
            // const putData = {
            //   type:"Press Release",
            //   title:"EU SF NEW",
            //   data:myJsonString
            // };

            try {
              const res = await axios.put(`/api/templates/${this.id}`, putData, {
                headers: {
                  "x-access-token": "token-value",
                },
              });

              const result = res;
              this.testTy = result;
              this.$toast("Template Saved Successfully");
            } 
            catch (err) {
             console.log(err)
            }
          }
      },

      getTemplate(){
        getTemplate(this.id).then(response => {
          console.log(response)
          this.template = response;
          if(this.template.data == null){
            this.setDefaultItem();
          }
          else{
            this.items = this.template.data;
          }
        })
      },

      getTemplateItems(){
        getTemplateItems().then(response => {
          console.log(response)
          this.templateItems = response;
          console.log('template items', this.templateItems)
        })
      },

      getCustomTemplateItems(){
        getCustomTemplateItems().then(response => {
          console.log(response)
          this.customTemplateItems = response;
          console.log('template items', this.customTemplateItems)
        })
      }
    },
    mounted () {
      this.getCustomTemplateItems();
      this.getTemplateItems();
      this.getTemplate();
    }
  }
</script>

<style lang="scss">
  .inner-container{
    display: flex;
    min-height: calc(100vh - 60px);
    flex: 1;
  }

  .inner-content {
    flex: 1;
    padding-right:40px;
  }

  .column--right {
    flex: 0 0 15em;
    border-left:1px solid $border;
    width:15em;
    padding:0px 20px;
  }

.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}

.list {
  padding: 15px 0px;
  text-align: initial;
  display:flex;
  flex-direction: column;
   gap:15px;
   min-height:400px;
  // background:$template-background;
}
.list__elem {
  // cursor: row-resize;
  // border: 1px solid $gunmetal;
  // padding: 5px;
  // margin-bottom: 10px;
  // transition: all 0.3s ease;
  // background:#fff;
}
.list__elem--is-dragged {
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
.btn-drag {
  float: right;
  background: none;
  border: none;
}

.document-preview{
  padding:20px 40px 40px 40px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
