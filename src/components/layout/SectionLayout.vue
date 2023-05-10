<template>
   <div :class="[$style['content-container'], classModifiers]">

      <div :class="[$style['column'], $style['column--left']]" v-if="sidebarLeft">
        <slot name="sidebar-left"></slot>
      </div>

      <main :class="[$style['main-content']]">
        <slot></slot>
      </main>
      
      <div :class="[$style['column'], $style['column--right']]" v-if="sidebarRight">
        <slot name="sidebar-right"></slot>
      </div>

  </div>
</template>

<script>

export default {
  name: 'section-layout',

  components: {
  },

  props: {
    sidebarLeft: {
      type: Boolean,
      docs: {
          description: 'If true, displays a left sidebar',
      },
    },
    sidebarRight: {
      type: Boolean,
      docs: {
          description: 'If true, displays a Right sidebar',
      },
    }
  },

  computed: {
    classModifiers(){
      const modObj = {}
      modObj[this.$style['content-container--noSidebars']] = this.sidebarLeft === false && this.sidebarRight === false;
      modObj[this.$style['content-container--hasSidebars']] = this.sidebarLeft === true || this.sidebarRight === true;
      return  modObj
    },
  },
}
</script>

<style lang="scss" module>
  .content-container {
    display: flex;
    flex-direction:row;
    flex: 1;

    &--hasSidebars{
      gap:40px;
    }

    &--noSidebars{
      margin-right:40px;
      margin-left:40px;
    }
  }

  .main-content {
    flex: 1;
  }

  .column{
    flex: 0 0 12em;
    background: $base-white;
    padding:20px;
    position:relative;

    &--left{
      order: -1;
      border-right:1px solid $border;
    }

    &--right{
      order: 1;
      border-left:1px solid $border;
    }
  }

</style>
