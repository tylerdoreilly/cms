<template>
  <exai-loader v-if="loading"></exai-loader>
  <div v-else>
    <page-layout center>
      <template v-slot:content>
        <PageHeader title="Projects">
        </PageHeader>
        <projects-list :data="projects"></projects-list>
      </template>
    </page-layout>
  </div>
 
</template>

<script> 
  import PageHeader from '@/components/layout/PageHeader.vue';
  import PageLayout from '@/components/layout/PageLayout.vue';
  import { ExaiLoader } from '@/components/shared/ExaiComponents/index.js';
  import ProjectsList from '@/components/projects/ProjectsList.vue';

  // Services
  import { getAllProjects } from '@/services/ProjectsService';

  export default {
    name: 'AdminProjectsHome',
    components: {
      PageHeader,
      PageLayout,
      ExaiLoader,
      ProjectsList
    },
    data() {
        return {
            loading:false,
            projects: [],
        }
    },

    methods:{
      getAllProjects() {
        this.loading = true;

        getAllProjects().then(response => {
          console.log(response)
          this.projects = response
        })
        .catch(error => {console.log(error) })
        .finally(() => (this.loading = false))
      },
    },

    mounted () {
      this.getAllProjects();
    }
  }
</script>

<style lang="scss">
</style>
