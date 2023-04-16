<template>
  <div v-if="activated == true">
    <TemplateObject 
      :title="title" 
      :sectionId="content.id" 
      :editMode="editMode" 
      :activated="activated"
      icon="fa-list"
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
    <TemplateObject :title="title" icon="fa-list" :editMode="editMode" :activated="activated">
    </TemplateObject>
  </div> 
</template>

<script>
  import customEditor from '../../shared/customEditor/customEditor.vue'
  import TemplateObject from '../templateObject/TemplateObject.vue'

  export default {
    name: 'TemplateItemList',
    components: {
      customEditor,
      TemplateObject, 
    },
    props: {
      title: String,
      data: Object,
      activated: Boolean,
      showDetails: Boolean,
    },
    data() {
      return {
        content:this.data,
        editMode:true,
        customToolbarButtons:{
          headers:false,
          size:true,
          styling:false,
          alignment:true,
          blockInsert:false,
          lists:true,
          indents:true,
          colors:true,
          inserts:false,
          clean:true
        },
      }
    },
    computed:{
      getTemplateId(){
        return `toolbar-${this.data.id}`
      }
    },
    methods: {
      toggleEditMode(){
        this.editMode = !this.editMode
      },
    },
    mounted(){
      console.log('list prop',this.data)
    }
  }
</script>

<style lang="scss">

</style>
