<template>
  <!-- <div :class="[$style['document-preview']]">
    <div v-for="(item) in content" :key="item.id">
      <div v-html="item.content"></div>
    </div>
  </div> -->
  <div :class="[$style['document-preview']]">
    <div v-html="content"></div>
  </div>
</template>

<script>

  export default {    
    name: 'document-preview',
    components: {

    },
    props: {
      data:[Object, Array, String],
    },
    data() {
        return {
          content: this.data,
        }
    },
    mounted(){

    }
  }
</script>

<style lang="scss" module>
  .document-preview{
    padding:20px 40px 40px 40px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
</style>
