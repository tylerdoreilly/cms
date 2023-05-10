<template>
  <app-layout>
    <app-header title="Exai"/>
    <section-layout sidebarLeft>
      <template v-slot:sidebar-left>
        <admin-menu />
        <admin-menu-ctrl />
      </template>
      <router-view/>
    </section-layout>  
  </app-layout>
</template>

<script> 
  import AppLayout from '@/components/layout/AppLayout.vue';
  import AppHeader from '@/components/layout/AppHeader.vue';
  import SectionLayout from '@/components/layout/SectionLayout.vue';
  import AdminMenu from '@/components/AdminMenu.vue';
  import AdminMenuCtrl from '@/components/AdminMenuCtrl.vue';

  export default {
    name: 'App',
    components: {
      AppLayout,
      AppHeader,
      SectionLayout,
      AdminMenu,
      AdminMenuCtrl
    }
  }
</script>

<style lang="scss">
</style>
