<template>
    <form :class="[$style['exai-form']]">
        <slot></slot>
    </form>
</template>
  
<script>
  export default {
    name: 'exai-form',
  }
</script>

<style lang="scss" module>
    .exai-form {
        display: flex;
        flex-direction: column;
        gap:20px;
    }
</style>