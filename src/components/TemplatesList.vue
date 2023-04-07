<template>
    <div class="container">
        <table class="table">
            <thead class="table-header">
            <tr>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Id</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Type</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Title</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Action</span></div></th>
            </tr>
            </thead>
            <tbody class="table-tbody">
              <tr v-for="item in templates" :key="item.id" class="table-tr">
                  <td class="table-td">{{ item.id }}</td>
                  <td class="table-td">{{ item.type }}</td>
                  <td class="table-td">{{ item.title }}</td>
                  <td class="table-td"><router-link class="table__link" :to="'/admin/templates/edit-template/' + item.id">Edit</router-link></td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'TemplatesList',
        props: ['templates']
    }
</script>

<style lang="scss">
    @import '../styles/table.scss';
</style>