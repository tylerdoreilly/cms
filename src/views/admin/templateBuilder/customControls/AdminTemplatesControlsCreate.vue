<template>
  <exai-loader v-if="loading"></exai-loader>
  <div v-else>
    <page-layout center>
      <template v-slot:content>
        <PageHeader title="Create Custom Control">
        </PageHeader>

        <template-custom-controls-form
          v-if="customControls"
          title="Create Custom Control"
          :data="controlData"
          :customControls="customControls"
          :action="action"
          @create-new-control="createNewControl($event)">
        </template-custom-controls-form>
      
      </template>
    </page-layout>
         
  </div>
</template>

<script>

  //Components
  import { PageLayout, PageHeader } from '@/components/layout/index.js';
  import { ExaiLoader } from '@/components/shared/ExaiComponents/index.js';
  import TemplateCustomControlsForm from '@/components/templates/TemplateCustomControlsForm.vue';

  // Services
  import { getAllControls } from '@/services/TemplatesService';

  const axios = require('axios');

  export default {
    name: 'AdminTemplateControls',
    components: {
      TemplateCustomControlsForm,
      PageHeader,
      PageLayout,
      ExaiLoader,
    },
    data() {
        return {
            loading:false,
            customControls:[],
            action:'create',
            controlData:{ 
                name:'',
                description:'',
                control:'text-snippet',
                field:'',
                icon:'fa-pencil',
                published:'',
                date_asof:'',
                content:'',
            },
        }
    },
    methods: {
      async getAllData(){
          this.loading = true;
          getAllControls().then(
          axios.spread((
              {data:customControls},
              {data:customControlsLibrary}) => {
              console.log({customControls, customControlsLibrary });
              
              this.customControls = customControls;
              customControlsLibrary.forEach(libraryItem =>{
              this.customControls.push(libraryItem);
              });

              console.log('controls', this.customControls)
          })
          )
          .catch(error => {console.log(error) })
          .finally(() => (this.loading = false))
      },

      async createNewControl(data){     
        const putData = data;

        try {
          await axios.post(`/api/customControlsLibrary`, putData, {
            headers: {
              "x-access-token": "token-value",
            },
          });

          this.$toast("Control Created Successfully");
          this.$router.push({ name: 'controls' });
        } 
        catch (err) {
          console.log(err)
        }
      },

    },

    mounted () {
      this.getAllData();
    }
  }
</script>

