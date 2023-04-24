<template>
  <div class="page-wrapper">
    <PageHeader title="Templates">
      <exai-button text="Create Template" variation="primary" @click.native="openModal()"></exai-button>
    </PageHeader>
    <exai-loader v-if="loading"></exai-loader>
    <TemplatesList 
      v-else
      :templates="templates"
      @clone-template="createNewTemplate($event)">
    </TemplatesList>
      
    <template-create
      v-if="createTemplate"
      :types="templateTypes"
      @close-modal="createTemplate = false"
      @create-new-template="createNewTemplate($event)">
    </template-create>
  </div>
</template>

<script>
  import PageHeader from '../../../components/layout/PageHeader.vue'
  import TemplatesList from '../../../components/templates/TemplatesList.vue'
  import ExaiLoader from '../../../components/shared/ExaiLoader.vue'
  import ExaiButton from '../../../components/shared/ExaiButton.vue'
  import { getTemplatesList } from '../../../services/TemplatesService'
  import TemplateCreate from '../../../components/templates/TemplateCreate.vue'

  const axios = require('axios');

  export default {
    name: 'AdminTemplates',
    components: {
      TemplateCreate,
      TemplatesList,
      PageHeader,
      ExaiButton,
      ExaiLoader
    },
    data() {
        return {
            showModal: false,
            createTemplate:false,
            templates: [],
            templateTypes: [],
            numberOfTemplates: 0,
            loading:false
        }
    },
    methods: {
      async getAllData() {
        this.loading = true;
        getTemplatesList().then(
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

      async createNewTemplate(data){  
        const templateListLength = this.templates.length;
        data.id = templateListLength + 1;    
        const putData = data;

        try {
          await axios.post(`/api/templates/`, putData, {
            headers: {
              "x-access-token": "token-value",
            },
          });

          this.$toast("Template Created Successfully");
        } 
        catch (err) {
          console.log(err)
        }
      },

      openModal(){
        this.createTemplate = true;
      },
    },
    mounted () {
      this.getAllData();
    }
  }
</script>


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
