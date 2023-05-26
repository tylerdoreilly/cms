<template>
  <exai-form-group>

    <exai-field-label :text="label" :for="id" :required="required" v-if="label"></exai-field-label>

    <div :class="[$style['exai-search'], classModifiers]">
      <div :class="[$style['exai-search__icon']]">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </div>
      
      <input type="text" 
        tabindex="0"
        :class="[$style['exai-search__input']]" 
        :placeholder="placeholder" 
        :id="id" 
        :value="value" 
        @input="updateValue"
        ref="search"/>

    </div>

  </exai-form-group>
</template>

<script>
  import ExaiFieldLabel from '@/components/shared/forms/ExaiFieldLabel.vue';
  import ExaiFormGroup from '@/components/shared/forms/ExaiFormGroup.vue';

  export default {
    name: 'exai-search',

    components: {
      ExaiFieldLabel,
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

    computed:{
      classModifiers(){
        const obj = {}
        // obj[this.$style['exai-text-field--required']] = this.errors.some(error => error.hasError === true);
        return obj
      },
    },

    methods:{
      updateValue (event) {
        this.$emit('input', event.target.value)
      }
    },
    mounted(){
      this.$refs.search.blur()
    }
  }
</script>

<style lang="scss" module>
  // Block
  .exai-search{
    display:flex;
    flex-direction:row; 
    align-items:center;  
    border:1px solid $border;
    border-radius: 4px;   
    padding-left:12px;
  }

  .exai-search__icon{
    font-size:14px;
  }

  // Elements
  .exai-search__input{
    padding:6px 12px 6px 8px;
    font-size:14px;
    border:0px;
  }

  // Modifiers
  input:focus{
    outline: none;
}
</style>
