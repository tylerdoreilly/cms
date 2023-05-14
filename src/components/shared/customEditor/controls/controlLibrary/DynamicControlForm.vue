<template>
    <div>
        <exai-form v-if="controlItem === 'date-placeholder'">
            <div class="form-title">Add Date Placeholder Control</div>
            <exai-form-control-group>
                <exai-form-group>
                    <exai-form-label text="Date Format" for="type"></exai-form-label>
                    <select class="form-control" v-model="selectedDateFormat" @change="changeType($event)">
                        <option value="" disabled selected>Select Date Format</option>
                        <option v-for="option in dateFormats" :key="option.id" v-bind:value="option.id" >{{ option.format }}</option>
                    </select>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Input Type" for="type"></exai-form-label>
                    <select class="form-control" v-model="selectedInputType" @change="changeInputType($event)">
                        <option value="" disabled selected>Select Input Type</option>
                        <option v-for="option in inputTypes" :key="option.id" v-bind:value="option.id" >{{ option.type }}</option>
                    </select>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                    <input type="text" id="controlId" class="form-control" v-model="controlType.id">
                </exai-form-group>
            </exai-form-control-group>
        </exai-form>
        <exai-form v-if="controlItem === 'max-characters'">
            <div class="form-title">Add Character Limit Control</div>
            <exai-form-control-group>
                <exai-form-group>
                    <exai-form-label text="Character Limit" for="characterLimit"></exai-form-label>
                    <input type="text" id="characterLimit" class="form-control" v-model="characterLimit">
                </exai-form-group> 
                <exai-form-group>
                    <exai-form-label text="Input Type" for="type"></exai-form-label>
                    <select class="form-control form-control--select" v-model="selectedInputType" @change="changeInputType($event)">
                        <option value="" disabled selected>Select Input Type</option>
                        <option v-for="option in inputTypes" :key="option.id" v-bind:value="option.id" >{{ option.type }}</option>
                    </select>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                    <input type="text" id="controlId" class="form-control" v-model="controlType.id">
                </exai-form-group>
            </exai-form-control-group>
        </exai-form>
        <exai-form v-if="controlItem === 'text-placeholder'">
            <div class="form-title">Add Text Placeholder Control</div>
            <exai-form-control-group>
                <exai-form-group>
                    <exai-form-label text="Display Text" for="displayText"></exai-form-label>
                    <input type="text" id="displayText" class="form-control" v-model="controlType.text">
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Input Type" for="type"></exai-form-label>
                    <select class="form-control" v-model="selectedInputType" @change="changeInputType($event)">
                        <option value="" disabled selected>Select Input Type</option>
                        <option v-for="option in inputTypes" :key="option.id" v-bind:value="option.id" >{{ option.type }}</option>
                    </select>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                    <input type="text" id="controlId" class="form-control" v-model="controlType.id">
                </exai-form-group>
            </exai-form-control-group>
        </exai-form>
        <exai-form v-if="controlItem === 'custom'">
            <div class="form-title">Add Custom Control</div>
            <exai-form-control-group>
                <exai-form-group>
                    <exai-form-label text="Display Text" for="displayText"></exai-form-label>
                    <input type="text" id="displayText" class="form-control" v-model="customControlText">
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Input Type" for="type"></exai-form-label>
                    <select class="form-control" v-model="selectedInputType" @change="changeInputType($event)">
                        <option value="" disabled selected>Select Input Type</option>
                        <option v-for="option in inputTypes" :key="option.id" v-bind:value="option.id" >{{ option.type }}</option>
                    </select>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                    <input type="text" id="controlId" class="form-control" v-model="controlType.id">
                </exai-form-group>
            </exai-form-control-group>
        </exai-form>
        <exai-form v-if="controlItem === 'include'">
            <div class="form-title">Add Include Control</div>
            <exai-form-control-group>
                <exai-form-group>
                    <exai-form-label text="Include Statement" for="include"></exai-form-label>
                    <input type="include" id="displayText" class="form-control" v-model="includeText">
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Input Type" for="type"></exai-form-label>
                    <select class="form-control" v-model="selectedInputType" @change="changeInputType($event)">
                        <option value="" disabled selected>Select Input Type</option>
                        <option v-for="option in inputTypes" :key="option.id" v-bind:value="option.id" >{{ option.type }}</option>
                    </select>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                    <input type="text" id="controlId" class="form-control" v-model="controlType.id">
                </exai-form-group>
            </exai-form-control-group>
        </exai-form>
        <exai-form v-if="controlItem === 'rule'">
            <div class="form-title">Add Rule Control</div>
            <exai-form-control-group>
                <exai-form-group>
                    <exai-form-label text="If Statement" for="rule"></exai-form-label>
                    <input type="include" id="rule" class="form-control" v-model="ruleText">
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Input Type" for="type"></exai-form-label>
                    <select class="form-control" v-model="selectedInputType" @change="changeInputType($event)">
                        <option value="" disabled selected>Select Input Type</option>
                        <option v-for="option in inputTypes" :key="option.id" v-bind:value="option.id" >{{ option.type }}</option>
                    </select>
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                    <input type="text" id="controlId" class="form-control" v-model="controlType.id">
                </exai-form-group>
            </exai-form-control-group>
        </exai-form>
    </div> 
</template>

<script>
    import ExaiForm from '@/components/shared/forms/ExaiForm.vue';
    import ExaiFormGroup from '@/components/shared/forms/ExaiFormGroup.vue';
    import ExaiFormControlGroup from '@/components/shared/forms/ExaiFormControlGroup.vue';
    import ExaiFormLabel from '@/components/shared/forms/ExaiFormLabel.vue';

  export default {
    name: 'dynamic-control-form',
    components:{
        ExaiForm,
        ExaiFormGroup,
        ExaiFormControlGroup,
        ExaiFormLabel,

    },
    props:{
        controlItem:{
            type: String
        },
        value:{
            type: Object,
        },
        data:{
            type:Object
        }
    },
    data() {
        return {
            controlType: this.value,
            placeholderText:'',
            selectedDateFormat:'',
            selectedInputType:'',
            characterLimit:'',
            includeText:'',
            ruleText:'',
            customControlText:'',
            dateFormats:[
                {id:1, format:'Month XX 20XX'},
                {id:2, format:'YYYY-MM-DD'}
            ],
            inputTypes:[
                {id:1, type:'Inline'},
                {id:2, type:'Block'}
            ],
        }
    },

    methods: {      
        changeType(event){
            let selectedValue = event.target.value;
            let selectedType = this.dateFormats.find(format => format.id == selectedValue);
            this.controlType.text = selectedType.format;
        },

        changeInputType(event){
            let selectedValue = event.target.value;
            let selectedInputType = this.inputTypes.find(type => type.id == selectedValue);
            this.controlType.type = selectedInputType.type;
        },

        setData() {
            this.controlType.class = this.data.control;
        },

        formatControlText(){
            if (this.controlItem === 'max-characters') {
                return `[MAXIMUM ${this.characterLimit} CHARACTERS]`;
            }
            if (this.controlItem === 'text-placeholder') {
                return this.controlType.text;
            } 
            if (this.controlItem === 'include') {
                return `(Include ${this.includeText})`;
            } 
            if (this.controlItem === 'rule') {
                return `[If ${this.ruleText}]`;
            } 
            if (this.controlItem === 'custom') {
                return this.customControlText;
            } else {
                return this.controlData.text
            }
        },

        clearForm(){
            // this.controlData.text = '';
            // this.controlData.id = '';
            // this.controlData.class = '';
            // this.selectedDateFormat = '';
            // this.characterLimit = '';
        },
    },

    watch: {
        value() {
            this.$emit('input', this.controlType);
        },

        characterLimit(){
            this.controlType.text = this.formatControlText();
        },

        customControlText(){
            this.controlType.text = this.formatControlText();
        },
        includeText(){
            this.controlType.text = this.formatControlText();
        },
        ruleText(){
            this.controlType.text = this.formatControlText();
        }
    },

    mounted(){
        this.setData();
    }
  }
</script>
  
<style lang="scss">

</style>