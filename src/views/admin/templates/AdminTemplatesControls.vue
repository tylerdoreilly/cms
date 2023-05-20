<template>
  <exai-loader v-if="loading"></exai-loader>
  <div v-else>
    <page-layout>
      <template v-slot:content>
        <PageHeader title="Custom Controls">
          <exai-button text="Create Control" variation="primary" @click.native="$router.push('/admin/custom-controls/create')"></exai-button>
        </PageHeader>

        <template-custom-controls-list :customControls="customControls"></template-custom-controls-list>
      </template>
    </page-layout>
         
    <template-custom-controls-form
        v-if="createControl"
        title="Create Custom Control"
        :action="action"
        @close-modal="createControl = false"
        @create-new-template="createNewTemplate($event)">
    </template-custom-controls-form>

    <template-custom-controls-form
        v-if="cloneControl"
        title="Clone Custom Control"
        :action="action"
        :data="controlData"
        @close-modal="cloneControl = false"
        @create-new-template="createNewTemplate($event)">
    </template-custom-controls-form>

    <exai-prompt 
      v-if="showdeleteTemplate"
      title="Delete Template" 
      message="Are you sure you want to delete this Template?" 
      :data="template"
      @close-modal="showdeleteTemplate = false" 
      @close-and-submit="deleteSelectedTemplate($event)">
    </exai-prompt>
  </div>
</template>

<script>

  //Components
  import { PageLayout, PageHeader } from '@/components/layout/index.js';
  import { ExaiButton, ExaiLoader, ExaiPrompt } from '@/components/shared/ExaiComponents/index.js';
  import { TemplateCustomControlsList } from '@/components/templates/index.js';
  import TemplateCustomControlsForm from '@/components/templates/TemplateCustomControlsForm.vue';

  // Services
  import { getCustomControlsLibrary, deleteTemplate } from '../../../services/TemplatesService';

  const axios = require('axios');

  export default {
    name: 'AdminTemplateControls',
    components: {
      TemplateCustomControlsList,
      TemplateCustomControlsForm,
      PageHeader,
      PageLayout,
      ExaiButton,
      ExaiLoader,
      ExaiPrompt,
    },
    data() {
        return {
            showdeleteTemplate:false,
            loading:false,
            customControls:[],
            action:'',
            controlData:'',
            createControl:false,
            cloneControl:false,
        }
    },
    methods: {
      async getAllData() {
        this.loading = true;
        getCustomControlsLibrary().then(response => {
          console.log(response)
          this.customControls = response;
        })
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

      async deleteSelectedTemplate(data) {
        console.log('delete template',data)
        this.loading = true;
        deleteTemplate(data.id).then(
         console.log('deleted')
        )
        .catch(error => {console.log(error) })
        .finally(() => (this.loading = false))
      },

      openCreateModal(){
        this.createControl = true;
        this.control = '';
        this.action = 'create';
      },

      openCloneModal(data){
        this.cloneControl = true;
        this.controlData = { ...data };
        this.action = 'clone';
      },

      openDeletePrompt(data){
        this.template = data;
        this.showdeleteTemplate = true;
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
