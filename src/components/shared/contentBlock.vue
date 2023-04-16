<template>
  <div :class="[$style['content-block']]">
    <div :class="[$style['content-block__header']]" @click="toggleContent = !toggleContent">
      <font-awesome-icon icon="fa-solid fa-chevron-down" v-if="toggleContent" />
      <font-awesome-icon icon="fa-solid fa-chevron-right" v-if="!toggleContent"/>
        {{title}}
    </div>
    <div v-show="toggleContent" :class="[$style['content-block__content']]">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {    
    name: 'content-block',
    props: {
      title:{
        type:String,
      },
    },
    data() {
        return {
          toggleContent:true,
        }
    },
  }
</script>

<style lang="scss" module>
  .content-block{
    @include flex(flex, column, $gap: 15px);
    background:$white-smoke;
    padding:15px;
    overflow-y:auto;
  }
  .content-block__header{
    @include flex(flex, row, $gap: 10px);
    align-items:center;
    cursor:pointer;
  }
  .content-block__content{
    @include flex(flex, column, $gap: 15px);
  }

</style>
