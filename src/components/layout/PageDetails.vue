<template>
  <div class="template-header">
    <div class="template-header__content">
      <h1 class="template-header__title">
        <span>{{title}} (<date-format :date="asof" dateFormat="MM/DD/YYYY"></date-format>)</span>
        <exai-button icon="fa-pencil" @click.native="editTemplateDetails"></exai-button>
      </h1>     
    </div>
    <div class="template-details__controls">
      <slot></slot>
    </div>    
  </div>
</template>

<script>
  import dateFormat from '../shared/dateFormat.vue';
  import ExaiButton from '../shared/ExaiComponents/ExaiButton.vue'

  export default {
    name: 'PageDetails',
    components: {
      dateFormat,
      ExaiButton
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
    methods:{
      editTemplateDetails(){
        this.$emit('edit-details');
      }
    }
  }
</script>

<style lang="scss">
  .template-header {
    display:flex;
    flex-direction:row;
    align-items:flex-end;
    gap:10px;
    padding-bottom:0px;
  }

  .template-header__controls{
    margin-left: auto;
    display:flex;
    flex-direction: row;
    gap:10px;
  }

  .template-header__title{
    @include flex(flex, row, $gap: 10px);
    align-items: center;
    font-size:20px;
    margin-bottom:0px;
  }
</style>
