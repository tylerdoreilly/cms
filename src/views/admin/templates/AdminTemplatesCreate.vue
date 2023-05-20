<template>
  <exai-loader v-if="loading === true"></exai-loader>
  <div id="createTemplate" v-else>
    <page-layout sidebar>
      <template v-slot:content>

        <template-header title="Edit Template">
          <exai-button text="Generate" @click.native="generateDoc = true"></exai-button>
          <exai-button text="Save" variation="primary" @click.native="saveTemplate()"></exai-button>
        </template-header>

        <PageDetails 
          :title="template.title" 
          :asof="template.date_asof" 
          @edit-details="editDetails()">
        </PageDetails>

        <template-container>
          <custom-editor-new 
            v-model="content"
            :data="content"
            :customControls="customControls"
            :buttonList="customToolbarButtons"
            :editorId="getTemplateId">
          </custom-editor-new>
        </template-container>

      </template>
      <template v-slot:sidebar-right>
        <template-details title="Details" :data="template" />
      </template>
    </page-layout>

    <exai-prompt 
      v-if="itemToRemove"
      v-show="showPrompt"
      title="Remove Template Item" 
      message="Are you sure you want to remove this item?" 
      :data="itemToRemove"
      @close-modal="showPrompt = false" 
      @close-and-submit="removeItem($event)">
    </exai-prompt>

    <exai-prompt 
      v-if="generateDoc"
      title="Generate Sample Docx" 
      message="This will generate a sample word doc with all dynamic control in place.Note: This is WIP" 
      @close-modal="generateDoc = false" 
      @close-and-submit="createDoc()">
    </exai-prompt>

    <template-details-edit 
      v-if="editTemplateDetails"
      :data="template"
      :types="templateTypes"
      @close-modal="editTemplateDetails = false" 
      @update-template-details="updateTemplateDetails($event)">
    </template-details-edit>

    <template-save-custom-item 
      v-if="showSaveCustomItem"
      :data="customTemplateItem"
      @close-modal="showSaveCustomItem = false" 
      @save-custom-item="saveCustomTemplateitem($event)">
    </template-save-custom-item>
  </div>
</template>

<script>
  import PageLayout from '../../../components/layout/PageLayout.vue';
  import TemplateHeader from '../../../components/layout/TemplateHeader.vue';
  import PageDetails from '../../../components/layout/PageDetails.vue';
  import TemplateContainer from '../../../components/templates/TemplateContainer.vue';
  import TemplateDetails from '../../../components/templates/TemplateDetails.vue';
  import TemplateDetailsEdit from '../../../components/templates/TemplateDetailsEdit.vue';
  import TemplateSaveCustomItem from '../../../components/templates/TemplateSaveCustomItem.vue';

  import { ExaiButton, ExaiPrompt, ExaiLoader } from '@/components/shared/ExaiComponents/index.js'
  import { getAllTemplateData, getImage } from '../../../services/TemplatesService';
  import { transformTemplateData }  from '@/utility/templateGenerator/contentTransform.js';
  import customEditorNew from '@/components/shared/customEditor/customEditorNew.vue';


  import * as docx from "docx";
  import { saveAs } from "file-saver";

  const axios = require('axios');

  export default {
    name: 'AdminTemplatesCreate',

    components: {
      PageLayout,
      TemplateHeader,
      PageDetails,
      TemplateContainer,
      TemplateDetailsEdit,
      TemplateSaveCustomItem,   
      ExaiButton,
      ExaiLoader,
      ExaiPrompt,
      customEditorNew,
      TemplateDetails
    },

    data() {
        return {
          items: [],
          templateItems:[],
          templateTypes:[],
          customControls:[],
          content:[],
          customTemplateItems:[],
          id: this.$route.params.id,
          template: [],
          customTemplateItem:'',
          layouts:[],
          availableTemplateItems: [
            { id: 1, name: "Heading", position: 1, field:'TemplateHeading', content:'place heading here'},
            { id: 2, name: "Text Field", position: 2, field:'TemplateItemTextField', content:'place text here'},
            { id: 3, name: "Text Area", position: 3, field: 'TemplateItemTextBlock', content:'place paragraph here'},
            { id: 4, name: "List", position: 4, field: 'TemplateItemList', content:'place list here'}
          ],
          showPrompt:false,
          showDetails:false,
          dragedElem: null,
          overElem: null,
          preview: false,
          newInstance:false,
          lockedItems:false,
          itemToRemove:'',
          editTemplateDetails:false,
          showSaveCustomItem:false,
          loading:false,
          generateDoc:false,
          pic:'',
          customToolbarButtons:{
            headers:true,
            size:true,
            styling:false,
            alignment:true,
            blockInsert:true,
            lists:true,
            indents:true,
            colors:true,
            inserts:true,
            clean:true
          },
      }
    },

    computed: {
      randomId(){
        let randomId = Math.random() * Math.floor(1000);
        return Math.round(randomId)
      },
      getTemplateId(){
        let id = 'toolbar-2000'
        return id
      },
    },

    methods: {
   
      generateId: function (elem) {
        let randomId = Math.random() * Math.floor(1000);
        elem['id'] = Math.round(randomId);
        return elem
      },

      // Other Methods
      checkBeforeRemove(event){
        const elem = this.items.find(item => item.id == event)
        this.itemToRemove = elem;
        this.showPrompt = true;
      },

      removeItem(event){
        console.log('parent remove',event)
        const index = this.items.indexOf(event);
        if (index > -1) {
          this.items.splice(index, 1);
        }
        this.showPrompt = false;
      },

      getDate(){
        let currentDate = new Date(Date.now()).toISOString();
        console.log(currentDate);
        return currentDate
      },

      toggleDetails(){
        this.showDetails = !this.showDetails;
      },

      editDetails(){
        this.editTemplateDetails = true;
      },

      openCustomItemModal(event) {
        this.showSaveCustomItem = true;
        this.customTemplateItem = event;
        console.log('template to save',event)
      },

      // Get and Save
      async saveTemplate(){
        this.template.data = [];
        let templateData = JSON.stringify(this.content);
          if (this.id) {
            let type = this.template.type_id;
            this.template.date_updated = this.getDate();
            this.template.type_new = type;
            this.template.data = templateData;
            const putData = this.template;

            try {
             await axios.put(`/api/templates/${this.id}`, putData, {
                headers: {
                  "x-access-token": "token-value",
                },
              });

              // const result = res;
              this.$toast("Template Saved Successfully");
            } 
            catch (err) {
             console.log(err)
            }
          }
      },

      async saveCustomTemplateitem(data){
        let clonedData = {...data}
        const customTemplateItemsLength = this.customTemplateItems.length;
        clonedData.id = customTemplateItemsLength + 1; 
        const putData = clonedData; 

        try {
          await axios.post(`/api/templateItemsCustom/`, putData, {
            headers: {
              "x-access-token": "token-value",
            },
          });

          this.$toast("Custom Template Item Created Successfully");

          this.customTemplateItems.push(clonedData);
        } 
        catch (err) {
          console.log(err)
        }
      },

      async updateTemplateDetails(data){
          if (this.id) {
            const putData = data;

            try {
             await axios.put(`/api/templates/${this.id}`, putData, {
                headers: {
                  "x-access-token": "token-value",
                },
              });

              // const result = res;
              this.$toast("Template Saved Successfully");
            } 
            catch (err) {
             console.log(err)
            }
          }
      },

      getAllData(){
        this.loading = true;
        getAllTemplateData(this.id).then(
          axios.spread((
            {data: template}, 
            {data:templateItems}, 
            {data:templateItemsCustom}, 
            {data:templateTypes}, 
            {data:customControls},
            {data:customControlsLibrary}) => {
            console.log({template, templateItems, templateItemsCustom, templateTypes, customControls,customControlsLibrary });
            this.template = template.find(item => item);
            this.templateItems = templateItems;
            this.customTemplateItems = templateItemsCustom;
            this.templateTypes = templateTypes;
            this.customControls = customControls;
            customControlsLibrary.forEach(libraryItem =>{
              this.customControls.push(libraryItem);
            })
            console.log('controls', this.customControls)
            if(this.template.data == null){
              this.setDefaultItem();
            }
            else{
              this.content = this.template.data;
            }
  
          })
        )
        .catch(error => {console.log(error) })
        .finally(() => (this.loading = false))
      },

      // Generate Sample Word Doc
      // Provide the ability to view the word file 
      // with formatting and dynamic controls in place.
      // This is work in progress.
      
      createDoc(){

        let documentData = transformTemplateData(this.template.data)        
        console.log('documentData', documentData);
      
      
        const generateParagraphs = (pg) => pg.map(({ type, children }) => {
            if (type === 'P' || type === 'DIV') {
              let paragraph = new docx.Paragraph({
                children: [...generateTextRun(children), ...generateHyperLink(children)],
                spacing: {
                    after: this.checkForDiv(type),
                },
              });
              return paragraph
            }
            if (type === 'UL') {
              let list = new docx.Paragraph({
                children: [...generateTextRun(children)],
                bullet: {
                    level: 0
                },
                spacing: {
                    after: this.checkForDiv(type),
                },
              });
              return list
            }
          } 
        );

        const generateTextRun = (children) => children.map(({ text, format, styles }) => {
            if (format != "A") {
              let textRun = new docx.TextRun({
                text: text,
                bold: styles.bold,
                size: styles.size,
                color: styles.color,
              });
              return textRun
            }
          }  
        );

        const generateHyperLink = (children) => 
          children.map(({ text, format, styles }) => {
            if (format === "A") {
              let hyperLink =  new docx.ExternalHyperlink({
                  children: [
                      new docx.TextRun({
                          text: text,
                          size: styles.size,
                          style: "Hyperlink",
                      }),
                  ],
                  link: text,
              });
              return hyperLink
            }
          }
        );

        let doc = new docx.Document({
          sections: [{
              properties: {},
              headers: {
                default: new docx.Header({
                    children: [
                      new docx.Paragraph({
                        children: [
                          new docx.ImageRun({
                            data: this.pic,
                            transformation: {
                                width: 100,
                                height: 100,
                            },
                            altText: {
                              title: "DBRS Morningstar",
                              description: "Header Image",
                              name: "DBRS Morningstar",
                            },
                          }),
                        ],
                      }),
                    ],
                }),
              },
              children: [...generateParagraphs(documentData)],
            },
          ],
        });

        // Save/download Document
        this.saveDocumentToFile(doc, `vuedoc.docx`);
        this.generateDoc = false;
      },

      saveDocumentToFile: function (doc, fileName) {
        const mimeType = 'application/vnd.openxmlformats officedocument.wordprocessingml.document';
        docx.Packer.toBlob(doc).then((blob) => {
          const docblob = blob.slice(0, blob.size, mimeType);
          saveAs(docblob, fileName);
        });
      },

      checkForDiv(type){
        if (type === "DIV") {
          return 400;
        }
      },

      getImageHeader(){
        getImage().then(response => {
          this.pic = response;
        })
      },
    },

    mounted () {
      this.getAllData();
      this.getImageHeader();
    },

  }
</script>

<style lang="scss">
 #createTemplate .exai-tabs__list{
  margin-left:-40px;
  margin-right:-40px;
  padding-left:40px;
 }
 

</style>
