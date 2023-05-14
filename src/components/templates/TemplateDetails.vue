<template>
  <div class="template-details">
    <div class="template-details__title">{{title}}</div>
    <div class="template-details__content">
      <exai-dl>
        <exai-dl-group>
          <exai-dt>Type:</exai-dt>
          <exai-dd>{{ data.type }}</exai-dd>
        </exai-dl-group>
        <exai-dl-group>
          <exai-dt>Created:</exai-dt>
          <exai-dd>
            <date-format :date="data.date_created" dateFormat="MM/DD/YYYY"></date-format>
          </exai-dd>
        </exai-dl-group>
        <exai-dl-group>
          <exai-dt>Updated:</exai-dt>
        <exai-dd>
          <date-format :date="data.date_updated" dateFormat="MM/DD/YYYY"></date-format>
        </exai-dd>
        </exai-dl-group>
      </exai-dl>
    </div>
    <div class="template-details__controls">
      <slot></slot>
    </div>    
  </div>
</template>

<script>
  import dateFormat from '../shared/dateFormat.vue';
  import { 
    ExaiDescriptionList, 
    ExaiDescriptionListGroup,
    ExaiDescriptionTerm, 
    ExaiDescriptionDetails 
  } from '@/components/shared/ExaiComponents/ExaiDescriptionList/index.js';

  export default {
    name: 'template-details',
    components: {
      dateFormat,
      'exai-dl': ExaiDescriptionList,
      'exai-dl-group': ExaiDescriptionListGroup,
      'exai-dt': ExaiDescriptionTerm,
      'exai-dd': ExaiDescriptionDetails,    
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
    methods:{
      editTemplateDetails(){
        this.$emit('edit-details');
      }
    }
  }
</script>

<style lang="scss">
  .template-details {
    display:flex;
    flex-direction:column;
    gap:15px;
    position:sticky;
    top:75px;
  }

  .template-details__controls{
    margin-left: auto;
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
