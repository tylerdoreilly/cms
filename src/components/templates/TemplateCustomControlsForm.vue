<template>
    <exai-form>
        <exai-form-control-group>
            <div v-for="formItem in formData" :key="formItem.id">
                <template v-if="formItem.fieldType === 'input' && formItem.id === 'controlTitle'">                     
                    <exai-text-field 
                        :label="formItem.label"
                        :id="formItem.id" 
                        :value="controlData.name" 
                        :required="formItem.required"
                        :errors="formItem.errors"
                        @input="getTitleValue($event, formItem)">
                    </exai-text-field>
                </template>

                <template v-if="formItem.fieldType === 'input' && formItem.id === 'controlDesc'">                     
                    <exai-text-field 
                        :label="formItem.label"
                        :id="formItem.id" 
                        :value="controlData.description" 
                        :required="formItem.required"
                        :errors="formItem.errors"
                        @input="getDescriptionValue($event, formItem)">
                    </exai-text-field>
                </template>

                <template v-if="formItem.fieldType === 'input' && formItem.id === 'controlType'">                     
                    <exai-text-field 
                        :label="formItem.label"
                        :id="formItem.id" 
                        :value="controlData.control" 
                        :required="formItem.required"
                        :errors="formItem.errors"
                        @input="getDescriptionValue($event, formItem)">
                    </exai-text-field>
                </template>

                <template v-if="formItem.fieldType === 'select'">
                    <exai-select
                        :label="formItem.label"
                        :id="formItem.id"
                        displayName="state"
                        :selection="controlData.published"
                        :placeholder="formItem.placeholder"
                        :options="formItem.options"
                        :required="formItem.required"
                        :errors="formItem.errors"
                        @select="changeType($event, formItem)">
                    </exai-select>
                </template>

                <template v-if="formItem.fieldType === 'date' && formItem.id === 'asOf'">
                    <exai-date-picker
                        :label="formItem.label"
                        :id="formItem.id"
                        :value="controlData.date_asof" 
                        :valueType="formItem.valueType"
                        :required="formItem.required"
                        :errors="formItem.errors"
                        @dateChange="updateDate($event, formItem)">
                    </exai-date-picker>
                </template>

                <template v-if="formItem.fieldType === 'editor' && formItem.id === 'controlContent'"> 
                    <exai-form-group>
                        <exai-field-label text="Content" for="ControlContent"></exai-field-label>                    
                        <custom-control-editor 
                            v-model="controlData.content"
                            :data="controlData.content"
                            :customControls="customControls"
                            :buttonList="customToolbarButtons">
                        </custom-control-editor>
                    </exai-form-group>
                </template>
                
            </div>

            <div class="form-controls">
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
  import { getAllControls } from '@/services/TemplatesService';

  import moment from 'moment';
  const axios = require('axios');

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
            controlData:{ 
                name:'',
                description:'',
                control:'text-snippet',
                field:'',
                icon:'fa-pencil',
                published:'',
                date_asof:'',
                content:{},
            },

            formData:[
                {
                    label:'Title',
                    id:'controlTitle',
                    fieldType:'input',
                    required:true,
                    placeholder:'Title of the control',
                    errors: [
                        {id: 'controlTitle', msg: 'Title is required.', hasError:false},
                    ]
                },
                {
                    label: 'Description',
                    id: 'controlDesc',
                    fieldType: 'input',
                    required: true,
                    placeholder: 'Select a template type',
                    errors: [
                        {id: 'controlDesc', msg: 'Type is required.', hasError:false},
                    ]
                },
                {
                    label: 'Control Type',
                    id: 'controlType',
                    fieldType: 'input',
                    required: true,
                    placeholder: 'Select a template type',
                    errors: [
                        {id: 'controlType', msg: 'Type is required.', hasError:false},
                    ]
                },
                {
                    label: 'State',
                    id: 'controlState',
                    fieldType: 'select',
                    options: [
                        { id: 1, state: "Published", value:true },
                        { id: 2, state: "unPublished", value:false },
                    ],
                    required: true,
                    placeholder: 'Select a publish state',
                    errors: [
                        {id: 'controlState', msg: 'Type is required.', hasError:false},
                    ]
                },
                {
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
                    id: 'controlContent',
                    fieldType: 'editor',
                    required: true,
                    placeholder: 'Select a template type',
                    errors: [
                        {id: 'controlType', msg: 'Type is required.', hasError:false},
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

            customControls:[],
        }
    },

    methods: {   
        setupFormData(){
            if (this.action === 'create') {
                let data = {
                    name: '',
                    description:'',
                    published:'',
                    date_created: this.getDate(),
                    date_asof: '',
                    date_updated:null,
                    data:null,
                }
                return data;
            }
            if (this.action === 'clone'){
                let data = {
                    name:this.data.name,
                    description: this.data.description,
                    published:1,
                    date_created: this.getDate(),
                    date_asof: this.formatIncomingDate(this.data.date_asof),
                    date_updated: null,
                    data: JSON.stringify(this.data.data)
                }
               return data;
            }          
        },  

        getTitleValue(event, formItem){
            this.controlData.name = event;
            console.log('formItem',{event, formItem})
            this.checkErrors(this.controlData.name, formItem);
        },

        getDescriptionValue(event, formItem){
            this.controlData.description = event;
            console.log('formItem',{event, formItem})
            this.checkErrors(this.controlData.description, formItem);
        },

        changeType(event, formItem){
            console.log('event',event)
            let selectedValue = event;
            let selectedType = formItem.options.find(type => type.id == selectedValue);
            this.controlData.published = selectedType.value;
            this.checkErrors(this.controlData.published, formItem);
        },

        updateDate(event, formItem){
            if (formItem.id === 'asOf') {
                this.controlData.date_asof = event;
                this.checkErrors(this.controlData.date_asof, formItem);
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

            if (this.controlData.name != '' && 
                this.controlData.description != '' &&
                this.controlData.published != '' &&
                this.controlData.date_asof != '') {

                this.formData.forEach(formItem => {
                    formItem.errors.forEach(error =>{
                        error.hasError = false;
                    }) 
                });

                return true;
            }

            if (!this.controlData.name) {
                let formItem = this.formData.find(formItem => formItem.id === 'controlTitle');
                this.checkErrors(this.controlData.name, formItem);
            }
            if (!this.controlData.description) {
                let formItem = this.formData.find(formItem => formItem.id === 'controlDesc');
                this.checkErrors(this.controlData.description, formItem);
            }
            if (!this.controlData.published) {
                let formItem = this.formData.find(formItem => formItem.id === 'controlState');
                this.checkErrors(this.controlData.published, formItem);
            }
            if (!this.controlData.date_asof) {
                let formItem = this.formData.find(formItem => formItem.id === 'asOf');
                this.checkErrors(this.controlData.title, formItem);
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
                let formatAsofDate = this.formatOutgoingDate(this.controlData.date_asof);
                let formatField = this.controlData.name.replace(/\s+/g, '-').toLowerCase();
                let formatContent = this.controlData.content['content'];

                this.controlData['date_asof'] = formatAsofDate;
                this.controlData.field = formatField;
                this.controlData.content = formatContent;
                console.log('updated control', this.controlData);
                this.$emit('create-new-control', this.controlData);
                  // this.submitAction();

            }

        },

        submitAction(){
            if (this.action === 'create') {
                this.$emit('create-new-control', this.controlData);
            }
            if (this.action === 'clone') {
                this.$emit('clone-new-template', this.templateData);
            }
        },

        getAllData(){
            this.loading = true;
            getAllControls().then(
            axios.spread((
                {data:customControls},
                {data:customControlsLibrary}) => {
                console.log({customControls, customControlsLibrary });
               
                this.customControls = customControls;
                customControlsLibrary.forEach(libraryItem =>{
                this.customControls.push(libraryItem);
                });

                console.log('controls', this.customControls)
            })
            )
            .catch(error => {console.log(error) })
            .finally(() => (this.loading = false))
        },
    },

    mounted(){
        this.getAllData();
    }
  }
</script>

<style lang="scss">
   .form-controls{
    display:flex;
    flex-direction:row;
   }
</style>
