<template>
  <exai-form-group>

    <exai-field-label :text="label" :for="id" :required="required"></exai-field-label>

    <date-picker  
        :class="{ error: hasErrors() }"
        :id="id"
        :valueType="valueType"
        v-model="selectedDate"
        @change="$emit('dateChange', selectedDate)">

    </date-picker>
    
    <template v-for="error in errors">
      <template v-if="error.hasError">
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
            selectedDate: this.value,
        }
    },

    methods:{
      hasErrors(){
        return this.errors.some(error => error.hasError === true)
      }
    },
  }
</script>

<style lang="scss">
  .mx-datepicker.error .mx-input-wrapper .mx-input{
    border-color: red !important;
  }
</style>
