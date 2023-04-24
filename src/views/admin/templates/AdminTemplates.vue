<template>
  <exai-loader v-if="loading"></exai-loader>
  <div class="page-wrapper" v-else>
    <PageHeader title="Templates">
      <exai-button text="Create Template" variation="primary" @click.native="openCreateModal()"></exai-button>
    </PageHeader>

    <TemplatesList 
      :templates="templates"
      @open-clone-template="openCloneModal($event)">
    </TemplatesList>
      
    <template-create
      v-if="createTemplate"
      :types="templateTypes"
      @close-modal="createTemplate = false"
      @create-new-template="createNewTemplate($event)">
    </template-create>

    <template-clone
      v-if="cloneTemplate"
      :types="templateTypes"
      :data="template"
      @close-modal="cloneTemplate = false"
      @clone-new-template="cloneNewTemplate($event)">
    </template-clone>
  </div>
</template>

<script>
  import PageHeader from '../../../components/layout/PageHeader.vue'
  import TemplatesList from '../../../components/templates/TemplatesList.vue'
  import TemplateCreate from '../../../components/templates/TemplateCreate.vue'
  import TemplateClone from '../../../components/templates/TemplateClone.vue'
  import ExaiLoader from '../../../components/shared/ExaiLoader.vue'
  import ExaiButton from '../../../components/shared/ExaiButton.vue'
  import { getTemplatesList } from '../../../services/TemplatesService'
  

  const axios = require('axios');

  export default {
    name: 'AdminTemplates',
    components: {
      TemplatesList,
      TemplateCreate,
      TemplateClone,
      PageHeader,
      ExaiButton,
      ExaiLoader
    },
    data() {
        return {
            createTemplate:false,
            cloneTemplate:false,
            loading:false,
            templates: [],
            templateTypes: [],
            numberOfTemplates: 0,
            template:'',
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

      async cloneNewTemplate(data){  
        const templateListLength = this.templates.length;
        data.id = templateListLength + 1;    
        const putData = data;
        console.log('cloned data', putData);

        try {
          await axios.post(`/api/templates/`, putData, {
            headers: {
              "x-access-token": "token-value",
            },
          });
          this.addNewItem(putData);
          this.$toast("Template Created Successfully");
        } 
        catch (err) {
          console.log(err)
        }
      },

      openCreateModal(){
        this.createTemplate = true;
      },

      openCloneModal(data){
        this.template = { ...data };
        this.cloneTemplate = true;
      },

      addNewItem(item){
        this.templates.push(item)
      }
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
