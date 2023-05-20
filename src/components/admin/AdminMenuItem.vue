<template>
  <div>
    
    <router-link :to="route" v-slot="{href, navigate, isActive}">

      <div :class="[$style['site-nav__item'], {[$style['router-link-active']] : isActive }]" v-if="!child">

        <template v-if="expanded">
            <div :class="[$style['site-nav__item-icon']]">
              <font-awesome-icon :icon="setIcon" />
            </div>    
            <a :href="href" @click="navigate"> {{ text }}</a>  
        </template>

        <template v-else>
          <div :class="[$style['site-nav__item-icon']]" :href="href" @click="navigate">
            <font-awesome-icon :icon="setIcon" />
          </div>    
        </template> 
      
      </div>

      <div :class="[$style['site-subnav__item'], {[$style['router-link-active']] : isActive }]" v-else>
          <a :href="href" @click="navigate">{{ text }}</a> 
      </div>

    </router-link>

  </div>
</template>

<script>

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

      child: {
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
          iconBase: 'fa-solid',
        }
    },

    computed:{
      setIcon(){
        let icon;
        if (this.navItemIcon) {       
          icon = `${this.iconBase} + ${this.navItemIcon}`        
        }
        return icon;
      },
    },

  }
</script>

<style lang="scss" module>

  .site-nav__item{
    @include flex(flex, row, $gap: 12px);
    align-items:center;
    border-left:4px solid $sidebar-bg;
    padding-left:10px;
    color:$gunmetal;
    padding-top:2px;
    padding-bottom:2px;
    font-size:15px;
    padding-left:20px;

    &--has-children{
      @include flex(flex, column, $gap: 12px);
    }

    &:hover{
      color:$keppel;

      > a{
        color:$keppel; 
      }
    }
  }

  .site-nav__item-icon{
    width:20px;
    cursor:pointer;
  }

  .site-nav__item.router-link-active{
    border-left:4px solid $keppel;
    font-weight:bold;
    color: $keppel;
    & > a {
      color: $keppel;
    }
  }

  
  .site-subnav__item{
    color:$gunmetal;
    font-size:13.5px;
    font-weight:normal;

    &:hover{
        color:$keppel; 

        a{
          color:$keppel; 
        }
      }

    & a {
      color:$gunmetal;

     
    }
  }

  .site-subnav__item.router-link-active{
    font-weight:bold;
    color: $keppel;
    & a {
      color: $keppel;
    }
  }

  .site-subnav__icon{
    width:16px;
    font-size:12px;
    margin-left:auto;
    color:darken($border, 20% );
    cursor:pointer;
  }
 
</style>
