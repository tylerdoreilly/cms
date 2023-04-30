<template>
  <div v-if="activated == true">
    <TemplateObject 
      :title="title"
      :sectionId="content.id" 
      :editMode="editMode" 
      :activated="activated"
      :data="content"
      icon="fa-paragraph" 
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
    <TemplateObject :title="title" icon="fa-paragraph" :editMode="editMode" :activated="activated">
    </TemplateObject>
  </div> 
</template>

<script>
import customEditor from '../../shared/customEditor/customEditor.vue'
import TemplateObject from '../templateObject/TemplateObject.vue'

export default {
  name: 'TemplateItemTextField',
  components: {
    customEditor,
    TemplateObject,
  },
  props: {
    title: String,
    data: Object,
    activated: Boolean,
    showDetails: Boolean,
    testEmit:Object,
  },
  data() {
      return {
        content: this.data,
        editMode:true,
        customToolbarButtons:{
            headers:false,
            size:true,
            styling:false,
            alignment:true,
            blockInsert:true,
            lists:false,
            indents:true,
            colors:true,
            inserts:false,
            clean:true
        },
        tyler:this.testEmit
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
  mounted(){
    console.log('section Id',this.content.id)
    console.log('data Id',this.tyler.section)
    console.log('test emit',this.tyler)
    if (this.content.id === this.tyler.section) {
      console.log('test emit',this.tyler)
    }
   
  }
}
</script>


<style lang="scss">
   .vue_edeitor_height .ql-editor{
      height:60px;
      max-height: 60px;
      min-height: 60px;
    }
</style>
