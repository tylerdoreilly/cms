<template>
  <exai-loader v-if="loading"></exai-loader>
  <div v-else>
    <page-layout center>
      <template v-slot:content>
        <PageHeader title="Edit Custom Control">
        </PageHeader>

       <template-custom-controls-form
          v-if="controlData"
          title="Create Custom Control"
          :data="controlData"
          :action="action"
          :customControls="customControls"
          @update-new-control="updateCustomControl($event)">
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
  import {getAllControls } from '@/services/TemplatesService';

  const axios = require('axios');

  export default {
    name: 'AdminTemplateControlsEdit',
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
            action:'edit',
            controlData:{}, 
            id: this.$route.params.controlId,
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
                this.controlData = customControlsLibrary.find(item => item.id == this.id)
                console.log('controls', this.controlData)
                console.log('controls', this.customControls)
            })
          )
          .catch(error => {console.log(error) })
          .finally(() => (this.loading = false))
      },

      async updateCustomControl(data){
          if (this.id) {
            const putData = data;
            console.log('test',putData)

            try {
             await axios.put(`/api/customControlsLibrary/${this.id}`, putData, {
                headers: {
                  "x-access-token": "token-value",
                },
              });

              // const result = res;
              this.$toast("Control Saved Successfully");
              this.$router.push({ name: 'controls'});
            } 
            catch (err) {
             console.log(err)
            }
          }
      },

    },

    mounted () {
      this.getAllData();
      console.log('route',this.id)
    }
  }
</script>


<style scoped>

</style>
