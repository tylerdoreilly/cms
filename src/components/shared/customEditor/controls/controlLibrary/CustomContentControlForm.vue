<template>
    <exai-form>
        <div class="form-title">Add Custom Content Control</div>
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
                <exai-form-label text="Display Text" for="displayText"></exai-form-label>
                <textarea type="text" id="displayText" class="form-control form-control--textarea" v-model="customControlContent"></textarea>
            </exai-form-group>
            <exai-form-group>
                <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                <input type="text" id="controlId" class="form-control" v-model="controlType.id">
            </exai-form-group>
        </exai-form-control-group>
    </exai-form> 
</template>

<script>
    import ExaiForm from '@/components/shared/forms/ExaiForm.vue';
    import ExaiFormGroup from '@/components/shared/forms/ExaiFormGroup.vue';
    import ExaiFormControlGroup from '@/components/shared/forms/ExaiFormControlGroup.vue';
    import ExaiFormLabel from '@/components/shared/forms/ExaiFormLabel.vue';

  export default {
    name: 'custom-content-control-form',
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
            customControlContent:'', 
            selectedInputType:'',
            inputTypes:[
                {id:1, type:'Inline'},
                {id:2, type:'Block'}
            ],
        }
    },
   
    methods: {      

        changeInputType(event){
            let selectedValue = event.target.value;
            let selectedInputType = this.inputTypes.find(type => type.id == selectedValue);
            this.controlType.type = selectedInputType.type;
        },

        setData() {
            this.controlType.class = this.data.control;
            this.customControlContent = this.convertHtml(this.data.content);
        },

        convertHtml(content){
            let rawText = content.replace(/<[^>]+>/g, '');
            return rawText;
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

        customControlContent(){
            this.controlType.content = this.customControlContent;
        },
    },

    mounted(){
        this.setData();
    }
  }
</script>
  
<style lang="scss">

</style>