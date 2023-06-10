<template>
    <div class="custom-editor-wrapper">
        <exai-tabs>
            <exai-tab title="Editor">
                <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ref="editor" @ready="onReady"></ckeditor>
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
            :selectedControlItem = "controlData"
            @close-modal="showCustomContentModal = false" 
            @submit-control="insertCustomControl($event)">
        </insert-custom-content-modal >
    </div>
</template>

<script>
    // ckEditor
    import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
    import { Essentials } from '@ckeditor/ckeditor5-essentials';
    import { Heading } from '@ckeditor/ckeditor5-heading';
    import { Font } from '@ckeditor/ckeditor5-font';
    import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
    import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
    import { Link } from '@ckeditor/ckeditor5-link';
    import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
    import { Alignment } from '@ckeditor/ckeditor5-alignment';
    import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
    import { Highlight } from '@ckeditor/ckeditor5-highlight';
    import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
    import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
    import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
    import { List } from '@ckeditor/ckeditor5-list';
    import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';

    //ckEditor Custom Modules
    import SimpleBox from './controls/controlModules/simpleBox/simplebox'; 
    import CustomControl from './controls/controlModules/customControls/customControl'; 
    import SnippetControl from './controls/controlModules/snippetControl/snippetControl'; 
    import DynamicControlInline from './controls/controlModules/dynamicControlInline/dynamicControlInline'; 
    import DynamicControlBlock from './controls/controlModules/dynamicControlBlock/dynamicControlBlock'; 
    import { customControlEventBus } from './controls/controlModules/customControls/customControlEventBus';

    // Components
    import InsertCustomContentModal from './modals/InsertCustomContentModal.vue';   
    import DocumentPreview from '../../templates/DocumentPreview.vue';
    import HtmlViewer from './HtmlViewer.vue';

    export default {
        name: 'exai-editor',
        components: {
            InsertCustomContentModal,
            HtmlViewer,
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
                controlData: {},
                edit:true,
                editor: ClassicEditor,
                editorData: this.data.content,
                editorConfig: {
                    plugins: [
                        Essentials,
                        Heading,
                        Font,
                        Bold,
                        Italic,
                        Underline, Strikethrough, Code, Subscript, Superscript,
                        List,
                        Link,
                        Paragraph,
                        Alignment,
                        Table, TableToolbar,
                        Highlight,
                        RemoveFormat,
                        BlockQuote,
                        FindAndReplace,
                        Indent, IndentBlock,
                        SimpleBox,
                        CustomControl,
                        SnippetControl,
                        DynamicControlInline,
                        DynamicControlBlock,
                        HtmlEmbed
                    ],
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                        ]
                    },
                    highlight: {
                        options: [
                            {
                                model: 'greenMarker',
                                class: 'marker-green',
                                title: 'Green marker',
                                color: 'var(--ck-highlight-marker-green)',
                                type: 'marker'
                            },
                            {
                                model: 'redPen',
                                class: 'pen-red',
                                title: 'Red pen',
                                color: 'var(--ck-highlight-pen-red)',
                                type: 'pen'
                            }
                        ]
                    },
                    fontColor: {
                        colors: [
                            {
                                color: 'hsl(0, 0%, 0%)',
                                label: 'Black'
                            },
                            {
                                color: 'hsl(0, 0%, 30%)',
                                label: 'Dim grey'
                            },
                            {
                                color: 'hsl(0, 0%, 60%)',
                                label: 'Grey'
                            },
                            {
                                color: 'hsl(0, 0%, 90%)',
                                label: 'Light grey'
                            },
                            {
                                color: 'hsl(0, 0%, 100%)',
                                label: 'White',
                                hasBorder: true
                            },
                        ]
                    },
                    backgroundColor: {
                        colors: [
                            {
                                color: 'hsl(0, 75%, 60%)',
                                label: 'Red'
                            },
                            {
                                color: 'hsl(30, 75%, 60%)',
                                label: 'Orange'
                            },
                            {
                                color: 'hsl(60, 75%, 60%)',
                                label: 'Yellow'
                            },
                            {
                                color: 'hsl(90, 75%, 60%)',
                                label: 'Light green'
                            },
                            {
                                color: 'hsl(120, 75%, 60%)',
                                label: 'Green'
                            },
                            // More colors.
                            // ...
                        ]
                    },
                    toolbar: {
                        items: [
                            'heading', 'fontSize',
                            '|',
                            'fontColor', 'fontBackgroundColor',
                            '|',
                            'bold', 'italic', 'underline',
                            '|',
                            'strikethrough', 'subscript', 'superscript',
                            '|',
                            'alignment', 'outdent', 'indent',
                            '|',
                            'bulletedList', 'numberedList',
                            '|',
                            'code', 'blockQuote',
                            '|',
                            'link',
                            'highlight',
                            '|',
                            'insertTable',
                            '|',
                            'findAndReplace',
                            '|',
                            'removeFormat',
                            '|',
                            'customControl',
                            '|',
                            'HtmlEmbed',
                            '|',
                            'undo', 'redo'
                        ]
                    },
                    table: {
                        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
                    },
                    extraAllowedContent: '*[*]{*}(*)'
                },
                editorApi:null,
            }
        },

        methods: {
            onReady(editor) {
                this.editorApi = editor;
            },

            openCustomContentModal(data){
                if (data) {
                    this.showCustomContentModal = true;
                    this.controlData = data;
                } else{
                    this.showCustomContentModal = true;
                }    
            },

            insertCustomControl( value ) {
                console.log('modal value',value);
                let displayType = value.displayType.toLowerCase();
                let controlType = value.controlType;

                // Note: Need to work on these selectors
                if ( controlType === 'dynamic-control' ) {
                    if(displayType == 'inline'){
                        this.insertInlineControl(value);
                    }
                    if(displayType == 'block'){
                        this.insertBlockControl(value);
                    }
                }

                if ( controlType === 'text-snippet' ) {
                    this.insertCustomSnippetControl(value);
                }
                              
            },

            insertInlineControl( control ) {
                this.editorApi.execute( 'insertDynamicControlInline', control )
            },

            insertBlockControl( control ) {
                this.editorApi.execute( 'insertDynamicControlBlock', control )
            },

            insertCustomSnippetControl(control){
                this.editorApi.execute( 'insertSnippetControl', control )
            },

            editControl(){                
                customControlEventBus.$on('edit-control', (data) => {

                    if(data === true) {
                        this.openCustomContentModal();
                    }
                    if(data.open === true) {
                        this.openCustomContentModal(data);
                    }
                   
                })
            },
        },

        created(){
            this.editControl();
        },

        beforeDestroy() {  
            customControlEventBus.$off('edit-control');
        }
     }
</script>

<style lang="scss">
  .custom-editor-wrapper{
    display:flex;
    flex-direction: column;
    gap:15px;
  }

  .custom-editor-wrapper .ck.ck-editor__top.ck-reset_all{
    border-bottom:1px solid #ccced1;
  }

  .custom-editor-wrapper .ck.ck-editor__top .ck-sticky-panel .ck-toolbar, 
  .custom-editor-wrapper .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners{
    padding-top:4px;
    padding-bottom:4px;
    padding-left:40px;
    padding-right:40px;
    border-left:0px !important;
    border-right:0px !important;
  }

  .custom-editor-wrapper .ck.ck-editor__main{
    min-height:calc(100vh - 268px);
    height:calc(100vh - 268px);
    overflow-y:auto;
    border:0px;
    background:lighten($default-background, 20%);
    background:$default-background;
  }

  .custom-editor-wrapper .ck.ck-content.ck-editor__editable{
    width:1200px;
    margin:0 auto;
    margin-top:20px;
    margin-bottom:20px;
    padding-top:40px;
    padding-left:60px;
    padding-right:60px;
    min-height:calc(100vh - 250px) !important;
    height:auto !important;
    overflow-y:hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }


.custom-editor-wrapper .exai-tabs__list{
    margin-bottom:20px;
}


.dynamic-control-block-content,
.dynami-control-inline{
    color:red;
}
</style>