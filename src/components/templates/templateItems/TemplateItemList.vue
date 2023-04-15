<template>
  <div v-if="activated == true">
    <TemplateObject 
      icon="fa-list"
      :title="title" 
      :editMode="editMode" 
      :activated="activated"
      @edit-mode="toggleEditMode($event)">
     
      <div v-if="editMode == true && data">
        <custom-editor 
          v-model="content.content"
          :data="content"
          :buttonList="customToolbarButtons"
          :editorId="getTemplateId">
        </custom-editor>
        <!-- <br>
        {{ content }} -->
      </div>  
      <div v-else>
       <div v-html="content.content"></div>
      </div>  
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
      activated: Boolean
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
