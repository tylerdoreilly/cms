<template>
  <div v-if="activated == true">
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #title><font-awesome-icon icon="fa-solid fa-paragraph" /> {{ title }}</template>
      <template #controls>
          <exai-button variation="primary" icon="fa-gear" @click.native="toggleEditMode()"></exai-button>
          <exai-button variation="primary" icon="fa-lock" @click.native="testTy(content)"></exai-button>
          <exai-button variation="primary" icon="fa-ellipsis" v-popover:foo></exai-button>
          <popover name="foo">
            <exai-list>
              <exai-list-item title="Save Item" @click.native="saveItem(content)"></exai-list-item>
              <exai-list-item title="Remove Item" @click.native="removeItem(content)"></exai-list-item>
              <exai-list-item title="Move Up" @click.native="saveItem(content)"></exai-list-item>
              <exai-list-item title="Move Down" @click.native="saveItem(content)"></exai-list-item>
            </exai-list>
          </popover>
      </template>
       
      <div v-if="editMode == true">
        <custom-editor>
          <custom-toolbar :buttonList="customToolbarButtons" :id="getTemplateId"></custom-toolbar>
          <vue-editor id="editor2" v-model="content.content" :editorOptions="editorOptions" ref="quillEditor"></vue-editor>
        </custom-editor>
        <!-- <vue-editor v-model="content.content" class="vue_edeitor_height" @input="val => $emit('update:content', val)"></vue-editor> -->
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
      <template #title><font-awesome-icon icon="fa-solid fa-paragraph" /> {{ title }}</template>
    </TemplateObject>
  </div> 
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import customEditor from '../../../../components/shared/customEditor/customEditor.vue'
import customToolbar from '../../../../components/shared/customEditor/customToolbar.vue'
import { CustomBlot } from './customRuleInsert.js'
import TemplateObject from './templateObject/TemplateObject.vue'
import ExaiButton from '../../../../components/ExaiButton.vue'
import ExaiList from '../../../../components/shared/list/ExaiList.vue'
import ExaiListItem from '../../../../components/shared/list/ExaiListItem.vue'

Quill.register(CustomBlot);

export default {
  name: 'TemplateItemTextField',
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
        editorOptions:{
            modules: {
              history: { 
                delay: 2000,
                maxStack: 500,
                userOnly: true,
              },
              toolbar: {
                  container: `#toolbarTextField-${this.data.id}`,
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
      return `toolbarTextField-${this.data.id}`
    },
  },
  methods: {
    toggleEditMode(){
        this.editMode = !this.editMode
    },
    removeItem(item){
      this.$emit('remove-item', { item })
    },
    testTy(item){
      this.$emit('lock-item', { item })
   
    }
  },
  mounted () {
  
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
