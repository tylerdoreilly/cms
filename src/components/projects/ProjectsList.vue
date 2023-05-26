<template>
    <div class="container">
        <table class="table">
            <thead class="table-header">
            <tr>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Id</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Title</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Description</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Created</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Updated</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Action</span></div></th>
            </tr>
            </thead>
            <tbody class="table-tbody">
              <tr v-for="item in data" :key="item.id" class="table-tr">
                  <td class="table-td">{{ item.id }}</td>
                  <td class="table-td">{{ item.title }}</td>
                  <td class="table-td">{{ item.description }}</td>
                  <td class="table-td"><date-format :date="item.createdAt" dateFormat="MM/DD/YYYY"></date-format></td>
                  <td class="table-td"><date-format :date="item.updatedAt" dateFormat="MM/DD/YYYY"></date-format></td>
                  <td class="table-td">
                    <div class="table-actions">
                        <router-link class="table__link" :to="'/admin/project/' + item.id">Edit</router-link>
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
    import dateFormat from '@/components/shared/dateFormat.vue'

    export default {
        name: 'ProjectsList',
        components:{
            dateFormat
        },
        props: {
            data:{
                type:Array,
                description: 'List of Projects'
            }
        },
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