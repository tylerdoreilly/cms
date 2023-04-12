<template>
  <div v-if="activated == true">
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #title><font-awesome-icon icon="fa-solid fa-list" /> {{ title }}</template>
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
       
      <div v-if="editMode == true && data">
        <custom-editor>
          <custom-toolbar :buttonList="customToolbarButtons" :id="getTemplateId" v-if="data"></custom-toolbar>
          <vue-editor v-model="content.content" :editorOptions="editorOptions" ref="quillEditor" v-if="data"></vue-editor>
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
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #title><font-awesome-icon icon="fa-solid fa-list" /> {{ title }}</template>
    </TemplateObject>
  </div> 
</template>

<script>

import { VueEditor, Quill } from "vue2-editor";
import customEditor from '../../../../components/shared/customEditor/customEditor.vue'
import customToolbar from '../../../../components/shared/customEditor/customToolbar.vue'
import TemplateObject from './templateObject/TemplateObject.vue'
import {CustomBlot} from './customRuleInsert.js'
import ExaiButton from '../../../../components/ExaiButton.vue'
import ExaiList from '../../../../components/shared/list/ExaiList.vue'
import ExaiListItem from '../../../../components/shared/list/ExaiListItem.vue'

Quill.register(CustomBlot);

export default {
    name: 'TemplateItemList',
    components: {
      VueEditor,
      customEditor,
      customToolbar, 
      TemplateObject, 
      ExaiButton,
      ExaiList,
      ExaiListItem
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
        editorOptions:{
          modules: {
            history: { 
              delay: 2000,
              maxStack: 500,
              userOnly: true,
            },
            toolbar: {
                container: `#toolbarList-${this.data.id}`,
                handlers: {
                  customBtn: () => { 
                    console.log('test',this.$refs.quillEditor)
                    this.$refs.quillEditor.quill.insertText(
                      this.$refs.quillEditor.quill.getSelection( true ).index, '[ Insert IF Statement ]', {
                      'color': 'rgb(230,0,0)'
                    });
                    
                  },
                  CustomBlot: () => {
                    this.$refs.quillEditor.quill.insertText(
                    this.$refs.quillEditor.quill.getSelection( true ).index, "[Insert If Statement]\n",'customTagName', 'test-class', 'val1' ,'val2');
                  },
              
                }
             }
          },
        },
      }
    },
    computed:{
      getTemplateId(){
        return `toolbarList-${this.data.id}`
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
