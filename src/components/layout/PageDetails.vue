<template>
  <div class="template-details">
    <div class="template-details__content">
      <h1 class="template-title">{{title}}</h1>
      <div>{{ type }}</div>
    </div>
    <div class="template-details__controls">
      <slot></slot>
    </div>    
  </div>
</template>

<script>

export default {
  name: 'PageDetails',
  components: {
  },
  props:{
    title:{
      type: String,
      docs:{
        validation:'_',
        description:'Page header text'
      }
    },
    type:{
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
  .template-details {
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:10px;
    padding-bottom:15px;
    border-bottom:1px solid $border;
    margin-bottom:20px;
  }

  .template-details__controls{
    margin-left: auto;
    display:flex;
    flex-direction: row;
    gap:10px;
  }

  .template-title{
    font-size:18px;
    margin-bottom:5px;
  }
</style>
