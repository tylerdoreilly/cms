<template>
     <dl :class="[$style['exai-dl']]">
      <slot></slot>
    </dl>
</template>

<script>
  export default {
      name: 'exai-dl',
  }
</script>

<style lang="scss" module>
  .exai-dl{
    @include flex(flex, column, $gap:15px)
  }
</style>