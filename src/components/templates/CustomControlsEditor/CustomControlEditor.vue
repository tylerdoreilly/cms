<template>
    <div class="custom-editor-wrapper">
        <div class="quillWrapper">
            <custom-control-toolbar :buttonList="buttonList" id="toolbar-customControl"></custom-control-toolbar>
            <vue-editor 
                ref="quillEditor"
                v-model="content.content" 
                :editorOptions="editorOptions" 
                @focus="onEditorFocus"
                @blur="onEditorBlur"
                :class="contentType">
            </vue-editor>
        </div> 

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
    import CustomControlToolbar from './CustomControlToolbar.vue';
    import InsertCustomContentModal from '@/components/shared/customEditor/modals/InsertCustomContentModal.vue';   

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
        name: 'custom-control-editor',
        components: {
            VueEditor,
            CustomControlToolbar, 
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
                editorOptions:{
                    modules: {
                        history: { 
                            delay: 2000,
                            maxStack: 500,
                            userOnly: true,
                        },
                        toolbar: {
                            container: '#toolbar-customControl',
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

//   .custom-editor-wrapper .ql-toolbar.ql-snow {
//     border: 0px solid #ccc !important;
//     }

.custom-editor-wrapper .exai-tabs__list{
    margin-bottom:20px;
}
</style>