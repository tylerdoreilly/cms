<template>
  <div v-if="activated == true">
    <TemplateObject 
      :title="title" 
      :sectionId="content.id"
      :editMode="editMode" 
      :activated="activated"
      :data="content"
      icon="fa-layer-group"
      @edit-mode="toggleEditMode($event)">
       
        <custom-editor  
          v-model="content.content"
          :data="content"
          :editMode="editMode"
          :showDetails="showDetails"
          :buttonList="customToolbarButtons"
          :editorId="getTemplateId">
        </custom-editor>
      
    </TemplateObject>  
  </div>
  <div v-else>
    <TemplateObject :title="title" icon="fa-layer-group" :editMode="editMode" :activated="activated">
    </TemplateObject>
  </div> 
</template>

<script>
  import customEditor from '../../shared/customEditor/customEditor.vue'
  import TemplateObject from '../templateObject/TemplateObject.vue'

  export default {
    name: 'TemplateItemTextBlock',
    components: {   
      customEditor,     
      TemplateObject, 
    },
    props: {
      title: String,
      data: Object,
      activated: Boolean,
      showDetails:Boolean,
    },
    data() {
      return {
        content: this.data,
        editMode:true,
        customToolbarButtons:{
          headers:true,
          size:true,
          styling:false,
          alignment:true,
          blockInsert:true,
          lists:true,
          indents:true,
          colors:true,
          inserts:true,
          clean:true
        },
      }
    },
    computed:{
      getTemplateId(){
        return `toolbar-${this.data.id}`
      },
    },
    methods: {
      toggleEditMode(){
        this.editMode = !this.editMode
      },
    },
  }
</script>

<style lang="scss">
  // @import './templateItem.scss';
 
</style>
