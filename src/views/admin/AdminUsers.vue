<template>
  <exai-loader v-if="loading"></exai-loader>
  <div v-else>
    <page-layout>
      <template v-slot:content>
        <PageHeader title="Users">
        </PageHeader>
        <UsersList v-if="users.length > 0" :users="users" />
          <popover name="example">
            <div slot="content">
              <ul>
                <li><a href="#">npmjs.com</a></li>
                <li><a href="#">github.com</a></li>
              </ul>
            </div>
          </popover>
      </template>
    </page-layout>
  </div>
</template>

<script>
  import popover from 'vue-popover'
  import UsersList from '../../components/UsersList.vue'
  import PageHeader from '../../components/layout/PageHeader.vue';
  import PageLayout from '../../components/layout/PageLayout.vue';
  import ExaiLoader from '../../components/shared/ExaiComponents/ExaiLoader.vue';
  import { getAllUsers, createUser } from '../../services/UserService';

  export default {
    name: 'AdminUsers',
    components: {
      UsersList,
      PageHeader,
      PageLayout,
      ExaiLoader,
      popover
    },
    data() {
        return {
            users: [],
            numberOfUsers: 0,
            loading:false,
        }
    },
    methods: {
      getAllUsers() {
        this.loading = true;
        getAllUsers().then(response => {
          console.log(response)
          this.users = response
          this.numberOfUsers = this.users.length
        })
        .catch(error => {console.log(error) })
        .finally(() => (this.loading = false))
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
.popover__container{
  background:red;
  min-width:200px;
  width:200px;
  z-index:100;
}
</style>
