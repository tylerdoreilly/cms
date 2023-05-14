<template>
  <div>
    <div id="nav" class="nav" v-if="!collapseMenu">
      <router-link class="nav-item" to="/admin/dashboard">
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-gauge" />
        </div>
        
        Dashboard
      </router-link>
      <router-link class="nav-item" to="/admin/templates">
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-layer-group" />
        </div>
      
        Templates
      </router-link>
      <router-link class="nav-item" to="/admin/forms">
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-list-check" />
        </div>
        
        Forms
      </router-link>
      <router-link class="nav-item" to="/admin/users">
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-user-group" />
        </div>
        
        Users
      </router-link>
    </div>
    <div id="nav" class="nav" v-else>
      <router-link class="nav-item" to="/admin/dashboard">
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-gauge" />
        </div>
      </router-link>
      <router-link class="nav-item" to="/admin/templates">
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-layer-group" />
        </div>
      </router-link>
      <router-link class="nav-item" to="/admin/forms">
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-list-check" />
        </div>
      </router-link>
      <router-link class="nav-item" to="/admin/users">
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-user-group" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {collapsibleEventBus} from '@/services/CollapsibleEventBus.js';

  export default {
    name: 'admin-menu',
    components: {
    },  

    data() {
        return {
          collapseMenu:false,
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

<style lang="scss">
  .nav {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position:sticky;
    top:75px;
    margin-left:-20px;
    
  }

  .nav-item {
    @include flex(flex, row, $gap: 12px);
    border-left:4px solid $sidebar-bg;
    padding-left:10px;
    color:$gunmetal;
    padding-top:2px;
    padding-bottom:2px;
    font-size:15px;
    padding-left:20px;
  }

  .menu-icon{
    width:20px;
  }

  .nav-item.router-link-active{
    border-left:4px solid $keppel;
    font-weight:bold;
    color: $keppel;
  }

</style>
