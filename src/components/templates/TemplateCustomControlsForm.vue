<template>
    <exai-form v-if="customControls">
        <exai-form-control-group>
            <div v-for="formItem in getFormSettings" :key="formItem.id">
                <template v-if="formItem.fieldType === 'input' && formItem.id === 'title'">                     
                    <exai-text-field :fieldData="formItem" v-model="formItem.value" />
                </template>

                <template v-if="formItem.fieldType === 'input' && formItem.id === 'description'">                     
                    <exai-text-field :fieldData="formItem" v-model="formItem.value" />
                </template>

                <template v-if="formItem.fieldType === 'input' && formItem.id === 'controlType'">                     
                    <exai-text-field :fieldData="formItem" v-model="formItem.value" />
                </template>

                <template v-if="formItem.fieldType === 'select'">
                    <exai-select :fieldData="formItem" v-model="formItem.value" />
                </template>

                <template v-if="formItem.fieldType === 'date' && formItem.id === 'asOf'">
                    <exai-date-picker :fieldData="formItem" v-model="formItem.value" />
                </template>

                <template v-if="formItem.fieldType === 'editor' && formItem.id === 'controlContent'"> 
                    <exai-form-group>
                        <exai-field-label text="Content" for="ControlContent"></exai-field-label>                    
                        <custom-control-editor 
                            v-model="formItem.value"
                            :data="formItem.value"
                            :customControls="customControls"
                            :buttonList="customToolbarButtons"
                            ref="controlEditor">
                        </custom-control-editor>
                    </exai-form-group>
                </template>
               
            </div>

            <div class="form-controls">
                <exai-button text="Cancel" @click.native="cancel"></exai-button>
                <exai-button text="Save Control" variation="primary" @click.native="submitted"></exai-button>
            </div>
        </exai-form-control-group>   
    </exai-form>
</template>
  
<script>
  import ExaiForm from '../shared/forms/ExaiForm.vue';
  import ExaiFormControlGroup from '../shared/forms/ExaiFormControlGroup.vue';
  import ExaiTextField from '../shared/forms/ExaiTextField.vue';
  import ExaiSelect from '../shared/forms/ExaiSelect.vue';
  import ExaiFieldLabel from '../shared/forms/ExaiFieldLabel.vue';
  import ExaiFormGroup from '../shared/forms/ExaiFormGroup.vue';
  import ExaiDatePicker from '../shared/forms/ExaiDatePicker.vue';
  import { ExaiButton } from '@/components/shared/ExaiComponents/index.js';
  import CustomControlEditor from '@/components/templates/CustomControlsEditor/CustomControlEditor.vue';


  import moment from 'moment';


  export default {
    name: 'template-custom-controls-form',
    components:{
        ExaiForm,
        ExaiFormControlGroup,
        ExaiTextField,
        ExaiSelect,
        CustomControlEditor,
        ExaiFieldLabel,
        ExaiFormGroup,
        ExaiDatePicker,
        ExaiButton
    },

    props:{
        title:{
            type: String,  
            docs:{
                validation:'_',
                description: 'Template action modal title'
            }        
        },   

        data:{
            type: Object,  
            docs:{
                validation:'_',
                description: 'Template action modal title'
            }        
        },  

        action:{
            type: String,  
            docs:{
                validation:'_',
                description: 'Type of action. Create or Clone'
            }        
        },   
        
        customControls:{
            type:Array
        }  
    },

    data() {
        return {
            controlData: this.data,  
            formSettings:[
                {
                    value:this.data.name,
                    label:'Title',
                    id:'title',
                    fieldType:'input',
                    required:true,
                    placeholder:'Title of the control',
                    errors: [
                        {id: 'title', msg: 'Title is required.', hasError:false},
                    ]
                },
                {
                    value:this.data.description,
                    label: 'Description',
                    id: 'description',
                    fieldType: 'input',
                    required: true,
                    placeholder: 'Select a template type',
                    errors: [
                        {id: 'description', msg: 'Description is required.', hasError:false},
                    ]
                },
                {
                    value:this.data.control,
                    label: 'Control Type',
                    id: 'controlType',
                    fieldType: 'input',
                    required: true,
                    placeholder: 'Select a template type',
                    errors: [
                        {id: 'controlType', msg: 'Control Type is required.', hasError:false},
                    ]
                },
                {
                    value: this.setPublishedState(),
                    label: 'State',
                    id: 'state',
                    fieldType: 'select',
                    displayName:'state',
                    options: [
                        { id: 1, state: "Published", value:true },
                        { id: 2, state: "unPublished", value:false },
                    ],
                    required: true,
                    placeholder: 'Select a publish state',
                    errors: [
                        {id: 'state', msg: 'Published state is required.', hasError:false},
                    ]
                },
                {
                    value:this.data.date_asof,
                    label: 'As of Date',
                    id: 'asOf',
                    fieldType: 'date',
                    valueType: 'format',
                    required: true,
                    errors: [
                        {id: 'asOf', msg: 'As of Date is required.', hasError:false},
                    ]
                },
                {
                    value: { content: this.data.content},
                    id: 'controlContent',
                    fieldType: 'editor',
                    required: false,
                    placeholder: 'Select a template type',
                    errors: [
                        {id: 'controlContent', msg: 'Type is required.', hasError:false},
                    ]
                },
            ],
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
        }
    },

    methods: {   
       
        setPublishedState(){
            let pubState;
            if (this.action == 'edit') {
                pubState = this.data.published == true ? 1 : 2;
            } else {
                pubState = this.data.published;
            }
            return pubState;
        },

        getPublishState(formItem){
            let selectedType = formItem.options.find(type => type.id == formItem.value);
            return selectedType.value;
        },

        formatIncomingDate(date){
            return moment(String(date)).format('YYYY-MM-DD');
        },

        formatOutgoingDate(dateParam){
            let date = new Date(dateParam);
            let updatedDate = date.toISOString();
            return updatedDate;
        },    

        checkErrors(formItem){
            let formItemErrors = formItem.errors;
            let selectedError = formItemErrors.find(error => error.id === formItem.id);  

            if (formItem.value === '') {
                selectedError.hasError = true
            } else {
                selectedError.hasError = false
            }
        },

        checkForm() {
            let errors = [];
            let requiredFields = this.formSettings.filter(item => item.required === true);
            requiredFields.map(item => { this.checkErrors(item) });
            requiredFields.map(item => { errors.push(item.errors) });

            let allErrors = errors.flat(Infinity);
            let formInvalid = allErrors.some(error => error.hasError === true);
           
            if (!formInvalid) {            
                return true
            } else {
                return false
            }
        },

        submitted() {
            let formValid = this.checkForm();

            if (formValid) {
                let name = this.formSettings.find(item => item.id === 'title').value;
                let description = this.formSettings.find(item => item.id === 'description').value;
                let field = this.controlData.name.replace(/\s+/g, '-').toLowerCase();
                let control = this.formSettings.find(item => item.id === 'controlType').value;
                let published = this.formSettings.find(item => item.id === 'state');
                let asOfDate = this.formSettings.find(item => item.id === 'asOf').value;
                let content = this.$refs.controlEditor[0].editorData;
                
                this.controlData.name = name;
                this.controlData.description = description;
                this.controlData.field = field;
                this.controlData.control = control;
                this.controlData.published = this.getPublishState(published);
                this.controlData.date_asof = this.formatOutgoingDate(asOfDate);
                this.controlData.content = content;
               
                console.log('updated control', this.controlData);

                this.submitAction();

            }

        },

        submitAction(){
            if (this.action === 'create') {
                this.$emit('create-new-control', this.controlData);
            }
            if (this.action === 'edit') {
                this.$emit('update-new-control', this.controlData);
            }
        },

        cancel(){
            this.$router.push({ name: 'controls'});
        }
    },

    computed:{
        getFormSettings(){
            return this.formSettings
        }
    }

  }
</script>

<style lang="scss">
   .form-controls{
    @include flex(flex, row, $gap:10px);
    align-items:center;
    margin-left:auto;
   }
</style>
