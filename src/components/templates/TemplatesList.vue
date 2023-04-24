<template>
    <div class="container">
        <table class="table">
            <thead class="table-header">
            <tr>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Id</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Type</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Title</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">As of Date</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Created</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Updated</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Action</span></div></th>
            </tr>
            </thead>
            <tbody class="table-tbody">
              <tr v-for="item in templates" :key="item.id" class="table-tr">
                  <td class="table-td">{{ item.id }}</td>
                  <td class="table-td">{{ item.type }}</td>
                  <td class="table-td">{{ item.title }}</td>
                  <td class="table-td"><date-format :date="item.date_asof" dateFormat="MM/DD/YYYY"></date-format></td>
                  <td class="table-td"><date-format :date="item.date_created" dateFormat="MM/DD/YYYY"></date-format></td>
                  <td class="table-td"><date-format :date="item.date_updated" dateFormat="MM/DD/YYYY"></date-format></td>
                  <td class="table-td">
                    <div class="table-actions">
                        <router-link class="table__link" :to="'/admin/templates/edit-template/' + item.id">Edit</router-link>
                        <a @click.prevent="openCloneTemplate(item)">Clone</a>
                        <a @click.prevent="openDeleteTemplate(item)">Delete</a>
                    </div>
                   
                </td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import dateFormat from '../shared/dateFormat.vue'

    export default {
        name: 'TemplatesList',
        components:{
            dateFormat
        },
        props: ['templates'],
        methods:{
            openCloneTemplate(template){
                console.log('pass template',template)
                this.$emit('open-clone-template', template);
            },
            openDeleteTemplate(template){
                console.log('pass template',template)
                this.$emit('open-delete-template', template);
            }
        },
    }
</script>

<style lang="scss">
    @import '../../styles/table.scss';
</style>