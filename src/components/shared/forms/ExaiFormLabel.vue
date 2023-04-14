<template>
  <label :for="controlId" :class="[$style['exai-form-label']]">
    {{ text }}
  </label>
</template>
  
<script>
  export default {
    name: 'exai-form-label',
    props:{
      text:{
        type:String,            
      },
      for:{
        type:String,            
      },
        controlType:String
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
       
    }
</style>