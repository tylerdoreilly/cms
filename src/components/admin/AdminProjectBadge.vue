<template>

  <div :class="[$style['project-badge']]">
    <div :class="[$style['project-badge__icon']]">
      <font-awesome-icon :icon="setIcon" />
    </div>
    <div :class="[$style['project-badge__title']]" v-if="expanded">
     {{ text }}
    </div>
  </div>

</template>

<script>

  export default {
    name: 'admin-project-badge',
    components: {

    },  
    props:{
      text: {
        type: String,
        docs: {
            description: 'Nav Item Text',
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
    },
    data() {
        return {
          collapseMenu:false,
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
    methods:{
      
    },

    mounted () {

    }
  }
</script>

<style lang="scss" module>
  .project-badge {
    @include flex(flex, row, $gap:10px);
    align-items:center;
    margin-left:-2px;
    margin-bottom:25px;
  }

  .project-badge__icon{
    display:flex;
    justify-content: center;
    align-items:center;
    height:32px;
    width:32px;
    border-radius:4px;
    background:$default-background;
  }

  .project-badge__title{
    font-size:16px;
  }
  .site-subnav__item.router-link-active{
    font-weight:bold;
    color: $keppel;
    & a {
      color: $keppel;
    }
  }


</style>
