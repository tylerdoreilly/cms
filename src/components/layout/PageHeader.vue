<template>
  <div class="page-header">
    <h1>{{title}}</h1>
    <slot></slot>
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
  
</style>
