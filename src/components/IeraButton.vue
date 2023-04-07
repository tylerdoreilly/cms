<template>
  <button type="button" class="iera-button">{{ text }}</button>
</template>

<script>

  export default {
    name: 'iera-button',
    components: {
    
    },
    props:{
      text:{
        type: String,
        docs:{
          validation:'_',
          description:'Button text'
        }
      }
    }
  }
</script>


<style lang="scss">
  .iera-button {
    background-color: $steel-blue;
    color: white;
    font-size: 14px;
    border-radius: 4px;
    display:inline-flex;
    align-content:center;
    align-items:center;
    text-align: center;
    border:0px;
    margin:0px;
    padding:6px 8px;
    cursor:pointer;
  }
</style>
