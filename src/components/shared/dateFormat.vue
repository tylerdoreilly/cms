<template>
    <span>{{ date | formatDate(dateFormat) }}</span>
</template>

<script>
  import moment from 'moment';

    export default {
      name: 'date-format',
      props: {
        date: {
          type: String,  
          docs:{
            validation: '**Required**',
            description:'date passed for formatting'
          }       
        },
        dateFormat: {
          type: String,
          docs:{
            validation: '**Required**',
            description:'type of date format from moment'
          }       
        }
      },
     filters:{
      formatDate(value, format){
        if(value == null || value == "null"){
          return "N/A"
        }
        if(value){
          return moment(String(value)).format(format)
        }
      }
     }
    }
  </script>