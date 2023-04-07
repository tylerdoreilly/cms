<template>
  <div class="page-wrapper">
    <PageHeader title="Templates">
      <IeraButton text="Create Template" @click.native="openModal()"></IeraButton>
    </PageHeader>
    <TemplatesList v-if="templates.length > 0" :templates="templates" />
    <AppModal v-show="showModal" @close-modal="showModal = false" />
    <ExaiTextField label="Text Input" placeholder="This is a text field" v-model="searchText"></ExaiTextField>
    <ExaiTextArea label="Text Area" placeholder="This is a text area" v-model="searchText"></ExaiTextArea>
  </div>
</template>

<script>
import PageHeader from '../../components/layout/PageHeader.vue'
import TemplatesList from '../../components/TemplatesList.vue'
import IeraButton from '../../components/IeraButton.vue'
import AppModal from '../../components/modal.vue'
import { getAllTemplates } from '../../services/TemplatesService'
import ExaiTextField from '../../components/forms/ExaiTextField.vue'
import ExaiTextArea from '../../components/forms/ExaiTextArea.vue'

export default {
  name: 'AdminTemplates',
  components: {
    TemplatesList,
    AppModal,IeraButton,PageHeader,ExaiTextField,ExaiTextArea
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
    // userCreate(data) {
    //   console.log('data:::', data)
    //   createUser(data).then(response => {
    //     console.log(response);
    //     this.getAllUsers();
    //   });
    // }
  },
  mounted () {
    this.getAllTemplates();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
