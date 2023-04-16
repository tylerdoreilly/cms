<template>
  <div class="admin-toolbar">
    <h3>{{title}}</h3>
    <exai-tabs>
      <exai-tab title="Default">
        <div 
          v-for="(item, index) in toolbarItems" 
          :key="item.id" 
          draggable
          @dragstart.self=" pickupElem($event, item, index);"
          @dragend.prevent="dragEndClear();">

          <div class="list__elem" :class="{'list__elem--is-dragged': dragedElem && item.id === dragedElem.id}">
            <template-toolbar-item :title="item.name" :icon="getIcons(item.field)"></template-toolbar-item>
          </div>
              
        </div>
      </exai-tab>
      <exai-tab title="Library">
        <div 
          v-for="(item, index) in libraryItems" 
          :key="item.id"
          draggable
          @dragstart.self=" pickupElem($event, item, index);"
          @dragend.prevent="dragEndClear();">

          <div class="list__elem" :class="{'list__elem--is-dragged': dragedElem && item.id === dragedElem.id}">
            <template-toolbar-item :title="item.name" :icon="getIcons(item.field)"></template-toolbar-item>
          </div>
              
        </div>
      </exai-tab>
    </exai-tabs>
   
  </div>

</template>

<script>
  import ExaiTabs from '../../shared/exaiTabs/ExaiTabs.vue'
  import ExaiTab from '../../shared/exaiTabs/ExaiTab.vue'
  import TemplateToolbarItem from './TemplateToolbarItem'

  export default {
    name: 'template-toolbar',
    components: {
      ExaiTabs,
      ExaiTab,
      TemplateToolbarItem
    },
    data() {
        return {
          dragedElem: null,
          overElem: null
      }
    },
    props:{
      title:{
        type: String,
        docs:{
          validation:'_',
          description:'Toolbar Title'
        }
      },
      toolbarItems:{
        type: Array,
        docs:{
          validation:'_',
          description:'Default toolbar items'
        }
      },
      libraryItems:{
        type: Array,
        docs:{
          validation:'_',
          description:'Custom library items'
        }
      }
    },
    computed: {
      handleDropClasses() {
        return item => {
          if (!this.overElem || !this.overElem.id) {
            return "";
          }
          if (
            this.overElem.id === item.id &&
            item.position < this.dragedElem.position
          ) {
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
        };
      },

      randomId(){
        let randomId = Math.random() * Math.floor(1000);
        return Math.round(randomId)
      },
    },
    methods: {
      dragEndClear() {
        console.log("dragEnd");
        this.dragedElem = null;
        this.overElem = null;
      },

      pickupElem(event, elem) {
        console.log(elem);
        event.dataTransfer.dropEffect = "move";
        this.dragedElem = { ...elem };
        this.$emit('dragTemplateItem', event, elem)
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
                
      },

      updateListOrder(index){
        this.items = this.items.filter(item => item.id !== this.dragedElem.id);
        this.items.splice(index, 0, { ...this.dragedElem });
        this.items.forEach((item, index) => (item.position = index + 1));
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

      getIcons(value){
        let listIcon
        if(value == "TemplateHeading"){
          listIcon = 'fa-header'
        }
        if(value == "TemplateItemList"){
          listIcon = 'fa-list'
        }
        if(value == "TemplateItemTextField"){
          listIcon = 'fa-paragraph'
        }
        if(value == "TemplateItemTextBlock"){
          listIcon = 'fa-layer-group'
        }
        return listIcon
      }
    },
  }
</script>


<style lang="scss">
  .admin-toolbar{
    position:sticky;
    top:25px;
  }
  .list__elem{
   margin-bottom:10px;
  }

</style>
