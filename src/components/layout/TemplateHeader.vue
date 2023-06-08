<template>
  <div :class="[$style['template-header']]">
    <h1>{{title}}</h1>
    <div :class="[$style['template-header__actions']]">
      <slot></slot>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'template-header',
  components: {
  },
  props:{
    title:{
      type: String,
      docs:{
        validation:'_',
        description:'Page header text'
      }
    }
  },
}
</script>

<style lang="scss" module>
  .template-header {
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:10px;
    margin-top:20px;
    padding-left:40px;
    padding-right:40px;
  }

  .template-header h1{
    margin:0px;
  }
  .template-header__actions{
    margin-left: auto;
    @include flex(flex, row, $gap: 10px);
  }
  
</style>
