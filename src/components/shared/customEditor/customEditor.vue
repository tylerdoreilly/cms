<template>
    <div class="custom-editor-wrapper">
        <div class="quillWrapper custom">
            <custom-toolbar :buttonList="buttonList" :id="editorId"></custom-toolbar>
            <vue-editor v-model="content.content" :editorOptions="editorOptions" ref="quillEditor"></vue-editor>
        </div>  
        <raw-data-viewer v-if="showRawData" :data="content"></raw-data-viewer>
        <insert-modal 
            v-if="controlType"
            v-show="showModal"
            :sectionId="data.id" 
            :controlType="controlType" 
            @close-modal="showModal = false" 
            @submit-control=" getDynamicControl($event)">
        </insert-modal>
    </div>
</template>

<script>
    import { VueEditor, Quill } from "vue2-editor";
    import { DynamicControl } from './modules/dynamicControl.js'
    import { DynamicControlInline } from './modules/dynamicControlInline.js'
    import customToolbar from './customToolbar.vue'
    import InsertModal from './InsertModal.vue'
    import RawDataViewer from '../RawDataViewer.vue'

    Quill.register(DynamicControl);
    Quill.register(DynamicControlInline);

    export default {
        name: 'custom-editor',
        components: {
            VueEditor,
            customToolbar, 
            InsertModal,
            RawDataViewer
        },
        props:{
            buttonList:Object,
            data:Object,
            showRawData:Boolean,
            editorId:{
                type:String,
                default:"id"
            }
        },
        data() {
            return {
                content: this.data,
                editMode:true,
                showModal: false,
                showModalTwo:false,
                controlType:'',
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
                                // CustomBlot: () => {
                                //     this.$refs.quillEditor.quill.insertText(
                                //     this.$refs.quillEditor.quill.getSelection( true ).index, "[Insert If Statement]\n",'customTagName', 'test-class', 'val1' ,'val2');
                                // },
                                // DynamicControl: () => {
                                // this.openModal();
                                // },
                                // DynamicControlInline: () => {
                                // this.openModalTwo();
                                // },
                                testSelect: (value) => {
                                    this.openModal(value);
                                    console.log('select value',value)
                                },
                            }
                        }
                    },
                },
            }
        },
        methods: {
            openModal(value){
                this.controlType = value;
                this.showModal = true;
            },
            openModalTwo(){
                this.showModalTwo = true;
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
        },
     }
</script>

<style lang="scss">
  .custom-editor-wrapper{
    display:flex;
    flex-direction: column;
    gap:15px;
  }
 
</style>