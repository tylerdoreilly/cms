<template>
  <exai-loader v-if="loading"></exai-loader>
  <div v-else>
    <page-layout center>
      <template v-slot:content>
        <PageHeader title="Custom Controls" hasBorder>
          <template #description>
            Create reusable custom content that can be added to any template.
          </template>
          <exai-button text="Create Control" variation="primary" @click.native="$router.push('/admin/project/' + id + '/custom-controls/create/')"></exai-button>
        </PageHeader>

        <template-custom-controls-list 
          :customControls="customControls"
          @open-delete-template="openDeletePrompt($event)">
        </template-custom-controls-list>
      </template>
    </page-layout>

    <exai-prompt 
      v-if="showDeleteControl"
      title="Delete Custom Control" 
      message="Are you sure you want to delete this Control?" 
      :data="controlToDelete"
      @close-modal="showDeleteControl = false" 
      @close-and-submit="deleteSelectedControl($event)">
    </exai-prompt>
  </div>
</template>

<script>

  //Components
  import { PageLayout, PageHeader } from '@/components/layout/index.js';
  import { ExaiButton, ExaiLoader, ExaiPrompt } from '@/components/shared/ExaiComponents/index.js';
  import { TemplateCustomControlsList } from '@/components/templates/index.js';

  // Services
  import { getCustomControlsLibrary, deleteCustomControlLibaryItem } from '@/services/TemplatesService';

  const axios = require('axios');

  export default {
    name: 'AdminTemplateControls',
    components: {
      TemplateCustomControlsList,
      PageHeader,
      PageLayout,
      ExaiButton,
      ExaiLoader,
      ExaiPrompt,
    },
    data() {
        return {        
            loading:false,
            customControls:[],
            action:'',
            controlData:'',
            controlToDelete:'',
            showDeleteControl:false,
            id: this.$route.params.id,
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

      async deleteSelectedControl(data) {
        console.log('delete control',data)
        this.loading = true;
        
        deleteCustomControlLibaryItem(data.id).then(res =>{
          console.log('deleted', res);
          let deletedItem = this.customControls.find(item => item.id === data.id);
          this.customControls.pop(deletedItem);
          this.showDeleteControl = false
        }
        
        )
        .catch(error => {console.log(error) })
        .finally(() => (this.loading = false))
      },

      openCloneModal(data){
        this.cloneControl = true;
        this.controlData = { ...data };
        this.action = 'clone';
      },

      openDeletePrompt(data){
        this.controlToDelete = data;
        this.showDeleteControl = true;
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
