<template>
  <div v-if="activated == true">
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #title><font-awesome-icon icon="fa-solid fa-header" /> {{ title }}</template>
      <template #controls>
          <button class="" @click="toggleEditMode()"><font-awesome-icon icon="fa-solid fa-gear" /></button>
          <button class="" @click="removeItem(content)" v-if="allowRemoveItem">Remove</button>
          <button class="" @click="showJson = !showJson">JSON</button>
          <button class="" ><font-awesome-icon icon="fa-solid fa-grip-lines" /></button>
      </template>
       
      <div v-if="editMode == true && content">
        <div v-if="!showJson">
          <!-- <vue-editor v-model="content.content" class="vue_edeitor_height" @input="val => $emit('update:content', val)"></vue-editor> -->
          <vue-editor v-model="content.content" :editorToolbar="customToolbar" class="vue_edeitor_height"></vue-editor>
          <br>
          {{ content }}
        </div>
        <div v-else>
          <JsonViewer :data="content"></JsonViewer>
        </div>

       
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
import { VueEditor } from "vue2-editor";
import TemplateObject from './templateObject/TemplateObject.vue'
import JsonViewer from './JsonViewer.vue'

export default {
  
  name: 'TemplateHeading',
  components: {
    VueEditor, TemplateObject, JsonViewer
  },
  props: {
    title: String,
    data: Object,
    activated: Boolean,
    listCount:Number,
  },
  data() {
      return {
        content: this.data,
        count: this.listCount,
        editMode:true,
        showJson:false,
        showRemove:false,
        
        customToolbar: [
            [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
           
            ["bold", "italic", "underline"],
            [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
          ]
      }
  },
  computed:{
    allowRemoveItem(){
      return this.canShowRemove()
    }
  },
  methods: {
    toggleEditMode(){
        this.editMode = !this.editMode
    },
    removeItem(item){
      this.$emit('remove-item', { item })
    },
    canShowRemove(){
      if(this.count > 1){
        this.showRemove = true;
      }
      return this.showRemove
    }
  },
  mounted () {
    console.log('prop',this.data)
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
