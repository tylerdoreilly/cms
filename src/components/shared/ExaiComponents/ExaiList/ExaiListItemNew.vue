<template>
   <li class="exai-list__item">
      <slot></slot>
   </li>
</template>

<script>
    export default {
      name: 'exai-list-item-new',
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
    padding:5px 0px;
    cursor:pointer;
    border-top:1px solid $border;
  }
</style>