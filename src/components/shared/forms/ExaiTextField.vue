<template>
  <exai-form-group>

    <exai-field-label :text="data.label" :for="data.id" :required="data.required"></exai-field-label>

    <div :class="[$style['exai-text-field'], classModifiers]">
      <input type="text" 
        tabindex="0"
        :class="[$style['exai-text-field__input']]" 
        :placeholder="data.placeholder" 
        :id="data.id" 
        :value="data.value" 
        @input="updateValue"
        ref="textInput" />
    </div>

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
    name: 'exai-text-field',

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

      value:{
        type: String
      },
    },

    data() {
        return {
          data: this.fieldData
        }
    },

    methods:{
      updateValue (event) {
        this.$emit('input', event.target.value);
      },

      handleErrors(error){     
       if (error.hasError && this.value) {
        return false
       }else{
        return error.hasError
       }
      }
    },

    computed:{
      classModifiers(){
        const obj = {}
        obj[this.$style['exai-text-field--required']] = this.data.errors.some(error => error.hasError === true) && !this.value;
        return obj
      },

     
    } 
  }
</script>

<style lang="scss" module>
  // Block
  .exai-text-field{
    display:flex;
    flex-direction:column;
     
  }

  // Elements
  .exai-text-field__input{
    border:1px solid $border;
    border-radius: 4px; 
    padding:10px;
  }

  // Modifiers
  .exai-text-field--required .exai-text-field__input {
    border-color: red;
  }
</style>
