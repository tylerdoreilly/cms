<template>
  <div>
    <page-layout>
      <template v-slot:content>
        <PageHeader title="Dashboard">
        </PageHeader>
        <p>WIP</p>
      </template>
    </page-layout>
  </div>
</template>

<script>
  import PageHeader from '../../components/layout/PageHeader.vue';
  import PageLayout from '../../components/layout/PageLayout.vue';

  export default {
    name: 'AdminDashboard',
    components: {
      PageHeader,
      PageLayout
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
