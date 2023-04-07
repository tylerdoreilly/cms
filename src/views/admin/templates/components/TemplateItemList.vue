<template>
  <div v-if="activated == true">
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #title><font-awesome-icon icon="fa-solid fa-list" /> {{ title }}</template>
      <template #controls>
          <button class="" @click="toggleEditMode()"><font-awesome-icon icon="fa-solid fa-gear" /></button>
          <button class="" @click="showJson = !showJson">JSON</button>
          <button class="" ><font-awesome-icon icon="fa-solid fa-grip-lines" /></button>
      </template>
       
      <div v-if="editMode == true">
        <div v-if="!showJson">
          <div class="quillWrapper">
            <div id="toolbar">
              <span class="ql-formats">
                <select class="ql-size">
                  <option value="10px">Small</option>
                  <option selected>Normal</option>
                  <option value="18px">Large</option>
                  <option value="32px">Huge</option>
                </select>
              </span>
            
              <span class="ql-formats">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
                <button class="ql-strike"></button>
              </span>
              <span class="ql-formats">
                <select class="ql-color">
                  <option value="rgb(0, 0, 0)" />
                  <option value="rgb(230, 0, 0)" />
                  <option value="rgb(255, 153, 0)" />
                  <option value="rgb(255, 255, 0)" />
                  <option value="rgb(0, 138, 0)" />
                  <option value="rgb(0, 102, 204)" />
                  <option value="rgb(153, 51, 255)" />
                  <option value="rgb(255, 255, 255)" />
                  <option value="rgb(250, 204, 204)" />
                  <option value="rgb(255, 235, 204)" />
                  <option value="rgb(204, 224, 245)" />
                  <option value="rgb(235, 214, 255)" />
                  <option value="rgb(187, 187, 187)" />
                  <option value="rgb(102, 185, 102)" />
                </select>
              </span>
              <span class="ql-formats">
                <button class="ql-clean">test</button>
              </span>
              <span class="ql-formats">
                <button class="ql-CustomBlot">Rule</button>
              </span>
           
            <!-- <button class="ql-customBtn">Add Rule</button> -->
          </div>
          <vue-editor v-model="content.content" :editorOptions="editorOptions" ref="quillEditor"></vue-editor>
          </div>
         
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
      <template #title><font-awesome-icon icon="fa-solid fa-list" /> {{ title }}</template>
    </TemplateObject>
  </div> 
</template>

<script>

import { VueEditor,Quill } from "vue2-editor";
import TemplateObject from './templateObject/TemplateObject.vue'
import JsonViewer from './JsonViewer.vue'

// const BlockEmbed = Quill.import('blots/block/embed')
const Block = Quill.import('blots/block');

class CustomBlot extends Block {
  static create (value) {
    console.log('value',value)
    let node = super.create()
    node.setAttribute('class', value);
    node.setAttribute('id', 'dynamic-rule');
    return node;

  }
  static formats(domNode) {
    console.log(domNode)
    return domNode.getAttribute("class");
  }

    format(name, value) {
      console.log(name, value)
      if (name !== this.statics.blotName || !value) return super.format(name, value);
      if (value){
        this.domNode.setAttribute('class', value);
        this.domNode.setAttribute('id', 'dynamic-rule');
      }
    }
}
CustomBlot.blotName = 'customTagName'
CustomBlot.className = 'customTagName'
CustomBlot.tagName = 'div';

Quill.register(CustomBlot);

  export default {
    name: 'TemplateItemList',
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
          editorOptions:{
            modules: {
              history: { 
                delay: 2000,
                maxStack: 500,
                userOnly: true,
              },
               toolbar: {
                  container: '#toolbar',
                  handlers: {
                    customBtn: () => { 
                      console.log('test',this.$refs.quillEditor)
                      this.$refs.quillEditor.quill.insertText(
                        this.$refs.quillEditor.quill.getSelection( true ).index, '[ Insert IF Statement ]', {
                        'color': 'rgb(230,0,0)'
                      });
                     
                    },
                    embedBtn: () => { 
                      // this.$refs.quillEditor.quill.insertEmbed(
                      //   this.$refs.quillEditor.quill.getSelection( true ).index, 'customTagName', '[ Insert IF Statement ]');
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
    
    methods: {
      toggleEditMode(){
        this.editMode = !this.editMode
      }
    },
    mounted() {
      var Block = Quill.import('blots/block');
      class embedBtn extends Block {
        static create(value) {
          let node = super.create(value);
          if (value) {
            console.log(value)
            node.setAttribute('class', value);
          }
          return node;
        }

        static formats(domNode) {
          console.log(domNode)
          return domNode.getAttribute("class");
        }

        format(name, value) {
          console.log(name, value)
          if (name !== this.statics.blotName || !value) return super.format(name, value);
          if (value){
            this.domNode.setAttribute('class', value);
          }
        }
      }
      embedBtn.blotName = 'embedBtn';
      embedBtn.className = 'embedBtn';
      embedBtn.tagName = 'div';

      Quill.register(embedBtn);
    }
  }
</script>

<style lang="scss">
  // @import './templateItem.scss';
  .ql-snow .ql-customBtn{
  display:inline-flex !important;
  width:auto !important;
 }

 .test-class{
  color:red;
 }
</style>
