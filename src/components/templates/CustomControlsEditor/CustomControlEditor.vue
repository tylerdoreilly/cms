<template>  
    <div>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ref="editor" @ready="onReady"></ckeditor>

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
    import SimpleBox from '@/components/shared/customEditor/controls/controlModules/simpleBox/simplebox'; 
    import CustomControl from '@/components/shared/customEditor/controls/controlModules/customControls/customControl'; 
    import SnippetControl from '@/components/shared/customEditor/controls/controlModules/snippetControl/snippetControl'; 
    import DynamicControlInline from '@/components/shared/customEditor/controls/controlModules/dynamicControlInline/dynamicControlInline'; 
    import DynamicControlBlock from '@/components/shared/customEditor/controls/controlModules/dynamicControlBlock/dynamicControlBlock'; 
    import { customControlEventBus } from '@/components/shared/customEditor/controls/controlModules/customControls/customControlEventBus';
   
    // Components
    import InsertCustomContentModal from '@/components/shared/customEditor/modals/InsertCustomContentModal.vue';   

    export default {
        name: 'custom-control-editor',
        components: {
            InsertCustomContentModal,
        },

        props:{
            buttonList:{
                type: Object
            },
            data:{
                type:[Object, Array, String]
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
            onReady( editor ) {
                this.editorApi = editor;
            },

            openCustomContentModal() {
                this.showCustomContentModal = true;
            },

            insertCustomControl( value ) {
                console.log('modal value',value);
                let type = value.type.toLowerCase();

                // Note: Need to work on these selectors

                if(type == 'inline'){
                        this.insertInlineControl(value);
                    }
                if(type == 'block'){
                    if (value.class === 'text-snippet') {
                        this.insertCustomSnippetControl(value);
                    } else{
                        this.insertBlockControl(value);
                    }
                    
                }
            },

            insertInlineControl( control ) {
                this.editorApi.execute( 'insertDynamicControlInline', control )
            },

            insertBlockControl( control ) {
                this.editorApi.execute( 'insertDynamicControlBlock', control )
            },

            insertCustomSnippetControl( control ) {
                this.editorApi.execute( 'insertSnippetControl', control )
            },

            editControl() {                
                customControlEventBus.$on('edit-control', (data) => {
                    console.log('control data test',data);
                    if(data === true) {
                        this.openCustomContentModal();
                    }
                });
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

//   .custom-editor-wrapper .ql-toolbar.ql-snow {
//     border: 0px solid #ccc !important;
//     }

.custom-editor-wrapper .exai-tabs__list{
    margin-bottom:20px;
}
</style>