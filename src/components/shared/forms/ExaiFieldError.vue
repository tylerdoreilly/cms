<template>
  <div :class="[$style['exai-field-error']]">
    {{ text }}
  </div>
</template>
  
<script>
  export default {
    name: 'exai-field-error',
    props:{
      text:{
        type: String,  
        default: 'Form Field Label',
        docs:{
          validation:'_',
          description: 'Input Label'
        }        
      },     
    },
  }
</script>

<style lang="scss" module>
  .exai-field-error {
      font-size:12px;
      color:red;
  }
</style>