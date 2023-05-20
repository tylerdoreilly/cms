<template>
  <exai-form-group>

    <exai-field-label :text="label" :for="id" :required="required"></exai-field-label>

    <select 
      :class="[$style['exai-select'], classModifiers]"
      :id="id"
      v-model="selectedType"
      @change="$emit('select', $event.target.value)">

      <option value="" disabled selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.id" v-bind:value="option.id" >{{ getDisplayName(option) }}</option>
    </select>

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

  export default {
    name: 'exai-select',

    components: {
      ExaiFieldLabel,
      ExaiFieldError,
      ExaiFormGroup
    },

    props:{
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
            selectedType: this.selection,
        }
    },

    methods:{
      getDisplayName(option){
        let displayOption = option[this.displayName];     
        return displayOption;
      },
    },

    computed:{
      classModifiers(){
        const obj = {}
        obj[this.$style['exai-select--required']] = this.errors.some(error => error.hasError === true);
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
