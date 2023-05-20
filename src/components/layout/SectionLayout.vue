<template>
   <div :class="[$style['content-container'], classModifiers]">

      <div 
        :class="[$style['column'], $style['column--left'], sidebarModifiers]" 
        v-if="sidebarLeft">

        <div v-if="collapsible">

          <div :class="[$style['top']]">
            <slot name="sidebar-left"></slot>
          </div> 

          <div :class="[$style['bottom']]">
            <admin-menu-ctrl @collapse-menu="toggleMenu($event)"/>
          </div>

        </div>

        <slot name="sidebar-left" v-else></slot>
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
  import AdminMenuCtrl from '@/components/admin/AdminMenuCtrl.vue';
  import {collapsibleEventBus} from '@/services/CollapsibleEventBus.js';

  export default {
    name: 'section-layout',

    components: {
      AdminMenuCtrl
    },

    data() {
        return {
          collapseMenu:false,
        }
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
      },
      collapsible:{
        type: Boolean,
        default: false,
        docs:{
          description: 'make sidebars collapsible'
        }
      }
    },

    computed: {
      classModifiers(){
        const modObj = {}
        modObj[this.$style['content-container--noSidebars']] = this.sidebarLeft === false && this.sidebarRight === false;
        modObj[this.$style['content-container--hasSidebars']] = this.sidebarLeft === true || this.sidebarRight === true;
        return  modObj
      },

      sidebarModifiers(){
        const modObj = {}
        modObj[this.$style['column--collapsible']] = this.collapsible === true;
        modObj[this.$style['column--closed']] = this.collapseMenu === true;
        return  modObj
      },
    },

    methods: {
      toggleMenu(event){
        if(event === true){
          this.collapseMenu = true;
          collapsibleEventBus.$emit('collapse-menu', event);
        } else {
          this.collapseMenu = false;
          collapsibleEventBus.$emit('collapse-menu', event);
        }
      }
    }
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
    flex: 0 0 14em;
    background: $base-white;
    padding:20px;
    position:relative;

    &--left{
      order: -1;
      border-right:1px solid $border;
    }

    &--collapsible{
      flex: 0 0 15em;
      padding:0px;
    }

    &--closed{
      flex: 20px 0 0;
    }

    &--right{
      order: 1;
      border-left:1px solid $border;
    }
  }

   .top{
    height:calc(100vh - 121px);
    padding:20px 20px 0px 20px;
  }

  .bottom{
    height:50px;
    display:flex;
    align-items:center;
    border-top:1px solid $border;
    padding-left:15px;
    background:$template-background;

  }
</style>
