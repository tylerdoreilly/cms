<template>
  <div class="template-details">
    <div class="template-details__title">{{title}}</div>
    <div class="template-details__content">
      <exai-dl>
        <exai-dl-group>
          <exai-dt>Title:</exai-dt>
          <exai-dd>{{ data.title }}</exai-dd>
        </exai-dl-group>
        <exai-dl-group>
          <exai-dt>Type:</exai-dt>
          <exai-dd>{{ data.templateType?.type }}</exai-dd>
        </exai-dl-group>
        <exai-dl-group>
          <exai-dt>As Of:</exai-dt>
          <exai-dd>
            <date-format :date="data.date_asof" dateFormat="MM/DD/YYYY"></date-format>
          </exai-dd>
        </exai-dl-group>
        <exai-dl-group>
          <exai-dt>Created:</exai-dt>
          <exai-dd>
            <date-format :date="data.createdAt" dateFormat="MM/DD/YYYY"></date-format>
          </exai-dd>
        </exai-dl-group>
        <exai-dl-group>
          <exai-dt>Updated:</exai-dt>
        <exai-dd>
          <date-format :date="data.updatedAt" dateFormat="MM/DD/YYYY"></date-format>
        </exai-dd>
        </exai-dl-group>
      </exai-dl>
    </div>
    <div class="template-details__controls">
      <exai-button text="Edit Details" @click.native="editTemplateDetails"></exai-button>
    </div>    
  </div>
</template>

<script>
  import dateFormat from '../shared/dateFormat.vue';

  export default {
    name: 'template-details',
    components: {
      dateFormat,
    },
    props:{
      title:{
        type: String,
        docs:{
          validation:'_',
          description:'Widget Title'
        }
      },
      data:{
        type:[Array, Object]
      }
    }, 
    data() {
      return{
        templateData: this.data,
      }
    },
    methods:{
      editTemplateDetails(){
        this.$emit('edit-details');
      },

    }
  }
</script>

<style lang="scss">
  .template-details {
    display:flex;
    flex-direction:column;
    gap:15px;
    position:sticky;
    top:95px;
    margin-top:20px;
  }

  .template-details__controls{

    display:flex;
    flex-direction: row;
    gap:10px;
  }

  .template-details__title{
    @include flex(flex, row, $gap: 10px);
    align-items: center;
    font-size:17px;
    font-weight:bold;
    margin:0px;
  }

  .template-details-info{
    display:flex;
    flex-direction: column;
    gap:10px;
  }

  .detail-label{
    color:lighten( $gunmetal, 20% );
  }
</style>
