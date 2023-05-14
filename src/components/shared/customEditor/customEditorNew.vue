<template>
    <div class="custom-editor-wrapper">
        <exai-tabs>
            <exai-tab title="Editor">
                <div class="quillWrapper custom textBlock">
                    <custom-toolbar-new :buttonList="buttonList" id="toolbar-2000"></custom-toolbar-new>
                    <vue-editor 
                        ref="quillEditor"
                        v-model="content.content" 
                        :editorOptions="editorOptions" 
                        @focus="onEditorFocus"
                        @blur="onEditorBlur"
                        :class="contentType">
                    </vue-editor>
                </div> 
            </exai-tab>
            <exai-tab title="Preview">
                <document-preview :data="content.content"></document-preview>
            </exai-tab>
            <exai-tab title="HTML">
                <html-viewer :data="content.content"></html-viewer>
            </exai-tab>
        </exai-tabs>

        <insert-custom-content-modal 
            v-if="customTemplateControls && showCustomContentModal"
            :sectionId="data.id" 
            :contentItems="customTemplateControls"
            @close-modal="showCustomContentModal = false" 
            @submit-control="insertCustomControl($event)">
        </insert-custom-content-modal >
    </div>
</template>

<script>
    import { VueEditor, Quill } from "vue2-editor";
    import { DynamicControl } from '@/components/shared/customEditor/controls/controlModules/dynamicControl.js';
    import { DynamicControlInline } from '@/components/shared/customEditor/controls/controlModules/dynamicControlInline.js';
    import { CustomSnippetControl } from '@/components/shared/customEditor/controls/controlModules/customSnippetControl.js';
    import { ExaiTabs, ExaiTab } from '@/components/shared/ExaiComponents/ExaiTabs/index.js';
    import customToolbarNew from './customToolbarNew.vue';
    import InsertCustomContentModal from './modals/InsertCustomContentModal.vue';   
    import DocumentPreview from '../../templates/DocumentPreview.vue';
    import HtmlViewer from './HtmlViewer.vue';

    // set custom sizing for Quill
    // Note: may abstract this to a custom module later

    const fontSizeArr = ['8px','9px','10px','12px','14px','16px','20px','24px','32px','42px','54px','68px','84px','98px'];
    var Size = Quill.import('attributors/style/size');
    Size.whitelist = fontSizeArr;

    Quill.register(Size, true);
    Quill.register(DynamicControl);
    Quill.register(DynamicControlInline);
    Quill.register(CustomSnippetControl);

    export default {
        name: 'custom-editor-new',
        components: {
            VueEditor,
            customToolbarNew, 
            InsertCustomContentModal,
            HtmlViewer,
            ExaiTabs,
            ExaiTab,
            DocumentPreview
        },

        props:{
            buttonList:{
                type: Object
            },
            data:{
                type:[Object, Array]
            },
            contentType:{
                type:String
            },
            editorId:{
                type:String,
                default:"id"
            },
            customControls:{
                type:[Array, Object]
            }
        },

        data() {
            return {
                content: this.data,
                customTemplateControls: this.customControls,
                showDynamicControlModal:false,
                showCustomContentModal:false,
                edit:true,
                editorOptions:{
                    modules: {
                        history: { 
                            delay: 2000,
                            maxStack: 500,
                            userOnly: true,
                        },
                        toolbar: {
                            container: '#toolbar-2000',
                            handlers: {
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

        methods: {
            // Editor Methods
            onEditorFocus(Quill) {
                console.log("editor focus!", Quill);
            },

            onEditorBlur(Quill) {
                console.log("editor blur!", Quill);
            },

            openCustomContentModal(){
                this.showCustomContentModal = true;
            },

            insertCustomControl(value){
                console.log('modal value',value);
                let type = value.type.toLowerCase();

                // Note: Need to work on these selectors

                if (value.class === 'text-snippet') {
                    this.insertCustomSnippetControl(value);
                } else {
                    if(type == 'inline'){
                        this.insertInlineControl(value);
                    }
                    if(type == 'block'){
                        this.insertBlockControl(value);
                    }
                }
                
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

            insertCustomSnippetControl(control){
                this.$refs.quillEditor.quill.insertText(
                    this.$refs.quillEditor.quill.getSelection( true ).index, `${control.content}\n`,'customSnippetControl', control
                );
            },
        },
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
    min-height:calc(100vh - 300px);
    height:calc(100vh - 300px);
    overflow-y:auto;
  }
  .custom-editor-wrapper .ql-toolbar.ql-snow {
    border: 0px solid #ccc !important;
    }

.custom-editor-wrapper .exai-tabs__list{
    margin-bottom:20px;
}
</style>