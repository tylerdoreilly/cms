<template>
  <div class="exai-tag">
  {{ label }}: {{ item }}
  </div>
</template>

<script>

export default {
  
  name: 'exai-tag',
  components: {

  },
  props: {
    item: [Number, String],
    label:String,
  },
  data() {
      return {
        content: this.data,
      }
  },
}
</script>

<style lang="scss">
 .exai-tag{
   display:inline-flex;
   flex-direction: row;
   align-items:center;
   font-size:12px;
   gap:5px;
   border:1px solid $border;
   background:$base-white;
   padding:4px 8px;
 }
 .json-viewer pre{
  width:500px;
 }
</style>
