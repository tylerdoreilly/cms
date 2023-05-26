<template>
  <exai-form-group>

    <exai-field-label :text="data.label" :for="data.id" :required="data.required"></exai-field-label>

    <date-picker  
      :class="{ error: hasErrors() }"
      :id="data.id"
      :valueType="data.valueType"
      v-model="data.value"
      @change="updateValue" />

    
    <template v-for="error in errors">
      <template v-if="handleErrors(error)">
        <exai-field-error :text="error.msg" :key="error.id"></exai-field-error>
      </template>
    </template>

  </exai-form-group>  
</template>

<script>
  import ExaiFieldError from './ExaiFieldError.vue';
  import ExaiFieldLabel from './ExaiFieldLabel.vue';
  import ExaiFormGroup from './ExaiFormGroup.vue';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  export default {
    name: 'exai-date-picker',

    components: {
      ExaiFieldLabel,
      ExaiFieldError,
      ExaiFormGroup,
      DatePicker
    },

    props:{
      fieldData: {
        type: Object,
        docs:{
          validation:'_',
          description: 'Input Label'
        }
      },

      label: {
        type: String,
        docs:{
          validation:'_',
          description: 'Input Label'
        }
      },

      valueType: {
        type: String,
        docs:{
          validation:'_',
          description: 'Select Options'
        }
      },

      id: {
        type: String,
        docs:{
          validation:'_',
          description: 'Input Id'
        }
      },

      value:{
        type: String
      },

      required: {
        type: Boolean,
        docs:{
          validation:'_',
          description: 'Input Label'
        }
      },

      errors:{
        type:Array,
        docs:{
          validation:'_',
          description: 'Field Errors'
        }
      },
    },

    data() {
        return {
            data: this.fieldData,
            selectedDate: this.fieldData.value,
        }
    },

    methods:{
      updateValue (event) {
        this.$emit('date', event);
      },

      hasErrors(){
        return this.data.errors.some(error => error.hasError === true) && !this.data.value
      },

      handleErrors(error){     
       if (error.hasError && this.data.value) {
        return false
       }else{
        return error.hasError
       }
      }
    },
  }
</script>

<style lang="scss">
  .mx-datepicker.error .mx-input-wrapper .mx-input{
    border-color: red !important;
  }
</style>
