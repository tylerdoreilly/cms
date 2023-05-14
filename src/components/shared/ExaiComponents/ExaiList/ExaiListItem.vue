<template>
   <li class="exai-list__item"> {{ title }}</li>
</template>

<script>
    export default {
      name: 'exai-list-item',
      props: {
        title: {
          type: String,
          default: 'List Item'
        }
      },
      data () {
        return {
          isActive: true
        }
      }
    }
  </script>

<style lang="scss">
  .exai-list__item{
    font-size:12px;
    cursor:pointer;
    border-bottom:1px solid $border;
  }
</style>