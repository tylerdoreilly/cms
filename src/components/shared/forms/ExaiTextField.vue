<template>
 <div :class="[$style['exai-text-field'], classObject]">
  <label class="field-label">
    {{ label }}
    <span v-if="required" :class="[$style['exai-text-field__required']]">*</span>
  </label>
  <input type="text" 
    :class="[$style['exai-text-field__input']]" 
    :placeholder="placeholder"  
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)" />
 </div>
</template>

<script>
  export default {
    name: 'ExaiTextField',
    components: {
    
    },
    props:{
      label: {
        type: String,
        docs:{
          validation:'_',
          description: 'Input Label'
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
      required:{
        type:Boolean,
        default:false,
        docs:{
          validation:'_',
          description: 'Input Placeholder'
        }
      }
    }
   
  }
</script>

<style lang="scss" module>
  .exai-text-field{
    display:flex;
    flex-direction:column;
    gap:6px; 
    border-radius: 4px;  
  }

  .exai-text-field__input{
    border:1px solid $border;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding:12px;
  }

  .exai-text-field__required{
   color:red;
  }
</style>
