<template>

  <div :class="[$style['site-sub-menu'], classModifiers]">

    <template v-if="expanded">
      <div :class="[$style['site-nav__inner-item'], activeClass]" @click="templatesSubMenu = !templatesSubMenu">
          <div :class="[$style['site-nav__item-icon']]">
            <font-awesome-icon :icon="setIcon" />
          </div>
          {{ text }}
          <div v-if="!templatesSubMenu" :class="[$style['site-subnav__icon']]"><font-awesome-icon icon="fa-solid fa-chevron-right" /></div>
          <div v-if="templatesSubMenu" :class="[$style['site-subnav__icon']]"><font-awesome-icon icon="fa-solid fa-chevron-down" /></div>
      </div>

      <div v-if="templatesSubMenu" :class="[$style['site-subnav']]">
        <slot></slot>
      </div>
    </template>

    <template v-else>
      <div :class="[$style['site-nav__inner-item'], activeClass]" @click="toggleSubMenu()">
          <div :class="[$style['site-nav__item-icon']]">
            <font-awesome-icon :icon="setIcon" />
          </div>
      </div>
    </template>
       
  </div>

</template>

<script>
  import {collapsibleEventBus} from '@/services/CollapsibleEventBus.js';

  export default {
    name: 'admin-menu-item',
    components: {
    },  

    props:{
      text: {
        type: String,
        docs: {
            description: 'Nav Item Text',
        },
      },

      route: {
        type: String,
        docs: {
            description: 'Nav Route',
        },
      },

      icon: {
        type: String,
        docs: {
            description: 'Nav Item Icon',
        },
      },

      expanded: {
        type: Boolean,
        default:true,
        docs: {
            description: 'Nav Item Text',
        },
      },

      hasChildren: {
        type: Boolean,
        default:false,
        docs: {
            description: 'Nav Item Text',
        },
      },
    },

    data() {
        return {
          navItemIcon: this.icon,
          templatesSubMenu:false,
        }
    },

    computed:{
      classModifiers(){
        const obj = {}
        obj[this.$style['site-sub-menu--open']] = this.templatesSubMenu === true && this.expanded === true;
        return obj
      },

      activeClass(){
        const obj = {}
        obj[this.$style['router-link-active']] = this.templatesSubMenu === true || this.activeChildRoutes();
        return obj
      },

      setIcon(){
        let icon;
        if (this.navItemIcon) {       
          icon = `${this.iconBase} + ${this.navItemIcon}`        
        }
        return icon;
      },
    },

    methods:{
      activeChildRoutes(){
        if ( this.$route.name === 'controls' ||
          this.$route.name === 'controls-create' ||
          this.$route.name === 'templates' ||
          this.$route.name === 'templates-create' ||
          this.$route.name === 'templates-edit' ) {

          return true;

        } else {
          return false;
        }
      },

      toggleSubMenu(){
        this.templatesSubMenu = !this.templatesSubMenu;
        if (!this.expaneded) {
          collapsibleEventBus.$emit('collapse-menu', false);
        }
      },

      openSubMenu(){
        if (this.activeChildRoutes()) {
          this.templatesSubMenu = true;
        } else {
          this.templatesSubMenu = false;
        }
      },
    },

    mounted () {
      this.openSubMenu();
    }
  }
</script>

<style lang="scss" module>

  .site-sub-menu{
    @include flex(flex, column, $gap: 12px);
    align-items: stretch;
    padding-left:0px;
  }

  .site-sub-menu--open{
    margin-bottom:10px;
  }

  .site-nav__inner-item{
    @include flex(flex, row, $gap: 12px);
    align-items:center;
    border-left:4px solid $sidebar-bg;
    padding-left:10px;
    color:$gunmetal;
    padding-top:2px;
    padding-bottom:2px;
    font-size:15px;
    padding-left:20px;
    cursor:pointer;

    &:hover{
      color:$keppel;
    }
  }

  .site-nav__item-icon{
    width:20px;
  }

  .site-nav__inner-item.router-link-active{
    border-left:4px solid $keppel;
    font-weight:bold;
    color: $keppel;
  }


  // Sub Nav
  .site-subnav{
    display:flex;
    flex-direction:column;
    gap:8px;
    margin-left:56px;
  }

  .site-subnav__icon{
    width:16px;
    font-size:12px;
    margin-left:auto;
    color:darken($border, 20% );
  }

</style>
