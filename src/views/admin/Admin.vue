<template>
  <div id="app" class="holyGrail">
    <app-header title="Exai"/>
    <LayoutSidebarLeft>
      <template v-slot:sidebar>
        <AdminMenu></AdminMenu>
      </template>
      <router-view/>
    </LayoutSidebarLeft>  
  </div>
</template>

<script>
  import LayoutSidebarLeft from '@/components/layout/LayoutSidebarLeft.vue'
  import AppHeader from '@/components/layout/AppHeader.vue'
  import AdminMenu from '@/components/AdminMenu.vue'

  export default {
    name: 'App',
    components: {
      AppHeader,
      LayoutSidebarLeft,
      AdminMenu,
    }
  }
</script>

<style lang="scss">
 @import '@/styles/base.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body,html{
  margin:0px;
  padding:0px;
  height:100%;
  min-height:100%;
  scroll-behavior: smooth; 
}

.holyGrail{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.HolyGrail-body {
  display: flex;
  flex: 1;
}

.HolyGrail-content {
  flex: 1;
}

.HolyGrail-nav, .HolyGrail-ads {
  /* 12em is the width of the columns */
  flex: 0 0 12em;
}

.HolyGrail-nav {
  /* put the nav on the left */
  background:grey;
  order: -1;
}

</style>
