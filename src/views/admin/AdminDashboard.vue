<template>
  <div class="page-wrapper">
    <h1>Dashboard</h1>
    <UsersList v-if="users.length > 0" :users="users" />
  </div>
</template>

<script>
import UsersList from '../../components/UsersList.vue'
import { getAllUsers, createUser } from '../../services/UserService'

export default {
  name: 'AdminDashboard',
  components: {
    UsersList
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
