<template>
    <div v-if="templateData">
    <exai-modal title="Clone Template">
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
                    <date-picker id="created" v-model="dateCreated" valueType="format"></date-picker>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="As of Date" for="asOf"></exai-form-label>
                    <date-picker id="asOf" v-model="dateAsOf" valueType="format"></date-picker>
                </exai-form-group>
            </exai-form>

        </template>
        <template #exai-modal-actions>
            <exai-button text="Cancel" @click.native.prevent="closeModal"></exai-button>
            <exai-button text="Clone" variation="primary" @click.native.prevent="submitted"></exai-button>
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
    name: 'template-clone',
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
        data:[Object]
    },
    data() {
        return {
            templateData:this.data,
            templateTypes: this.types,
            dateCreated: this.formatIncomingDate(this.data.date_created),
            dateAsOf: this.formatIncomingDate(this.data.date_asof),
            selectedType: this.data.type_id,
        }
    },
    methods: {
        changeType(event){
            let selectedValue = event.target.value;
            let selectedType = this.templateTypes.find(type => type.id == selectedValue);
            this.templateData['type_new'] = selectedType.id;
        },
        formatIncomingDate(item){
             return moment(String(item)).format('YYYY-MM-DD')
        },
        formatOutgoingDate(dateParam){
            let date = new Date(dateParam);
            let updatedDate = date.toISOString();
            return updatedDate;
        },
        submitted() {
            let formatCreatedDate = this.formatOutgoingDate(this.dateCreated);
            let formatAsofDate = this.formatOutgoingDate(this.dateAsOf);
            let data = JSON.stringify(this.templateData.data);
            this.templateData['date_created'] = formatCreatedDate;
            this.templateData['date_asof'] = formatAsofDate;
            this.templateData['date_updated'] = null;
            this.templateData['type_new'] = this.templateData.type_id;
            this.templateData['data'] = data;
            console.log('updated template', this.templateData);
            this.$emit('clone-new-template', this.templateData);
            this.$emit('close-modal');
        },
        closeModal() {
            this.$emit('close-modal')
        },
    },
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