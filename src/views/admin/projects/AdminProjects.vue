<template>
 <app-layout>
    <section-layout sidebarLeft collapsible>
      <template v-slot:sidebar-left>
        <admin-menu :projectData="project"/>
      </template>
      <router-view/>
    </section-layout>  
  </app-layout>
</template>

<script> 
  import AppLayout from '@/components/layout/AppLayout.vue';
  import SectionLayout from '@/components/layout/SectionLayout.vue';
  import AdminMenu from '@/components/admin/AdminMenu.vue';

  // Services
  import { getProject } from '@/services/ProjectsService';

  export default {
    name: 'AdminProjects',
    components: {
      AppLayout,
      SectionLayout,
      AdminMenu,
    },
    data() {
        return {
            loading:false,
            id: this.$route.params.id,
            project: {},
        }
    },

    methods:{
      getProject() {
        this.loading = true;

        getProject(this.id).then(response => {
          console.log(response)
          this.project = response
        })
        .catch(error => {console.log(error) })
        .finally(() => (this.loading = false))
      },
    },
    mounted () {
      this.getProject();
    }
  }
</script>

<style lang="scss">
</style>
