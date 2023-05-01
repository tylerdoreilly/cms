<template>
  <div :class="[$style['template-toolbar-item']]">
    <font-awesome-icon :icon="setIcon" />
    {{ title }}
  </div> 
</template>

<script>

  export default {
    name: 'template-toolbar-item',
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
  .template-toolbar-item{
    @include flex(flex, row, $gap: 10px);
    cursor: row-resize;  
    align-items:center;
    padding:12px;
    background:$white-smoke;
    border:1px solid $border;
    font-size:14px;
    font-weight: bold;
  }
 
</style>
