<template>
  <div class="template-list">      
      <div 
        v-for="(item, index) in items" 
        :key="item.id" 
        :class="handleDropClasses(item)"    
        ref="item"    
        draggable
        @dragstart.self="pickupElem($event, item, index);"
        @dragover.prevent="showDropPlace($event, item, index);"
        @dragenter.prevent
        @drop="moveElem($event, item, index);"
        @dragend.prevent="dragEndClear();">
{{ item.name }}
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
            @lock-item="lockItem(item)">
          </component>
        </div>
      </div>

  </div>
</template>

<script>
  import TemplateItemTextBlock from '../../../components/templates/templateItems/TemplateItemTextBlock.vue'
  import TemplateHeading from '../../../components/templates/templateItems/TemplateHeading.vue'
  import TemplateItemTextField from '../../../components/templates/templateItems/TemplateItemTextField.vue'
  import TemplateItemList from '../../../components/templates/templateItems/TemplateItemList.vue'

  export default {  
    name: 'dropable-list',
    components:{
      TemplateHeading,
      TemplateItemTextField,
      TemplateItemTextBlock,
      TemplateItemList,
    },
    props: {
      data:[Object, Array],
      showDetails:Boolean,
    },
    data() {
        return {
          showPrompt:false,
          testTy:[],
          availableTemplateItems: [
            { id: 1, name: "Heading", position: 1, field:'TemplateHeading', content:'place heading here'},
            { id: 2, name: "Text Field", position: 2, field:'TemplateItemTextField', content:'place text here'},
            { id: 3, name: "Text Area", position: 3, field: 'TemplateItemTextBlock', content:'place paragraph here'},
            { id: 4, name: "List", position: 4, field: 'TemplateItemList', content:'place list here'}
          ],
          items: this.data,
          dragedElem: null,
          overElem: null,
          preview: false,
          newInstance:false,
          lockedItems:false,
          itemToRemove:''
      }
    },
    computed:{
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
    methods:{
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
    },
    mounted() {
      this.setDefaultItem();
    //   if(!this.items){
    //         this.setDefaultItem();
    //       }
    //       else{
    //         this.items = this.template.data;
    //       }
    //   this.setDefaultItem();
     }
  }
</script>

<style lang="scss">
 .template-list {
    @include flex(flex, column, $gap: 15px);
    padding: 15px 0px;
    text-align: initial;
    min-height:400px;
  }

// .drop-zone {
//   background-color: #eee;
//   margin-bottom: 10px;
//   padding: 10px;
// }
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
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
</style>
