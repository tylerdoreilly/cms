<template>
  <div v-if="activated == true">
    <TemplateObject 
      :title="title" 
      :sectionId="content.id" 
      :editMode="editMode" 
      :activated="activated"
      :data="content"
      icon="fa-list"
      @edit-mode="toggleEditMode($event)">
     
    </TemplateObject>  
  </div>
  <div v-else>
    <TemplateObject :title="title" icon="fa-list" :editMode="editMode" :activated="activated">
    </TemplateObject>
  </div> 
</template>

<script>
  import TemplateObject from '../templateObject/TemplateObject.vue'

  export default {
    name: 'TemplateItemList',
    components: {
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
