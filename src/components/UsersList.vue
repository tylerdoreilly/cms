<template>
    <div class="container">
        <table class="table">
            <thead class="table-header">
            <tr>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">User Id</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">username</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Firstname</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Lastname</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Email</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Role</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Actions</span></div></th>
            </tr>
            </thead>
            <tbody class="table-tbody">
              <tr v-for="item in users" :key="item.id" class="table-tr">
                  <td class="table-td">{{ item.id }}</td>
                  <td class="table-td">{{ item.username }}</td>
                  <td class="table-td">{{ item.first_name }}</td>
                  <td class="table-td">{{ item.last_name }}</td>
                  <td class="table-td">{{ item.email }}</td>
                  <td class="table-td">{{ item.role }}</td>
                  <td class="table-td">
                    <div class="table-actions">
                       TBD
                    </div> 
                </td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'UsersList',
        props: ['users']
    }
</script>

<style lang="scss">
    @import '../styles/table.scss';
</style>