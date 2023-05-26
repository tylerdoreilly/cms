<template>
  <exai-loader v-if="loading"></exai-loader>
  <div v-else>

    <page-layout center>
      <template v-slot:content>
        <PageHeader title="Templates">
          <exai-button text="Create Template" variation="primary" @click.native="openCreateModal()"></exai-button>
        </PageHeader>

        <exai-tabs>
            <exai-tab title="Manage Templates">
              <TemplatesList 
                :templates="templates"
                @open-clone-template="openCloneModal($event)"
                @open-delete-template="openDeletePrompt($event)">
              </TemplatesList>
            </exai-tab>
            <exai-tab title="Global Settings">
              <template-custom-controls-list 
                :customControls="customControls">
              </template-custom-controls-list>
            </exai-tab>
        </exai-tabs>
      
      </template>
    </page-layout>

   
         
    <template-form
      v-if="createTemplate"
      title="Create Template"
      :types="templateTypes"
      :action="action"
      @close-modal="createTemplate = false"
      @create-new-template="createNewTemplate($event)">
    </template-form>

    <template-form
      v-if="cloneTemplate && template"
      title="Clone Template"
      :types="templateTypes"
      :action="action"
      :data="template"
      @close-modal="cloneTemplate = false"
      @clone-new-template="cloneNewTemplate($event)">
    </template-form>

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
  import { TemplatesList, TemplateForm, TemplateCustomControlsList } from '@/components/templates/index.js';

  // Services
  import { getTemplatesList, deleteTemplate } from '../../../services/TemplatesService';

  const axios = require('axios');

  export default {
    name: 'AdminTemplates',
    components: {
      TemplatesList,
      TemplateCustomControlsList,
      TemplateForm,
      PageHeader,
      PageLayout,
    },
    data() {
        return {
            createTemplate:false,
            cloneTemplate:false,
            showdeleteTemplate:false,
            loading:false,
            templates: [],
            customControls:[],
            templateTypes: [],
            numberOfTemplates: 0,
            template:'',
            action:'',
            id: this.$route.params.id,
        }
    },
    methods: {
      async getAllData() {
        this.loading = true;
        getTemplatesList(this.id).then(
          axios.spread(({data: templates}, {data:templateTypes}, {data:customContols}) => {
            console.log({templates, templateTypes, customContols});
            this.templates = templates;
            this.numberOfTemplates = this.templates.length;
            this.templateTypes = templateTypes;
            this.customControls = customContols;
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
        this.createTemplate = true;
        this.template = '';
        this.action = 'create';
      },

      openCloneModal(data){
        this.cloneTemplate = true;
        this.template = { ...data };
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


<style lang="scss">
  // .layout-center{
  //   display:flex;
  //   justify-content: center;
  //   margin:0 auto;
  //   width:1200px;
  // }
</style>
