<template>
   <div :class="[$style['template-container']]">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'template-container',
}
</script>

<style lang="scss" module>
  .template-container {
    @include flex(flex, column, $gap: 15px);
    padding: 15px 0px;
    text-align: initial;
    min-height:400px;
  }
</style>
