<template>
    <div v-if="templateData">
    <exai-modal title="Edit Template Details">
        <template #exai-modal-body>
            <exai-form>
                <exai-form-control-group>
                    <div v-for="formItem in formSettings" :key="formItem.id">
                        <template v-if="formItem.fieldType === 'input'">                     
                            <exai-text-field
                                :fieldData="formItem"
                                v-model="formItem.value">
                            </exai-text-field>
                        </template>

                        <template v-if="formItem.fieldType === 'select'">
                            <exai-select
                                :fieldData="formItem"
                                v-model="formItem.value">
                            </exai-select>
                        </template>

                        <template v-if="formItem.fieldType === 'date'">
                            <exai-date-picker
                                :fieldData="formItem"
                                v-model="formItem.value">
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
  import ExaiButton from '../shared/ExaiComponents/ExaiButton.vue';
  import ExaiModal from '../shared/ExaiComponents/ExaiModal.vue';
  import ExaiForm from '../shared/forms/ExaiForm.vue';
  import ExaiFormControlGroup from '../shared/forms/ExaiFormControlGroup.vue';
  import ExaiTextField from '../shared/forms/ExaiTextField.vue';
  import ExaiSelect from '../shared/forms/ExaiSelect.vue';
  import ExaiDatePicker from '../shared/forms/ExaiDatePicker.vue';
  import moment from 'moment';

  export default {
    name: 'template-details-edit',
    components:{
        ExaiModal,
        ExaiButton,
        ExaiForm,
        ExaiFormControlGroup,
        ExaiSelect,
        ExaiDatePicker,
        ExaiTextField
    },
    props:{
        data:[Array, Object],
        types:[Array],
    },
    data() {
        return {
            templateData: this.data,
            templateTypes: this.types,
            formSettings:[
                {
                    value: this.data.title,
                    label:'Title',
                    id:'title',
                    fieldType:'input',
                    required:true,
                    placeholder:'Title of the template',
                    errors: [
                        {id: 'title', msg: 'Title is required.', hasError:false},
                    ]
                },
                {
                    value: this.data.templateTypeId,
                    label: 'Type',
                    id: 'templateType',
                    displayName:'type',
                    fieldType: 'select',
                    options: this.types,
                    required: true,
                    placeholder: 'Select a template type',
                    errors: [
                        {id: 'templateType', msg: 'Type is required.', hasError:false},
                    ]
                },
                {
                    value: this.formatIncomingDate(this.data.date_asof),
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
        }
    },

    methods: {

        formatIncomingDate(date){
            return moment(String(date)).format('YYYY-MM-DD');
        },

        formatOutgoingDate(asOfDate){
            let date = new Date(asOfDate);
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
                let title = this.formSettings.find(item => item.id === 'title').value;
                let type = this.formSettings.find(item => item.id === 'templateType').value;
                let asOfDate = this.formSettings.find(item => item.id === 'asOf').value;

                this.templateData.title = title;
                this.templateData.templateTypeId = type;
                this.templateData.date_asof = this.formatOutgoingDate(asOfDate);

                console.log('updated template', this.templateData);

                this.submitAction();

            }

        },

        submitAction(){
            this.$emit('update-template-details', this.templateData);
            this.$emit('close-modal');
        },

        closeModal() {
            this.$emit('close-modal')
        },
    },
  }
</script>
  
<style lang="scss">

</style>