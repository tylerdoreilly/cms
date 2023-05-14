<template>
   <div :class="[$style['inner-container'], classModifiers]">    
    <div :class="[$style['inner-content']]">
        <slot name="content"></slot>
    </div>
   
    <aside :class="[$style['column--right']]" v-if="sidebar">     
      <slot name="sidebar-right"></slot>
    </aside>
  </div>
</template>

<script>

export default {
  name: 'page-layout',
  components: {
  },
  props: {
    sidebar:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      dragging: false,
    }   
  },
  computed:{
    classModifiers(){
      const obj = {}
      // obj[this.$style['exai-button--primary']] = this.variation == 'primary';
      // obj[this.$style['exai-button--secondary']] = this.variation == 'secondary';
      // obj[this.$style['exai-button--icon-only']] = this.editMode && this.activated;
      return obj
    },
  },
 
}
</script>

<style lang="scss" module>
  .inner-container{
    display: flex;
    min-height: calc(100vh - 60px);
    flex: 1;
  }

  .inner-content {
    flex:1;
    padding-right:40px;
  }

  .column--right {
    flex: 0 0 18em;
    border-left:1px solid $border;
    padding:0px 20px;
  }

</style>
