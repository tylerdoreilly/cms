<template>
     <div :class="[$style['exai-dl-group']]">
      <slot></slot>
    </div>
</template>

<script>
  export default {
      name: 'exai-dl-group',
  }
</script>

<style lang="scss" module>
  .exai-dl-group{
    @include flex(flex, column, $gap:8px)
  }
</style>