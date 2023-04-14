<template>
  <div v-if="activated == true">
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #title><font-awesome-icon icon="fa-solid fa-layer-group" /> {{ title }}</template>
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
       
      <div v-if="editMode == true">
        <custom-editor>
          <custom-toolbar :buttonList="customToolbarButtons" :id="getTemplateId"></custom-toolbar>
          <vue-editor v-model="content.content" :editorOptions="editorOptions" ref="quillEditor"></vue-editor>
        </custom-editor>
        <custom-editor-new  v-model="content.content"
          :data="content"
          :buttonList="customToolbarButtons"
          :editorId="getTemplateIdTest">
        </custom-editor-new>
          <br>
          {{ content }}
      </div>  
      <div v-else>
       <div v-html="content.content"></div>
      </div>  
      
    </TemplateObject>  
    <insert-modal :sectionId="data.id" v-show="showModal" @close-modal="showModal = false" @submit-control="insertControl($event)"></insert-modal>
    <insert-modal :sectionId="data.id" v-show="showModalTwo" @close-modal="showModalTwo = false" @submit-control="insertControlTwo($event)"></insert-modal>
  </div>
  <div v-else>
    <TemplateObject :editMode="editMode" :activated="activated">
      <template #title><font-awesome-icon icon="fa-solid fa-layer-group" /> {{ title }}</template>
    </TemplateObject>
  </div> 
</template>

<script>
  import { VueEditor, Quill } from "vue2-editor";
  import customEditor from '../../../../components/shared/customEditor/customEditor.vue'
  import customEditorNew from '../../../../components/shared/customEditor/customEditorNew.vue'
  import customToolbar from '../../../../components/shared/customEditor/customToolbar.vue'
  import { CustomBlot } from './customRuleInsert.js'
  import { DynamicControl } from './dynamicControl.js'
  import { DynamicControlInline } from './dynamicControlInline.js'
  import TemplateObject from './templateObject/TemplateObject.vue'
  import ExaiButton from '../../../../components/ExaiButton.vue'
  import ExaiList from '../../../../components/shared/list/ExaiList.vue'
  import ExaiListItem from '../../../../components/shared/list/ExaiListItem.vue'
  import InsertModal from './InsertModal.vue'

  Quill.register(CustomBlot);
  Quill.register(DynamicControl);
  Quill.register(DynamicControlInline);

  export default {
    name: 'TemplateItemTextBlock',
    components: {
      VueEditor,
      customEditor,
      customEditorNew,
      customToolbar, 
      TemplateObject, 
      ExaiButton,
      ExaiList,
      ExaiListItem,
      InsertModal
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
        showModal: false,
        showModalTwo:false,
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
                  container: `#toolbarTextBlock-${this.data.id}`,
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
                    DynamicControl: () => {
                      this.openModal();
                    },
                    DynamicControlInline: () => {
                      this.openModalTwo();
                    },
                  }
             }
          },
        },
      }
    },
    computed:{
      getTemplateId(){
        return `toolbarTextBlock-${this.data.id}`
      },
      getTemplateIdTest(){
        return `toolbar-${this.data.id}`
      },
    },
    methods: {
      toggleEditMode(){
        this.editMode = !this.editMode
      },
      removeItem(item){
        this.$emit('remove-item', { item })
      },
      openModal(){
        this.showModal = true;
      },
      openModalTwo(){
        this.showModalTwo = true;
      },
      insertControl(control){
        console.log('test',control)
        this.$refs.quillEditor.quill.insertText(
          this.$refs.quillEditor.quill.getSelection( true ).index, `${control.text}\n`,'dynamicControl', control);
      },
      insertControlTwo(control){
        console.log('test',control)
        this.$refs.quillEditor.quill.insertText(
          this.$refs.quillEditor.quill.getSelection( true ).index, `${control.text}\n`,'dynamicControlInline', control);
      },
    },
  }
</script>

<style lang="scss">
  // @import './templateItem.scss';
 
</style>
