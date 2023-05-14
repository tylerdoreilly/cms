<template>
    <div :class="[$style['control-library-menu']]">
        <div :class="[$style['control-library-menu__sidebar']]">
            <slot name="control-library-filters"></slot>
        </div>
        <div :class="[$style['control-library-menu__content']]">
            <slot name="control-library-list"></slot>
        </div>
    </div>
</template>
  
<script>

  export default {
    name: 'control-library-menu',
    components:{
    },
    props:{
    },
  }
</script>
  
<style lang="scss" module>
    .control-library-menu{
        @include flex(flex, row, $gap:20px)
    }

    .control-library-menu__sidebar{
        flex: 0 0 12em;
        border-right: 1px solid $border;
        padding-top:20px;
        padding-right:20px;
    }

    .control-library-menu__content{
        // flex:1;
        width:740px;
        padding-top:20px;
        padding-right:20px;
        padding-bottom:20px;
        overflow-y:auto;
    }
</style>