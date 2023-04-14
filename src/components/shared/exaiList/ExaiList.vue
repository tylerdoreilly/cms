<template>
  <ul role="list" class="exai-list">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'exai-list',
    data () {
      return {
        items: [],        // all of the tabs
      }
    },
    created () {
      this.items = this.$children
   },
  }
</script>

<style lang="scss">
  .exai-list{
    list-style-type: none;
    margin:0px;
    padding:0px;
    display:flex;
    flex-direction: column;
    gap:8px;
  }

  // .exai-tabs__item{
  //   padding:4px;
  //   cursor:pointer;
  //   &--selected{
  //     border-bottom:2px solid $keppel
  //   }
  // }
</style>