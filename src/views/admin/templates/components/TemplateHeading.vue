<template>
  <div v-if="activated == true">
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #icon><font-awesome-icon icon="fa-solid fa-header" /> </template>
      <template #title>{{ title }}</template>
      <template #controls>
        <exai-button variation="secondary" icon="fa-gear" @click.native="toggleEditMode()"></exai-button>
        <exai-button variation="secondary" icon="fa-lock" @click.native="testTy(content)"></exai-button>
        <exai-button variation="secondary" icon="fa-ellipsis" v-popover:foo></exai-button>
        <popover name="foo">
          <exai-list>
              <exai-list-item title="Save Item" @click.native="saveItem(content)"></exai-list-item>
              <exai-list-item title="Remove Item" @click.native="removeItem(content)"></exai-list-item>
              <exai-list-item title="Move Up" @click.native="saveItem(content)"></exai-list-item>
              <exai-list-item title="Move Down" @click.native="saveItem(content)"></exai-list-item>
            </exai-list>
        </popover>
      </template>
       
      <div v-if="editMode == true && content">
        <custom-editor-new  
          v-model="content.content"
          :data="content"
          :buttonList="customToolbarButtons"
          :editorId="getTemplateId">
        </custom-editor-new>
        <!-- <br>
        {{ content }} -->
      </div>  
      <div v-else>
       <div v-html="content.content"></div>
      </div>  
    </TemplateObject>  
  </div>
  <div v-else>
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #title><font-awesome-icon icon="fa-solid fa-header" /> {{ title }}</template>
    </TemplateObject>
  </div> 
</template>

<script>
import customEditorNew from '../../../../components/shared/customEditor/customEditorNew.vue'
import TemplateObject from './templateObject/TemplateObject.vue'
import ExaiButton from '../../../../components/ExaiButton.vue'
import ExaiList from '../../../../components/shared/list/ExaiList.vue'
import ExaiListItem from '../../../../components/shared/list/ExaiListItem.vue'

export default {  
  name: 'TemplateHeading',
  components: {
    customEditorNew,   
    TemplateObject, 
    ExaiButton,
    ExaiList,
    ExaiListItem
  },
  props: {
    title: String,
    data: Object,
    activated: Boolean,
  },
  data() {
      return {
        content: this.data,
        editMode:true,
        showRemove:false,
        customToolbarButtons:{
          headers:true,
          size:false,
          styling:true,
          alignment:true,
          blockInsert:false,
          lists:false,
          indents:true,
          colors:true,
          inserts:false,
          clean:true
        },
      }
  },
  computed:{
    allowRemoveItem(){
      return this.canShowRemove()
    },
    getTemplateId(){
        return `toolbar-${this.data.id}`
    },
  },
  methods: {
    toggleEditMode(){
        this.editMode = !this.editMode
    },
    saveItem(item){
      console.log(item)
    },
    removeItem(item){
      this.$emit('remove-item', { item })
    },
    canShowRemove(){
      if(this.count > 1){
        this.showRemove = true;
      }
      return this.showRemove
    },
  },
  mounted () {
    console.log('heading prop',this.data)
  }
}
</script>

<style lang="scss">

  .vue_edeitor_height .ql-editor{
    height:60px;
    max-height: 60px;
    min-height: 60px;
  }

  .ql-editor {
    max-height: 60px;
    overflow-y: auto;
  }

</style>
