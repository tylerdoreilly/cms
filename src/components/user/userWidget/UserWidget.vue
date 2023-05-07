<template>
  <div :class="[$style['user-widget']]">
    <slot></slot>
  </div>
</template>
  
<script>
  export default {
    name: 'user-widget',
  };
</script>

<style lang="scss" module>
  .user-widget{
    @include flex(flex, column, $gap: 10px);
    padding:15px;
  }
</style>