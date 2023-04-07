<template>
  <header class="app-header">
    <font-awesome-icon icon="fa-solid fa-user-secret" />
    <div class="branding">{{ title }}</div>
  </header>
</template>

<script>

export default {
  name: 'AppHeader',
  components: {
  },
  props: {
    title: String
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0
      }
  },
 
}
</script>

<style lang="scss">
  .app-header {
    height:60px;
    display:flex;
    flex-direction:row;
    align-items:center;
    padding:0px 20px;
    background:$keppel;
    gap:10px;
    position: sticky;
    top: 0;
  }
  .branding{
    font-size:20px;
    font-weight:bold;
  }
</style>
