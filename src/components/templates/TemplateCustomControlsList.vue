<template>
    <div>
        <div class="table-container">
            <div class="table-controls">
                <exai-autocomplete :suggestions="suggestions" v-model="selection"></exai-autocomplete>
               
            </div>
           
            <table class="table">
                <thead class="table-header">
                <tr>
                    <th class="table-th" style="width:40px"><div class="table-th__inner"><span class="table-th__text">Id</span></div></th>
                    <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Title</span></div></th>
                    <th class="table-th" style="width:40%"><div class="table-th__inner"><span class="table-th__text">Description</span></div></th>
                    <th class="table-th"><div class="table-th__inner"><span class="table-th__text">As of Date</span></div></th>
                    <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Created</span></div></th>
                    <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Updated</span></div></th>
                    <th class="table-th"><div class="table-th__inner"><span class="table-th__text">State</span></div></th>
                    <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Action</span></div></th>
                </tr>
                </thead>
                <tbody class="table-tbody">
                <tr v-for="item in customControls" :key="item.id" class="table-tr">
                    <td class="table-td" style="width:40px">{{ item.id }}</td>
                    <td class="table-td">{{ item.name }}</td>
                    <td class="table-td" style="width:40%">{{ item.description }}</td>
                    <td class="table-td"><date-format :date="item.date_asof" dateFormat="MM/DD/YYYY"></date-format></td>
                    <td class="table-td"><date-format :date="item.createdAt" dateFormat="MM/DD/YYYY"></date-format></td>
                    <td class="table-td"><date-format :date="item.updatedAt" dateFormat="MM/DD/YYYY"></date-format></td>
                    <td class="table-td" v-if="item.published === true">Published</td>
                    <td class="table-td" v-if="item.published === false">UnPublished</td>
                    <td class="table-td">
                        <div class="table-actions">
                            <router-link class="table__link" :to="'/admin/templates/edit-template/' + item.id">Edit</router-link>
                            <a @click.prevent="openCloneModal(item)">Clone</a>
                            <a @click.prevent="openDeleteTemplate(item)">Delete</a>
                        </div>
                    
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
   
</template>

<script>
    import dateFormat from '../shared/dateFormat.vue';
    import ExaiAutocomplete from '@/components/shared/forms/ExaiAutocomplete.vue';

    export default {
        name: 'template-custom-controls-List',
        components:{
            dateFormat,
            ExaiAutocomplete
        },
        props: ['customControls'],

        data() {
            return {
                selection: "",
                suggestions: [
                { city: "Bangalore", state: "Karnataka" },
                { city: "Chennai", state: "Tamil Nadu" },
                { city: "Delhi", state: "Delhi" },
                { city: "Kolkata", state: "West Bengal" },
                { city: "Mumbai", state: "Maharashtra" },
                ],
            };
        },

        methods:{
           
        },

    }
</script>

<style lang="scss">
    @import '../../styles/table.scss';
</style>