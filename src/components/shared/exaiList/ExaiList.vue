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
        items: [],
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
    flex-grow: 1;
    flex-direction: column;
    gap:8px;
  }
</style>