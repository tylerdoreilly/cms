<template>
    <div v-if="templateData || existingData">
    <exai-modal :title="title">
        <template #exai-modal-body>
            <exai-form>
                <exai-form-control-group>
                    <div v-for="formItem in formData" :key="formItem.id">
                        <template v-if="formItem.fieldType === 'input'">                     
                            <exai-text-field 
                                :label="formItem.label"
                                :id="formItem.id" 
                                :value="templateData.title" 
                                :required="formItem.required"
                                :errors="formItem.errors"
                                @input="getTitleValue($event, formItem)">
                            </exai-text-field>
                        </template>

                        <template v-if="formItem.fieldType === 'select'">
                            <exai-select
                                :label="formItem.label"
                                :id="formItem.id"
                                displayName="type"
                                :selection="templateData.type_new"
                                :placeholder="formItem.placeholder"
                                :options="formItem.options"
                                :required="formItem.required"
                                :errors="formItem.errors"
                                @select="changeType($event, formItem)">
                            </exai-select>
                        </template>

                        <template v-if="formItem.fieldType === 'date' && formItem.id === 'created'">
                            <exai-date-picker
                                :label="formItem.label"
                                :id="formItem.id"
                                :value="templateData.date_created" 
                                :valueType="formItem.valueType"
                                :required="formItem.required"
                                :errors="formItem.errors"
                                @dateChange="updateDate($event, formItem)">
                            </exai-date-picker>
                        </template>

                        <template v-if="formItem.fieldType === 'date' && formItem.id === 'asOf'">
                            <exai-date-picker
                                :label="formItem.label"
                                :id="formItem.id"
                                :value="templateData.date_asof" 
                                :valueType="formItem.valueType"
                                :required="formItem.required"
                                :errors="formItem.errors"
                                @dateChange="updateDate($event, formItem)">
                            </exai-date-picker>
                        </template>
                    </div>
                </exai-form-control-group>
            </exai-form>

        </template>
        <template #exai-modal-actions>
            <exai-button text="Cancel" @click.native.prevent="closeModal"></exai-button>
            <exai-button text="Save" variation="primary" @click.native.prevent="submitted"></exai-button>
        </template>    
    </exai-modal>
    </div>
</template>
  
<script>
  import { ExaiButton, ExaiModal }from '@/components/shared/ExaiComponents/index.js';
  import ExaiForm from '../shared/forms/ExaiForm.vue';
  import ExaiFormControlGroup from '../shared/forms/ExaiFormControlGroup.vue';
  import ExaiTextField from '../shared/forms/ExaiTextField.vue';
  import ExaiSelect from '../shared/forms/ExaiSelect.vue';
  import ExaiDatePicker from '../shared/forms/ExaiDatePicker.vue';
  import moment from 'moment';

  export default {
    name: 'template-form',
    components:{
        ExaiModal,
        ExaiButton,
        ExaiForm,
        ExaiFormControlGroup,
        ExaiTextField,
        ExaiSelect,
        ExaiDatePicker,
    },
    props:{
        title:{
            type: String,  
            docs:{
                validation:'_',
                description: 'Template action modal title'
            }        
        },    
        types:{
            type:Array
        },
        data:{
            type:Object
        },
        action:{
            type: String,  
            docs:{
                validation:'_',
                description: 'Type of action. Create or Clone'
            }        
        },     
    },

    data() {
        return {
            templateData: this.setupFormData(),
            existingData: this.data,
            templateTypes: this.types,
            formData:[
                {
                    title:'',
                    label:'Title',
                    id:'templateTitle',
                    fieldType:'input',
                    required:true,
                    placeholder:'Title of the template',
                    errors: [
                        {id: 'templateTitle', msg: 'Title is required.', hasError:false},
                    ]
                },
                {
                    type_new: '',
                    label: 'Type',
                    id: 'templateType',
                    fieldType: 'select',
                    options: this.types,
                    required: true,
                    placeholder: 'Select a template type',
                    errors: [
                        {id: 'templateType', msg: 'Type is required.', hasError:false},
                    ]
                },
                {
                    date_created: this.getDate(),
                    label: 'Date Created',
                    id: 'created',
                    fieldType: 'date',
                    valueType: 'format',
                    required: true,
                    errors: [
                        {id: 'created', msg: 'Created Date is required.', hasError:false},
                    ]
                },
                {
                    date_asof: '',
                    label: 'As of Date',
                    id: 'asOf',
                    fieldType: 'date',
                    valueType: 'format',
                    required: true,
                    errors: [
                        {id: 'asOf', msg: 'As of Date is required.', hasError:false},
                    ]
                }
            ],
            errors: [
                {field: 'templateTitle', msg: 'Title is required.', hasError:false},
                {field: 'templateType', msg: 'Type is required.', hasError:false},
                {field: 'created', msg: 'Created Date is required.', hasError:false},
                {field: 'asOf', msg: 'As Of Date is required.', hasError:false}
            ],
        }
    },
    
    methods: {   
        setupFormData(){
            if (this.action === 'create') {
                let data = {
                    title: '',
                    type_new:'',
                    date_created: this.getDate(),
                    date_asof: '',
                    date_updated:null,
                    data:null,
                }
                return data;
            }
            if (this.action === 'clone'){
                let data = {
                    title:this.data.title,
                    type_new: this.data.type_id,
                    date_created: this.getDate(),
                    date_asof: this.formatIncomingDate(this.data.date_asof),
                    date_updated: null,
                    data: JSON.stringify(this.data.data)
                }
               return data;
            }          
        },  

        getTitleValue(event, formItem){
            this.templateData.title = event;
            console.log('formItem',{event, formItem})
            this.checkErrors(this.templateData.title, formItem);
        },

        changeType(event, formItem){
            console.log('event',event)
            let selectedValue = event;
            let selectedType = this.templateTypes.find(type => type.id == selectedValue);
            this.templateData['type_new'] = selectedType.id;
            this.checkErrors(this.templateData['type_new'], formItem);
        },

        updateDate(event, formItem){
            if (formItem.id === 'asOf') {
                this.templateData.date_asof = event;
                this.checkErrors(this.templateData.date_asof, formItem);
            }
            if (formItem.id === 'created') {
                this.templateData.date_created = event;
                this.checkErrors(this.templateData.date_created, formItem);
            }
            console.log('data change',{event, formItem})
        },

        getDate(){
            let currentDate = new Date(Date.now());
            let formatDate = moment(String(currentDate)).format('YYYY-MM-DD')
            return formatDate
        },

        formatIncomingDate(){
             return moment(String(this.data.date_asof)).format('YYYY-MM-DD')
        },

        formatOutgoingDate(dateParam){
            let date = new Date(dateParam);
            let updatedDate = date.toISOString();
            return updatedDate;
        },    

        checkForm() {

            if (this.templateData.title != '' && 
                this.templateData.type_new != '' &&
                this.templateData.date_created != '' &&
                this.templateData.date_asof != '') {

                this.formData.forEach(formItem => {
                    formItem.errors.forEach(error =>{
                        error.hasError = false;
                    }) 
                });

                return true;
            }

            if (!this.templateData.title) {
                let formItem = this.formData.find(formItem => formItem.id === 'templateTitle');
                this.checkErrors(this.templateData.title, formItem);
            }
            if (!this.templateData.type_new) {
                let formItem = this.formData.find(formItem => formItem.id === 'templateType');
                this.checkErrors(this.templateData.title, formItem);
            }
            if (!this.templateData.date_created) {
                let formItem = this.formData.find(formItem => formItem.id === 'created');
                this.checkErrors(this.templateData.title, formItem);
            }
            if (!this.templateData.date_asof) {
                let formItem = this.formData.find(formItem => formItem.id === 'asOf');
                this.checkErrors(this.templateData.title, formItem);
            }
           
            return false
        },

        checkErrors(field, formItem){
            let formItemErrors = formItem.errors;
            let selectedError = formItemErrors.find(error => error.id === formItem.id);  
            console.log('selectedError',selectedError);

            if (field === '') {
                selectedError.hasError = true
            } else {
                selectedError.hasError = false
            }
        },

        submitted() {
            let formValid = this.checkForm();

            if (formValid) {
                let formatCreatedDate = this.formatOutgoingDate(this.templateData.date_created);
                let formatAsofDate = this.formatOutgoingDate(this.templateData.date_asof);
                this.templateData['date_created'] = formatCreatedDate;
                this.templateData['date_asof'] = formatAsofDate;
                console.log('updated template', this.templateData);
                  // this.submitAction();
                // this.$emit('close-modal')
            }

        },

        submitAction(){
            if (this.action === 'create') {
                this.$emit('create-new-template', this.templateData);
            }
            if (this.action === 'clone') {
                this.$emit('clone-new-template', this.templateData);
            }
        },

        closeModal() {
            this.templateData = '';
            this.$emit('close-modal')
        },
    },

    mounted(){
        console.log('template', this.existingData);
        console.log('template types', this.templateTypes)
    }
  }
</script>
  
  <style lang="scss">
   
  </style>