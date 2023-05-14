<template>
  <app-layout>
    <app-header title="Exai"/>
    <section-layout sidebarLeft collapsible>
      <template v-slot:sidebar-left>
        <admin-menu />
      </template>
      <router-view/>
    </section-layout>  
  </app-layout>
</template>

<script> 
  import AppLayout from '@/components/layout/AppLayout.vue';
  import AppHeader from '@/components/layout/AppHeader.vue';
  import SectionLayout from '@/components/layout/SectionLayout.vue';
  import AdminMenu from '@/components/admin/AdminMenu.vue';

  export default {
    name: 'App',
    components: {
      AppLayout,
      AppHeader,
      SectionLayout,
      AdminMenu,
    }
  }
</script>

<style lang="scss">
</style>
