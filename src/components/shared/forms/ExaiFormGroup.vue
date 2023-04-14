<template>
    <div :class="[$style['exai-form-group']]">
        <slot></slot>
    </div>
</template>
  
<script>
  export default {
    name: 'exai-form-group',
  }
</script>

<style lang="scss" module>
    .exai-form-group {
        display: flex;
        flex-direction: column;
        gap:6px;
    }
</style>