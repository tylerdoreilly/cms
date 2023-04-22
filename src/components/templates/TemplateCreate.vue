<template>
    <div v-if="templateData">
    <exai-modal title="Create Template">
        <template #exai-modal-body>
            <exai-form>
                <exai-form-group>
                    <exai-form-label text="Title" for="templateTitle"></exai-form-label>
                    <input type="text" id="templateTitle" class="form-control" v-model="templateData.title">
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Type" for="type"></exai-form-label>
                    <select class="form-control" v-model="selectedType" @change="changeType($event)">
                        <option value="" disabled selected>Select your option</option>
                        <option v-for="option in templateTypes" :key="option.id" v-bind:value="option.id" >{{ option.type }}</option>
                    </select>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Date Created" for="created"></exai-form-label>
                    <date-picker id="created" v-model="templateData.date_created" valueType="format"></date-picker>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="As of Date" for="asOf"></exai-form-label>
                    <date-picker id="asOf" v-model="templateData.date_asof" valueType="format"></date-picker>
                </exai-form-group>
            </exai-form>

        </template>
        <template #exai-modal-actions>
            <exai-button text="Cancel" variation="secondary" @click.native.prevent="closeModal"></exai-button>
            <exai-button text="Save" variation="primary" @click.native.prevent="submitted"></exai-button>
        </template>    
    </exai-modal>
    </div>
</template>
  
<script>
  import ExaiButton from '../shared/ExaiButton.vue';
  import ExaiModal from '../shared/ExaiModal.vue';
  import ExaiForm from '../shared/forms/ExaiForm.vue';
  import ExaiFormGroup from '../shared/forms/ExaiFormGroup.vue';
  import ExaiFormLabel from '../shared/forms/ExaiFormLabel.vue';
  import moment from 'moment';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  export default {
    name: 'template-create',
    components:{
        ExaiModal,
        ExaiButton,
        ExaiForm,
        ExaiFormGroup,
        ExaiFormLabel,
        DatePicker
    },
    props:{
        types:[Array],
    },
    data() {
        return {
            templateData: {
                title: '',
                type_new:'',
                date_created: this.getDate(),
                date_asof: '',
                date_updated:null,
                data:null,
            },
            templateTypes: this.types,
            selectedType: '',
        }
    },
    methods: {
        changeType(event){
            let selectedValue = event.target.value;
            let selectedType = this.templateTypes.find(type => type.id == selectedValue);
            this.templateData['type_new'] = selectedType.id;
        },
        getDate(){
            let currentDate = new Date(Date.now());
            let formatDate = moment(String(currentDate)).format('YYYY-MM-DD')
            return formatDate
        },
        formatIncomingDate(){
             return moment(String(this.data.date_asof)).format('YYYY-MM-DD')
        },
        formatOutgoinggDate(dateParam){
            let date = new Date(dateParam);
            let updatedDate = date.toISOString();
            return updatedDate;
        },
        submitted() {
            let formatCreatedDate = this.formatOutgoinggDate(this.templateData.date_created);
            let formatAsofDate = this.formatOutgoinggDate(this.templateData.date_asof);
            this.templateData['date_created'] = formatCreatedDate;
            this.templateData['date_asof'] = formatAsofDate;
            console.log('updated template', this.templateData);
            this.$emit('create-new-template', this.templateData);
            this.$emit('close-modal')
        },
        closeModal() {
            this.templateData = '';
            this.$emit('close-modal')
        },
    },
    mounted(){
        console.log('template', this.templateData);
        console.log('template types', this.templateTypes)
    }
  }
</script>
  
  <style lang="scss">

    .form-group{
        display:flex;
        flex-direction: column;
        gap:6px;
        margin-bottom:15px;
    }

    .form-control{
        border:1px solid $border;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        padding:10px;
    }
   
  </style>