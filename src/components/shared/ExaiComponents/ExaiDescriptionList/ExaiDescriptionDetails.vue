<template>
     <dd :class="[$style['exai-dd']]">
      <slot></slot>
     </dd>
</template>

<script>
  export default {
      name: 'exai-dd',
  }
</script>

<style lang="scss" module>
  .exai-dd{
    margin:0px;
  }
</style>