<template>
  <exai-form-group>

    <exai-field-label :text="data.label" :for="data.id" :required="data.required"></exai-field-label>

    <select 
      :class="[$style['exai-select'], classModifiers]"
      :id="data.id"
      v-model="data.value" 
      @change="updateValue">

      <option value="" disabled selected>{{ data.placeholder }}</option>
      <option v-for="option in data.options" :key="option.id" v-bind:value="option.id" >{{ option[data.displayName] }}</option>
    </select>

    <template v-for="error in data.errors">
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

  export default {
    name: 'exai-select',

    components: {
      ExaiFieldLabel,
      ExaiFieldError,
      ExaiFormGroup
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

      options: {
        type: Array,
        docs:{
          validation:'_',
          description: 'Select Options'
        }
      },

      displayName: {
        type: String,
        docs:{
          validation:'_',
          description: 'key to be used for display of options'
        }
      },

      id: {
        type: String,
        docs:{
          validation:'_',
          description: 'Input Id'
        }
      },

      placeholder: {
        type: String,
        docs:{
          validation:'_',
          description: 'Input Placeholder'
        }
      },

      selection:{
        type: [Number, String, Boolean]
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
            selectedType: this.fieldData.value,
        }
    },

    methods:{
      updateValue (event) {
        this.$emit('select', event.target.value);
      },

      handleErrors(error){     
       if (error.hasError && this.data.value) {
        return false
       }else{
        return error.hasError
       }
      }
    },

    computed:{
      classModifiers(){
        const obj = {}
        obj[this.$style['exai-select--required']] = this.data.errors.some(error => error.hasError === true) && !this.data.value;
        return obj
      },
    },
  }
</script>

<style lang="scss" module>
  // Block
 
  .exai-select{
    display:flex;
    width:100%;
    flex-direction:column;
    border:1px solid $border;
    border-radius: 4px; 
    padding:10px;
  }

  // Modifiers
  .exai-select--required {
    border-color: red;
  }
</style>
