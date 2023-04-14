<template>
  <div class="page-wrapper">
    <PageHeader title="Templates">
      <exai-button text="Create Template" variation="primary" @click.native="openModal()"></exai-button>
    </PageHeader>
    <TemplatesList v-if="templates.length > 0" :templates="templates" />
    <AppModal v-show="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script>
  import PageHeader from '../../../components/layout/PageHeader.vue'
  import TemplatesList from '../../../components/templates/TemplatesList.vue'
  import AppModal from '../../../components/modal.vue'
  import ExaiButton from '../../../components/shared/ExaiButton.vue'
  import { getAllTemplates } from '../../../services/TemplatesService'


  export default {
    name: 'AdminTemplates',
    components: {
      TemplatesList,
      AppModal,PageHeader,ExaiButton
    },
    props: {
      msg: String
    },
    data() {
        return {
            showModal: false,
            templates: [],
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
        this.showModal = true;
      }
    },
    mounted () {
      this.getAllTemplates();
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
