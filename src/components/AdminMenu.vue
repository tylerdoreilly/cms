<template>
  <div id="nav" class="nav">
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
</template>

<script>

  export default {
    name: 'AdminMenu',
    components: {
    },
   
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
    // & .menu-icon .fa-gauge{
    //   color: $keppel;
    // }
  }



</style>
