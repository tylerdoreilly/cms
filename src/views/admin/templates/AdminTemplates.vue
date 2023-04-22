<template>
  <div class="page-wrapper">
    <PageHeader title="Templates">
      <exai-button text="Create Template" variation="primary" @click.native="openModal()"></exai-button>
    </PageHeader>
    <TemplatesList v-if="templates.length > 0" :templates="templates" />
    <AppModal v-show="showModal" @close-modal="showModal = false" />
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
  import AppModal from '../../../components/modal.vue'
  import ExaiButton from '../../../components/shared/ExaiButton.vue'
  import { getAllTemplates, getTemplateTypes } from '../../../services/TemplatesService'
  import TemplateCreate from '../../../components/templates/TemplateCreate.vue'

  const axios = require('axios');

  export default {
    name: 'AdminTemplates',
    components: {
      TemplateCreate,
      TemplatesList,
      AppModal,PageHeader,ExaiButton
    },
    data() {
        return {
            showModal: false,
            createTemplate:false,
            templates: [],
            templateTypes: [],
            numberOfTemplates: 0
        }
    },
    methods: {
      getAllTemplates() {
        getAllTemplates().then(response => {
          console.log(response)
          this.templates = response
          this.numberOfTemplates = this.templates.length
        })
      },

      openModal(){
        this.createTemplate = true;
      },

      getTemplateTypes(){
        getTemplateTypes().then(response => {
          console.log(response)
          this.templateTypes = response;
          console.log('template types', this.templateTypes)
        })
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

    },
    mounted () {
      this.getAllTemplates();
      this.getTemplateTypes();
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
