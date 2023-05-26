<template>
    <div :class="[$style['exai-table-controls']]">

      <slot></slot>

      <div :class="[$style['exai-table-controls__right']]">
        <slot name="right"></slot>
      </div>
      
    </div>
</template>

<script>
    export default {
        name: 'ExaiTableControls',
    }
</script>

<style lang="scss" module>

    // Blocks
    .exai-table-controls{
        @include flex(flex, row, $gap:10px);
        align-items:center;
    }

    //Elements
    .exai-table-controls__right{
        display:flex;
        flex-direction:row;
        gap:10px;
        margin-left:auto;
    }

</style>