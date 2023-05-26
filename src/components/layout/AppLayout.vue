<template>
  <div id="app" class="app-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'app-layout',
  }
</script>

<style lang="scss">
  @import '@/styles/base.scss';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  body,html{
    margin:0px;
    padding:0px;
    height:100%;
    min-height:100%;
    scroll-behavior: smooth; 
  }

  .app-container{
    display: flex;
    min-height: calc(100vh - 50px);
    flex-direction: column;
  }
</style>
