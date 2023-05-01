<template>
  <div class="page-header">
    <h1>{{title}}</h1>
    <div class="page-header__actions">
      <slot></slot>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'PageHeader',
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

<style lang="scss">
  .page-header {
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:10px;
  }
  .page-header__actions{
    margin-left: auto;
    @include flex(flex, row, $gap: 10px);
  }
  
</style>
