<template>
  <exai-loader v-if="loading"></exai-loader>
  <div v-else>

    <page-layout center>
      <template v-slot:content>
        <PageHeader title="Template Types">
          <exai-button text="Create Type" variation="primary" @click.native="openCreateModal()"></exai-button>
        </PageHeader>

        <exai-tabs>
            <exai-tab title="Manage Types">
              <TemplatesTypesList 
                :types="templateTypes"
                @open-clone-template="openCloneModal($event)"
                @open-delete-template="openDeletePrompt($event)">
              </TemplatesTypesList>
            </exai-tab>
            <exai-tab title="Global Settings">
              <!-- <template-custom-controls-list 
                :customControls="customControls">
              </template-custom-controls-list> -->
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
  import { TemplatesTypesList, TemplateForm } from '@/components/templates/index.js';

  // Services
  import { getTemplateTypes } from '@/services/TemplatesService';

  const axios = require('axios');

  export default {
    name: 'AdminTemplatesTypes',
    components: {
      TemplatesTypesList,
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
            templateTypes: [],
            template:'',
            action:'',
            id: this.$route.params.id,
        }
    },
    
    methods: {
      async getAllData() {

        this.loading = true;

        getTemplateTypes().then(response => {
          console.log(response)
          this.templateTypes = response
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

      // async deleteSelectedTemplate(data) {
      //   console.log('delete template',data)
      //   this.loading = true;
      //   deleteTemplate(data.id).then(
      //    console.log('deleted')
      //   )
      //   .catch(error => {console.log(error) })
      //   .finally(() => (this.loading = false))
      // },

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
</style>
