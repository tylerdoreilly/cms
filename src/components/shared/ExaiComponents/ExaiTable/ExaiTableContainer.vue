<template>
    <div :class="[$style['exai-table-container']]">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'ExaiTableContainer',
    }
</script>

<style lang="scss" module>

    // Blocks
    .exai-table-container{
        @include flex(flex, column, $gap:20px)
    }

</style>