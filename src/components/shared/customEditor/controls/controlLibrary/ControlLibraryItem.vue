<template>
  <div :class="[$style['control-library-item']]">
    <font-awesome-icon :icon="setIcon" />
    {{ title }}
  </div> 
</template>

<script>

  export default {
    name: 'control-library-item',
    props: {
      title:{
        type:String,
        docs:{
          validation:'_',
          description: 'Template Item Title'
        }
      },
      icon:{
        type: String,
        docs:{
          validation: '_',
          description:"icon selection"
        }
      },
    },
    data() {
      return {
        iconBase: 'fa-solid',
        headerIcon: this.icon,
      }
    },
    computed:{
      setIcon(){
        let buildIcon = `${this.iconBase} + ${this.headerIcon}`    
        return buildIcon
      },
    },
  }
</script>

<style lang="scss" module>
  .control-library-item{
    @include flex(flex, row, $gap: 10px);
    cursor: pointer;  
    align-items:center;
    padding:12px;
    background:$white-smoke;
    border:1px solid $border;
    font-size:14px;
    font-weight: bold;

    &:hover{
      border-color:$keppel;
    }
  }
 
</style>
