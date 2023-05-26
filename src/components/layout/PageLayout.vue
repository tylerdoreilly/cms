<template>
   <div :class="[$style['inner-container']]">    
    <div :class="[$style['inner-content'], classModifiers]">
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
    },
    center:{
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
      obj[this.$style['inner-content--center']] = this.center === true;
      obj[this.$style['inner-content--no-padding']] = this.$route.name === 'templates-edit';
      return obj
    },
  },
 
}
</script>

<style lang="scss" module>
  .inner-container{
    display: flex;
    // min-height: calc(100vh - 60px);
    flex: 1;
  }

  .inner-content {
    flex:1;
    padding-left:40px;
    padding-right:40px;

    &--center{
      flex:0 0 1200px;
      margin:0 auto;
      width:1200px;
    }

    &--no-padding{
      padding-left:0px;
      padding-right:0px;
    }
  }

  .column--right {
    flex: 0 0 18em;
    border-left:1px solid $border;
    padding:0px 20px;
  }

</style>
