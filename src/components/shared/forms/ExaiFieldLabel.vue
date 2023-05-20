<template>
  <label :for="controlId" :class="[$style['exai-form-label']]">
    {{ text }}
    <span v-if="required" :class="[$style['exai-form-label--required']]">*</span>
  </label>
</template>
  
<script>
  export default {
    name: 'exai-form-label',
    props:{
      text:{
        type: String,  
        default: 'Form Field Label',
        docs:{
          validation:'_',
          description: 'Input Label'
        }        
      },

      for:{
        type: String,
        docs:{
          validation:'_',
          description: 'The form control attached to label'
        }                 
      },
      
      required:{
        type:Boolean,
        default:false,
        docs:{
          validation:'_',
          description: 'If control is required'
        }
      }
    },
    data() {
        return {
            controlId: this.for,
        }
    },
  }
</script>

<style lang="scss" module>
    .exai-form-label {
       font-size:14px;

       &--required{
        color:red;
       }
    }
</style>