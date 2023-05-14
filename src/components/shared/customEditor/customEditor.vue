<template>
    <div class="custom-editor-wrapper">

        <div class="quillWrapper custom textBlock" v-if="edit == true">
            <custom-toolbar :buttonList="buttonList" :id="editorId"></custom-toolbar>
            <vue-editor 
                ref="quillEditor"
                v-model="content.content" 
                :editorOptions="editorOptions" 
                @focus="onEditorFocus"
                @blur="onEditorBlur"
                :class="contentType">
            </vue-editor>
        </div> 

        <div v-html="content.content" v-else></div>

        <content-block title="Details" v-if="showDetails">
            <template-item-details :data="content"></template-item-details>
        </content-block>

        <insert-custom-content-modal 
            v-if="customContentItems && showCustomContentModal"
            :sectionId="data.id" 
            :whatever="controlFuck" 
            :contentItems="customContentItems"
            @close-modal="showCustomContentModal = false" 
            @submit-control="insertCustomControl($event)">
        </insert-custom-content-modal >
    </div>
</template>

<script>
    import { VueEditor, Quill } from "vue2-editor";
    import { DynamicControl } from './modules/dynamicControl.js'
    import { DynamicControlNew } from '@/quillPlugins/dynamicControlNew.js'
    import { DynamicControlInline } from './modules/dynamicControlInline.js'
    import { CustomInsert } from '@/quillPlugins/customInsert.js'
    import customToolbar from './customToolbar.vue'
    import InsertCustomContentModal from './InsertCustomContentModal.vue'
    import contentBlock from '../contentBlock.vue'
    import templateItemDetails from '../../templates/templateItemDetails.vue'
    import { getCustomTemplateItems } from '@/services/TemplatesService'

    Quill.register(DynamicControl);
    Quill.register(DynamicControlNew);
    Quill.register(DynamicControlInline);
    Quill.register(CustomInsert);

    export default {
        name: 'custom-editor',
        components: {
            VueEditor,
            customToolbar, 
            InsertCustomContentModal,
            templateItemDetails,
            contentBlock
        },
        props:{
            buttonList:{
                type:Object
            },
            data:{
                type:Object
            },
            editMode:{
                type:Boolean,               
            },
            showDetails:{
                type:Boolean
            },
            contentType:{
                type:String
            },
            editorId:{
                type:String,
                default:"id"
            }
        },
        data() {
            return {
                content: this.data,
                showDynamicControlModal:false,
                showCustomContentModal:false,
                customContentItems:[],
                edit:true,
                controlFuck:'',
                editorOptions:{
                    modules: {
                        history: { 
                            delay: 2000,
                            maxStack: 500,
                            userOnly: true,
                        },
                        toolbar: {
                            container: `#toolbar-${this.data.id}`,
                            handlers: {
                                customBtn: () => { 
                                    console.log('test',this.$refs.quillEditor)
                                    this.$refs.quillEditor.quill.insertText(
                                        this.$refs.quillEditor.quill.getSelection( true ).index, '[ Insert IF Statement ]', {
                                        'color': 'rgb(230,0,0)'
                                    });
                                },
                                selectDynamicControl: (value) => {
                                    this.openDynamicControlModal(value);
                                    console.log('select value',value)
                                },

                                selectCustomInsert: (value) => {
                                    this.openCustomContentModal();
                                    console.log('select value',value)
                                },
                            }
                        }
                    },
                },
            }
        },
        watch: {
            async editMode(newValue) {
                await this.toggleEditMode(newValue);
            },
        },
        methods: {
            // Editor Methods
            onEditorFocus(Quill) {
                console.log("editor focus!", Quill);
            },

            onEditorBlur(Quill) {
                console.log("editor blur!", Quill);
            },

            openDynamicControlModal(value){
                this.controlFuck = value;
                this.showDynamicControlModal = true;
            },

            openCustomContentModal(){
                this.showCustomContentModal = true;
            },

            getDynamicControl(value){
                console.log('modal value',value)
                if(value.type == 'inline'){
                    this.insertInlineControl(value.control)
                }
                if(value.type == 'block'){
                    this.insertBlockControl(value.control)
                }
            },

            insertCustomControl(value){
                console.log('modal value',value);
                this.insertCustomContent(value.control);
            },

            insertInlineControl(control){
                this.$refs.quillEditor.quill.insertText(
                    this.$refs.quillEditor.quill.getSelection( true ).index, `${control.text}\n`,'dynamicControlInline', control
                );
            },

            insertBlockControl(control){
                this.$refs.quillEditor.quill.insertText(
                    this.$refs.quillEditor.quill.getSelection( true ).index, `${control.text}\n`,'dynamicControl', control
                );
            },

            insertCustomContent(control){
                this.$refs.quillEditor.quill.insertText(
                    this.$refs.quillEditor.quill.getSelection( true ).index, `${control.content}\n`,'dynamicControlNew', control
                );
            },

            async toggleEditMode(newValue){
                this.edit = newValue
                console.log('edit',this.edit)
            },

            getCustomContent(){
                getCustomTemplateItems().then(response => {
                console.log('custom Items',response)
                this.customContentItems = response
                })
                .catch(error => {console.log(error) })
                .finally(() => (console.log('done')))
            }
        },
        mounted(){
            this.getCustomContent();
        }
     }
</script>

<style lang="scss">
  .custom-editor-wrapper{
    display:flex;
    flex-direction: column;
    gap:15px;
  }

  .quillWrapper.custom.textBlock .quill-container{
    height: auto !important;
  }
  .quillWrapper.custom.textBlock .ql-editor{
    // min-height:600px;
    height: auto !important;
  }
  .custom-editor-wrapper .ql-toolbar.ql-snow {
    border: 0px solid #ccc !important;
    }
</style>