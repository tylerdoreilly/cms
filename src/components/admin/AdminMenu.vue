<template>
  <div>
    <admin-project-badge :text="projectData.title" icon="fa-chevron-right" :expanded="!collapseMenu"></admin-project-badge>

    <div id="nav" :class="[$style['site-nav']]">
      <admin-menu-item text="Dashboard" :route="'/admin/project/' + id + '/dashboard'" icon="fa-gauge" :expanded="!collapseMenu" />

      <admin-sub-menu text="Templates" icon="fa-layer-group" route="#" :expanded="!collapseMenu">
        <admin-menu-item child text="Project Templates" :route="'/admin/project/' + id + '/templates'" />
        <admin-menu-item child text="Template Types" :route="'/admin/project/' + id + '/types'" />
        <admin-menu-item child text="Custom Controls" :route="'/admin/project/' + id + '/custom-controls'" />
      </admin-sub-menu>  

      <admin-menu-item text="Forms" :route="'/admin/project/' + id + '/forms'" icon="fa-list-check" :expanded="!collapseMenu" />

      <admin-menu-item text="Users" :route="'/admin/project/' + id + '/users'" icon="fa-user-group" :expanded="!collapseMenu" />    
    </div>
  </div>

</template>

<script>
  import {collapsibleEventBus} from '@/services/CollapsibleEventBus.js';
  import AdminProjectBadge from '@/components/admin/AdminProjectBadge.vue';
  import AdminMenuItem from './AdminMenuItem.vue';
  import AdminSubMenu from './AdminSubMenu.vue';

  export default {
    name: 'admin-menu',
    components: {
      AdminMenuItem,
      AdminSubMenu,
      AdminProjectBadge,
    },  

    props:{
      projectData:{
        type:Object,
        description: 'Selected Project'
      }
    },

    data() {
        return {
          collapseMenu:false,
          id:1,
        }
    },

    methods:{
      menuCollapse(){
        collapsibleEventBus.$on('collapse-menu', (data) => {
          this.collapseMenu = data;
          console.log('collapse menu in admin menu',data)
        });
      },
    },

    mounted () {
      this.menuCollapse();
    }
  }
</script>

<style lang="scss" module>
  .site-nav {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position:sticky;
    top:75px;
    margin-left:-20px;   
  }

  .site-subnav__item{
    color:$gunmetal;
    font-size:13.5px;
    font-weight:normal;

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


</style>
