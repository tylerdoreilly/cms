<template>
    <div>
    <exai-modal title="Add Dynamic Control">
        <template #exai-modal-body>
            <div v-if="!showDetails">
                <div class="form-title">Select A Control</div>
                <div class="control-list">
                    <div class="control-list__row">
                        <div class="control-list__item" @click.prevent="showDetailsForm('date')">
                            <font-awesome-icon icon="fa-solid fa-calendar" />
                            Date Placeholder
                        </div>
                        <div class="control-list__item" @click.prevent="showDetailsForm('maxChar')">
                            <font-awesome-icon icon="fa-solid fa-font" />
                            Max Characters
                        </div>
                    </div>
                    <div class="control-list__row">
                        <div class="control-list__item" @click.prevent="showDetailsForm('placeholder')">
                            <font-awesome-icon icon="fa-solid fa-p" />
                            Text Placeholder
                        </div>
                        <div class="control-list__item" @click.prevent="showDetailsForm('custom')">
                            <font-awesome-icon icon="fa-solid fa-gear" />
                            Custom Control
                        </div>
                    </div>
                    <div class="control-list__row">
                        <div class="control-list__item" @click.prevent="showDetailsForm('include')">
                            <font-awesome-icon icon="fa-solid fa-p" />
                            Include
                        </div>
                        <div class="control-list__item" @click.prevent="showDetailsForm('rule')">
                            <font-awesome-icon icon="fa-solid fa-gear" />
                            Rule
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-if="formType === 'date'">
                    <div class="modal-header-inline">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" @click.prevent="back"/>
                        <div class="modal-header-text">Date Placeholder Options</div> 
                    </div>
                    <exai-form>                    
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
                </div>
                <div v-if="formType === 'maxChar'">
                    <div class="modal-header-inline">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" @click.prevent="back"/>
                        <div class="modal-header-text">Max Character Options</div> 
                    </div>
                    <exai-form>
                        <exai-form-group>
                            <exai-form-label text="Character Limit" for="characterLimit"></exai-form-label>
                            <input type="text" id="characterLimit" class="form-control" v-model="characterLimit">
                        </exai-form-group>
                        <exai-form-group>
                            <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                            <input type="text" id="controlId" class="form-control" v-model="controlData.id">
                        </exai-form-group>
                    </exai-form>
                </div>
                <div v-if="formType === 'placeholder'">
                    <div class="modal-header-inline">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" @click.prevent="back"/>
                        <div class="modal-header-text">Text Placeholder Options</div> 
                    </div>
                    <exai-form>
                        <exai-form-group>
                            <exai-form-label text="Display Text" for="displayText"></exai-form-label>
                            <input type="text" id="displayText" class="form-control" v-model="placeholderText">
                        </exai-form-group>
                        <exai-form-group>
                            <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                            <input type="text" id="controlId" class="form-control" v-model="controlData.id">
                        </exai-form-group>
                    </exai-form>
                </div>
                <div v-if="formType === 'custom'">
                    <div class="modal-header-inline">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" @click.prevent="back"/>
                        <div class="modal-header-text">Custom Control Options</div> 
                    </div>
                    <exai-form>
                        <exai-form-group>
                            <exai-form-label text="Display Text" for="displayText"></exai-form-label>
                            <input type="text" id="displayText" class="form-control" v-model="controlData.text">
                        </exai-form-group>
                        <exai-form-group>
                            <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                            <input type="text" id="controlId" class="form-control" v-model="controlData.id">
                        </exai-form-group>
                    </exai-form>
                </div>
                <div v-if="formType === 'include'">
                    <div class="modal-header-inline">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" @click.prevent="back"/>
                        <div class="modal-header-text">Include Control Options</div> 
                    </div>
                    <exai-form>
                        <exai-form-group>
                            <exai-form-label text="Include Statement" for="include"></exai-form-label>
                            <input type="include" id="displayText" class="form-control" v-model="controlData.text">
                        </exai-form-group>
                        <exai-form-group>
                            <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                            <input type="text" id="controlId" class="form-control" v-model="controlData.id">
                        </exai-form-group>
                    </exai-form>
                </div>
                <div v-if="formType === 'rule'">
                    <div class="modal-header-inline">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" @click.prevent="back"/>
                        <div class="modal-header-text">Include Control Options</div> 
                    </div>
                    <exai-form>
                        <exai-form-group>
                            <exai-form-label text="If Statement" for="rule"></exai-form-label>
                            <input type="include" id="rule" class="form-control" v-model="controlData.text">
                        </exai-form-group>
                        <exai-form-group>
                            <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                            <input type="text" id="controlId" class="form-control" v-model="controlData.id">
                        </exai-form-group>
                    </exai-form>
                </div>
            </div>
        </template>
        <template #exai-modal-actions>
            <exai-button text="Back" @click.native.prevent="back" v-if="showDetails"></exai-button>
            <exai-button text="Cancel" @click.native.prevent="closeModal"></exai-button>
            <exai-button text="Add Control" variation="primary" @click.native.prevent="submitted" v-if="showDetails"></exai-button> 
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
            type: Number,            
        },
        controlType:{
            type: String,
        }
    },
    data() {
        return {
            control: this.controlType,
            showDetails:false,
            selectedDateFormat:'',
            characterLimit:'',
            placeholderText:'Text Placeholder',
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
        
        changeType(event){
            let selectedValue = event.target.value;
            let selectedType = this.dateFormats.find(format => format.id == selectedValue);
            this.controlData.text = selectedType.format;
        },

        submitted() {
            let data = this.formatOutput();
            console.log('control data', data);
            this.$emit('submit-control', data);
            this.closeModal();
        },

        formatOutput(){
            this.controlData.class = `dynamic-control ${this.controlType}`;
            this.controlData.text = this.formatControlText();
            let control = this.controlData;
            let type = this.controlType;
            let output = {control, type}
            return output;
        },

        formatControlText(){
            if (this.formType === 'maxChar') {
                return `[MAXIMUM ${this.characterLimit} CHARACTERS]`;
            }
            if (this.formType === 'placeholder') {
                return this.placeholderText;
            } 
            if (this.formType === 'include') {
                return `(Include ${this.controlData.text})`;
            } 
            if (this.formType === 'rule') {
                return `[If ${this.controlData.text}]`;
            } else {
                return this.controlData.text
            }
        },

        back() {
            this.showDetails = false;
            this.formType = '';
            this.clearForm();
        },

        closeModal() {
            this.showDetails = false;
            this.formType = '';
            this.clearForm();
            this.$emit('close-modal');
        },

        clearForm(){
            this.controlData.text = '';
            this.controlData.id = '';
            this.controlData.class = '';
            this.selectedDateFormat = '';
            this.characterLimit = '';
        }
    },
  }
  </script>
  
  <style lang="scss">
    .modal-header-inline{
        display:flex;
        flex-direction: row;
        gap:10px;
        border-bottom:1px solid #ccc;
        padding-bottom:15px;
        margin-top:-2px;
        margin-bottom:15px;
        font-size:15px;
    }
    .form-title{
        border-bottom:1px solid #ccc;
        padding-bottom:15px;
        margin-top:-2px;
        margin-bottom:15px;
        font-size:15px;
    }

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

    .control-list{
        display:flex;
        flex-direction: column;
        gap:10px;
    }

    .control-list__row{
        display:flex;
        justify-content: flex-start;
        flex-direction: row;
        gap:10px;
    }

    .control-list__item{
        flex:50%;
        @include flex(flex, row, $gap: 10px);
        cursor: pointer;  
        align-items:center;
        padding:12px;
        background:$white-smoke;
        border:1px solid $border;
        font-size:14px;
        font-weight: bold;

        &:hover{
            border-color:$keppel;
        }
    }

  </style>