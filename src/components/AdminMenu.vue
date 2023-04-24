<template>
  <div id="nav" class="nav">
    <router-link class="nav-item" to="/admin/dashboard">Dashboard</router-link>
    <router-link class="nav-item" to="/admin/templates">Templates</router-link>
    <router-link class="nav-item" to="/admin/forms">Forms</router-link>
    <!-- <router-link class="nav-item" to="/admin/pages">Content Types</router-link> -->
    <router-link class="nav-item" to="/admin/users">Users</router-link>
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
    top:85px;
  }

  .nav-item {
    border-left:2px solid $sidebar-bg;
    padding-left:10px;
    color:$gunmetal;
    padding-top:2px;
    padding-bottom:2px;
    font-size:14px;
  }

  .nav-item.router-link-active{
    border-left:2px solid $keppel;
  }



</style>
