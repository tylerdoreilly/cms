<template>
  <div v-if="activated == true">
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #title><font-awesome-icon icon="fa-solid fa-paragraph" /> {{ title }}</template>
      <template #controls>
          <button class="" @click="toggleEditMode()"><font-awesome-icon icon="fa-solid fa-gear" /></button>
          <button class="" @click="removeItem(content)">Remove</button>
          <button class="" @click="showJson = !showJson">JSON</button>
          <button class="" ><font-awesome-icon icon="fa-solid fa-grip-lines" /></button>
      </template>
       
      <div v-if="editMode == true">
        <div v-if="!showJson">
          <!-- <vue-editor v-model="content.content" class="vue_edeitor_height" @input="val => $emit('update:content', val)"></vue-editor> -->
          <vue-editor v-model="content.content"></vue-editor>
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
      <template #title><font-awesome-icon icon="fa-solid fa-paragraph" /> {{ title }}</template>
    </TemplateObject>
  </div> 
</template>

<script>

import { VueEditor } from "vue2-editor";
import TemplateObject from './templateObject/TemplateObject.vue'
import JsonViewer from './JsonViewer.vue'

  export default {
    name: 'TemplateItemTextBlock',
    components: {
      VueEditor, TemplateObject, JsonViewer
    },
    props: {
      title: String,
      data: Object,
      activated: Boolean
    },
    data() {
      return {
          content: this.data,
          editMode:true,
          showJson:false,
      }
    },
    
    methods: {
      toggleEditMode(){
        this.editMode = !this.editMode
      },
      removeItem(item){
        this.$emit('remove-item', { item })
      }
    },
  }
</script>

<style lang="scss">
  // @import './templateItem.scss';
 
</style>
