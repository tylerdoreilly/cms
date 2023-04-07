<template>
  <div class="inner-cols">
    <div class="HolyGrail-content">
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1><h1>Pages</h1>

    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <h1>Pages</h1>
    <!-- <UsersList v-if="users.length > 0" :users="users" /> -->
  </div>
  <div class="HolyGrail-Inner-side">test</div>
  </div>
 
</template>

<script>
// import UsersList from '../../components/UsersList.vue'
import { getAllUsers, createUser } from '../../services/UserService'

export default {
  name: 'AdminPages',
  components: {
    // UsersList
  },
  props: {
    msg: String
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0
      }
  },
  methods: {
    getAllUsers() {
      getAllUsers().then(response => {
        console.log(response)
        this.users = response
        this.numberOfUsers = this.users.length
      })
    },
    userCreate(data) {
      console.log('data:::', data)
      createUser(data).then(response => {
        console.log(response);
        this.getAllUsers();
      });
    }
  },
  mounted () {
    this.getAllUsers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.inner-cols{
  display: flex;
  flex: 1;
}
  .HolyGrail-content {
    flex: 1;
  }

.HolyGrail-Inner-side {
    /* 12em is the width of the columns */
    flex: 0 0 12em;
    background:red;
  }
</style>
