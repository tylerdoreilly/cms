<template>
  <div :class="[$style['exai-loader-wrapper']]">
    <exai-spinner></exai-spinner>
  </div>
  
</template>

<script>
  import ExaiSpinner from './ExaiSpinner.vue'
  export default {
    name: 'exai-loader',
    components:{
      ExaiSpinner
    }
  }

</script>


<style lang="scss" module>
  .exai-loader-wrapper{
    display:flex;
    height:100vh;
  }
</style>
