<template>
    <div class="custom-editor-wrapper">

        <div class="quillWrapper custom" v-if="edit == true">
            <custom-toolbar :buttonList="buttonList" :id="editorId"></custom-toolbar>
            <vue-editor v-model="content.content" :editorOptions="editorOptions" ref="quillEditor"></vue-editor>
        </div> 

        <div v-html="content.content" v-else></div>

        <content-block title="Details" v-if="showDetails">
            <template-item-details :data="content"></template-item-details>
        </content-block>
       
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
    import contentBlock from '../contentBlock.vue'
    import templateItemDetails from '../../templates/templateItemDetails.vue'

    Quill.register(DynamicControl);
    Quill.register(DynamicControlInline);

    export default {
        name: 'custom-editor',
        components: {
            VueEditor,
            customToolbar, 
            InsertModal,
            templateItemDetails,
            contentBlock
        },
        props:{
            buttonList:Object,
            data:Object,
            editMode:{
                type:Boolean,
               
            },
            showDetails:Boolean,
            editorId:{
                type:String,
                default:"id"
            }
        },
        data() {
            return {
                content: this.data,
                showModal: false,
                edit:true,
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
        watch: {
            async editMode(newValue) {
                await this.toggleEditMode(newValue);
            },
        },
        methods: {
            openModal(value){
                this.controlType = value;
                this.showModal = true;
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
            async toggleEditMode(newValue){
                this.edit = newValue
                console.log('edit',this.edit)
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