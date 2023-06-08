<template>
  <div v-if="activated == true && content">
    <TemplateObject 
      :title="title" 
      :sectionId="content.id"
      :editMode="editMode" 
      :activated="activated"
      :data="content"
      icon="fa-header" 
      @edit-mode="toggleEditMode($event)">
       
    </TemplateObject>  
  </div>
</template>

<script>
import TemplateObject from '../templateObject/TemplateObject.vue'

export default {  
  name: 'TemplateHeading',
  components: {  
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
        console.log('edit',this.editMode)
    },
    saveItem(item){
      console.log(item)
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
