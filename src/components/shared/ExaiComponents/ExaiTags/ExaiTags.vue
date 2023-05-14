<template>
  <div :class="[$style['exai-tags']]">
    <slot></slot>
  </div>
</template>

<script>
  export default { 
    name: 'exai-tags',
  }
</script>

<style lang="scss" module>
  .exai-tags{
    @include flex(inline-flex, row, $gap:8px);
    align-items:center;
  }
</style>
