<template>
    <div>
    <exai-modal title="Add Dynamic Control">
        <template #exai-modal-body>
            <div v-if="!showDetails">
                <p>Select a control</p>
                <ul>
                    <li><a  @click.prevent="showDetailsForm('date')">Date Placeholder</a></li>
                    <li><a  @click.prevent="showDetailsForm('maxChar')">Max Characters</a></li>
                    <li><a  @click.prevent="showDetailsForm('placeholder')">Text Placeholder</a></li>
                </ul>
            </div>
            <div v-else>
                <exai-form v-if="formType === 'date'">
                    <p>Date Placeholder Options</p>
                    <exai-form-group>
                        <exai-form-label text="Control Text" for="controlText"></exai-form-label>
                        <input type="text" id="controlText" class="form-control" v-model="controlData.text">
                    </exai-form-group>
                    <exai-form-group>
                    <exai-form-label text="Date Format" for="type"></exai-form-label>
                        <select class="form-control" v-model="selectedDateFormat" @change="changeType($event)">
                            <option value="" disabled selected>Select Date Format</option>
                            <option v-for="option in dateFormats" :key="option.id" v-bind:value="option.id" >{{ option.format }}</option>
                        </select>
                    </exai-form-group>
                    <exai-form-group>
                        <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                        <input type="text" id="controlId" class="form-control" v-model="controlData.id">
                    </exai-form-group>
                </exai-form>
                <exai-form v-if="formType === 'maxChar'">
                    <p>Max Character Form</p>
                </exai-form>
                <exai-form v-if="formType === 'placeholder'">
                   <p>Text Placeholder Form</p>
                </exai-form>
            </div>
           
        </template>
        <template #exai-modal-actions>
            <exai-button text="Back" variation="secondary" @click.native.prevent="back" v-if="showDetails"></exai-button>
            <exai-button text="Add Control" variation="primary" @click.native.prevent="submitted"></exai-button> 
        </template>
      
    </exai-modal>
    </div>
</template>
  
<script>
  import ExaiButton from '../ExaiButton.vue';
  import ExaiModal from '../ExaiModal.vue';
  import ExaiForm from '../forms/ExaiForm.vue';
  import ExaiFormGroup from '../forms/ExaiFormGroup.vue';
  import ExaiFormLabel from '../forms/ExaiFormLabel.vue';
  export default {
    name: 'insert-dynamic-control-modal',
    components:{
        ExaiModal,
        ExaiButton,
        ExaiForm,
        ExaiFormGroup,
        ExaiFormLabel
    },
    props:{
        sectionId:{
            type:Number,            
        },
        controlType:String
    },
    data() {
        return {
            control: this.controlType,
            showDetails:false,
            selectedDateFormat:'',
            formType:'',
            controlData: {
                text: '',
                id:'',
                class:'',
                section: this.sectionId,
            },
            dateFormats:[
                {id:1, format:'Month XX 20XX'},
                {id:2, format:'YYYY-MM-DD'}
            ]
        }
    },
    methods: {
        showDetailsForm(controlType){
            this.showDetails = true;
            this.formType = controlType;
        },
        back() {
            this.showDetails = false;
            this.formType = '';
        },

        submitted() {
            this.controlData.class = `dynamic-control ${this.controlType}`
            let control = this.controlData
            let type = this.controlType
            this.$emit('submit-control',{control, type});
            this.$emit('close-modal')
        }
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