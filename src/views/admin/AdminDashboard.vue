<template>
  <exai-loader v-if="loading"></exai-loader>
  <div v-else>
    <page-layout center>
      <template v-slot:content>
        <PageHeader title="Dashboard">
        </PageHeader>
        <content-block title="Latest Templates">
          <TemplatesList 
            :templates="templates"
            @open-clone-template="openCloneModal($event)"
            @open-delete-template="openDeletePrompt($event)">
          </TemplatesList>
        </content-block>
        <p>WIP</p>
      </template>
    </page-layout>
  </div>
</template>

<script>
  import PageHeader from '../../components/layout/PageHeader.vue';
  import PageLayout from '../../components/layout/PageLayout.vue';
  import contentBlock from '../../components/shared/contentBlock.vue';
  import TemplatesList from '../../components/templates/TemplatesList.vue';
  import { ExaiLoader } from '@/components/shared/ExaiComponents/index.js';
  import { getTemplatesListNew } from '../../services/TemplatesService'

  const axios = require('axios');

  export default {
    name: 'AdminDashboard',
    components: {
      PageHeader,
      PageLayout,
      ExaiLoader,
      contentBlock,
      TemplatesList
    },
    data() {
        return {
            createTemplate:false,
            cloneTemplate:false,
            showdeleteTemplate:false,
            loading:false,
            templates: [],
            templateTypes: [],
            numberOfTemplates: 0,
            template:'',
            id: this.$route.params.id,
        }
    },
    methods:{
      async getAllData() {
        this.loading = true;
        getTemplatesListNew(this.id).then(
          axios.spread(({data: templates}, {data:templateTypes}) => {
            console.log({templates, templateTypes });
            this.templates = templates;
            this.numberOfTemplates = this.templates.length;
            this.templateTypes = templateTypes;
          })
        )
        .catch(error => {console.log(error) })
        .finally(() => (this.loading = false))
      },
    },
    mounted () {
      this.getAllData();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
