<template>
    <form :class="[$style['exai-form-control-group']]">
        <slot></slot>
    </form>
</template>
  
<script>
  export default {
    name: 'exai-form-control-group',
  }
</script>

<style lang="scss" module>
    .exai-form-control-group {
        display: flex;
        flex-direction: column;
        gap:20px;
    }
</style>