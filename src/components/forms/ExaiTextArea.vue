<template>
 <div :class="[$style['exai-text-area'], classObject]">
  <label class="field-label">
    {{ label }}
    <span v-if="required" :class="[$style['exai-text-area__required']]">*</span>
  </label>
  <textarea type="textarea" 
    :class="[$style['exai-text-area__input']]" 
    :placeholder="placeholder"  
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)" ></textarea>
 </div>
</template>

<script>
  export default {
    name: 'ExaiTextArea',
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
  .exai-text-area{
    display:flex;
    flex-direction:column;
    gap:6px; 
    border-radius: 4px;  
  }

  .exai-text-area__input{
    border:1px solid $border;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding:12px;
    min-height:40px;
    vertical-align:top;
  }

  .exai-text-area__required{
   color:red;
  }
</style>
