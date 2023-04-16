<template>
  <div class="template-details">
    <div class="template-details__content">
      <h1 class="template-title">{{title}} (<date-format :date="asof" dateFormat="MM/DD/YYYY"></date-format>)</h1>
      <div class="template-details-info">
        <div><span class="detail-label">Type: </span>{{ type }}</div>
        <div><span class="detail-label">Created: </span><date-format :date="date" dateFormat="MM/DD/YYYY"></date-format></div>
        <div><span class="detail-label">Updated: </span><date-format :date="updated" dateFormat="MM/DD/YYYY"></date-format></div>
      </div>
     
    </div>
    <div class="template-details__controls">
      <slot></slot>
    </div>    
  </div>
</template>

<script>
  import dateFormat from '../shared/dateFormat.vue'
  export default {
    name: 'PageDetails',
    components: {
      dateFormat
    },
    props:{
      title:{
        type: String,
        docs:{
          validation:'_',
          description:'Template Title'
        }
      },
      type:{
        type: String,
        docs:{
          validation:'_',
          description:'Template Type'
        }
      },
      date:{
        type: String,
        docs:{
          validation:'_',
          description:'Template date created'
        }
      },
      asof:{
        type: String,
        docs:{
          validation:'_',
          description:'Template as of date'
        }
      },
      updated:{
        type: String,
        docs:{
          validation:'_',
          description:'Template updated date'
        }
      }
    },
  }
</script>

<style lang="scss">
  .template-details {
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:10px;
    padding-bottom:15px;
    border-bottom:1px solid $border;
    margin-bottom:20px;
  }

  .template-details__controls{
    margin-left: auto;
    display:flex;
    flex-direction: row;
    gap:10px;
  }

  .template-title{
    font-size:18px;
    margin-bottom:5px;
  }

  .template-details-info{
    display:flex;
    flex-direction: row;
    gap:10px;
  }

  .detail-label{
    color:lighten( $gunmetal, 20% );
  }
</style>
