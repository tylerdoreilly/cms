<template>
  <div :class="[$style['page-header'], classModifiers]">

    <div :class="[$style['page-header__wrapper']]">
      <h1 :class="[$style['page-header__titler']]">{{title}}</h1>
      <div :class="[$style['page-header__actions']]">
        <slot></slot>
      </div> 
    </div>

    <div :class="[$style['page-header__description']]" v-if="hasDescription">
      <slot name="description"></slot>
    </div>

  </div>
    
</template>

<script>

export default {
  name: 'PageHeader',
  components: {
  },

  props:{
    title:{
      type: String,
      docs:{
        validation:'_',
        description:'Page header text'
      }
    },
    hasBorder:{
      type: Boolean,
      Default:false,
      docs:{
        validation:'_',
        description:'Adds a divider border after the page title'
      }
    }
  },

  computed:{
      classModifiers(){
        const obj = {}
        obj[this.$style['page-header--has-border']] = this.hasBorder === true;
        return obj
      },

      hasDescription() {
        return !!this.$slots.description
      }
    },
}
</script>

<style lang="scss" module>
  .page-header {
    @include flex(flex, column, $gap:15px);
    margin-top:20px;
    margin-bottom:20px;

    &--has-border{
      border-bottom:1px solid $border;
      margin-bottom:20px;
      padding-bottom:20px;
    }
  }

  .page-header__wrapper{
    @include flex(flex, row, $gap:10px);
    align-items:center;
  }

  .page-header h1{
    margin:0px;
  }
  .page-header__actions{
    margin-left: auto;
    @include flex(flex, row, $gap: 10px);
  }
  
</style>
