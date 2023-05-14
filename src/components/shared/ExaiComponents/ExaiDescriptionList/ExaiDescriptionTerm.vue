<template>
     <dt :class="[$style['exai-dt']]">
      <slot></slot>
    </dt>
</template>

<script>
  export default {
      name: 'exai-dt',
  }
</script>

<style lang="scss" module>
  .exai-dt{
    font-size:14px;
  }
</style>