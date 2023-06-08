<template>
    <exai-table-container>
        <exai-table-controls>
            <exai-button text="Clone" @click.native.prevent="cloneTemplate()" :disabled="cloneDisabled"></exai-button>
            <exai-button text="Delete" @click.native.native="deleteTemplate()" :disabled="deleteDisabled"></exai-button>
           
            <template #right>
                <exai-search placeholder="Search Title" id="search-input" v-model="searchValue" ></exai-search>
                <exai-button-group @filter-action="getStatus($event)">
                    <exai-button-group-item title="All"></exai-button-group-item>
                    <exai-button-group-item title="Active"></exai-button-group-item>
                    <exai-button-group-item title="In Active"></exai-button-group-item>
                </exai-button-group>
            </template>

        </exai-table-controls>

        <table class="table">
            <thead class="table-header">
            <tr>
                <th class="table-th" style="width:20px">
                    <div class="table-th__inner">
                        <span class="table-th__text">
                            <input type="checkbox" @click="selectAll" v-model="allSelected">
                        </span>
                    </div>
                </th>
                <th class="table-th" style="width:40px"><div class="table-th__inner"><span class="table-th__text">Id</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Type</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Title</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Status</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">As of Date</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Created</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Updated</span></div></th>
                <th class="table-th"><div class="table-th__inner"><span class="table-th__text">Action</span></div></th>
            </tr>
            </thead>
            <tbody class="table-tbody">
                <tr v-for="item in filteredData" :key="item.id" class="table-tr">
                    <td class="table-td" style="width:20px">
                        <input type="checkbox" v-model="selectedIds" @click="select" :value="item.id">
                    </td>
                    <td class="table-td" style="width:40px">{{ item.id }}</td>
                    <td class="table-td">{{ item.templateType.type }}</td> 
                    <td class="table-td">{{ item.title }}</td>
                    <td class="table-td" >
                        <template v-if="item.active === true">Active</template>
                        <template v-else>In Active</template>
                    </td>
                    <td class="table-td"><date-format :date="item.date_asof" dateFormat="MM/DD/YYYY"></date-format></td>
                    <td class="table-td"><date-format :date="item.createdAt" dateFormat="MM/DD/YYYY"></date-format></td>
                    <td class="table-td"><date-format :date="item.updatedAt" dateFormat="MM/DD/YYYY"></date-format></td>
                    <td class="table-td">
                        <div class="table-actions">
                            <router-link class="table__link" :to="'/admin/project/' + id + '/templates/edit-template/' + item.id">Edit</router-link>
                            <a @click.prevent="openCloneTemplate(item)">Clone</a>
                            <a @click.prevent="openDeleteTemplate(item)">Delete</a>
                        </div>
                    
                    </td>
                </tr>
            </tbody>
        </table>

    </exai-table-container>
</template>

<script>
    import dateFormat from '../shared/dateFormat.vue'
    
    export default {
        name: 'TemplatesList',
        components:{
            dateFormat,
        },
        
        props: ['templates'],

        data() {
            return {
                data: this.templates,
                statusFilter: 'All',
                searchValue: '',
                selected: [],
                allSelected: false,
                selectedIds: [],
                id: this.$route.params.id,
            }
        },
        computed: {
            filteredData() {
                let tempData = this.data

                // Set initial sort order - ascending
                tempData.sort( ( a, b ) => {
                    if ( a.id < b.id ) return -1;
                    if ( a.id > b.id ) return 1;
                    return 0;
                });

                // Process search input
                if ( this.searchValue != '' && this.searchValue ) {
                    tempData = tempData.filter( ( item ) => {
                    return item.title
                        .toUpperCase()
                        .includes( this.searchValue.toUpperCase() )
                    })
                }
                
                // Filter out by status
                if ( this.statusFilter ) {
                    tempData = tempData.filter( ( item ) => {
                        if ( this.statusFilter === 'Active' ) {
                            return ( item.active === true )
                        }
                        if ( this.statusFilter === 'In Active' ) {
                            return ( item.active === false )
                        } else {
                            return item
                        }
                    });
                }
                             
                return tempData
            },

            cloneDisabled(){
                let isDisabled
                if (this.selectedIds.length === 0 || this.selectedIds.length > 1) {
                    isDisabled = true
                } else {
                    isDisabled = false
                }
                return isDisabled
            },

            deleteDisabled(){
                // Todo: make this multi items
                let isDisabled
                if (this.selectedIds.length === 0 || this.selectedIds.length > 1) {
                    isDisabled = true
                } else {
                    isDisabled = false
                }
                return isDisabled
            }
        },

        methods:{
            getStatus(event){
                this.statusFilter = event;
            },

            selectAll() {
                this.selectedIds = [];

                if (!this.allSelected) {
                    this.data.forEach(item =>{
                        this.selectedIds.push(item.id);
                    })
                }
            },

            select() {
                this.allSelected = false;
            },

            cloneTemplate(){
                let selected = this.selectedIds[0]
                let selectedItem = this.data.find(item => item.id === selected)
                console.log('pass template',selectedItem)
                this.$emit('open-clone-template', selectedItem);
            },

            deleteTemplate(){
                // todo make this multi items
                let selected = this.selectedIds[0]
                let selectedItem = this.data.find(item => item.id === selected)
                console.log('pass template',selectedItem)
                this.$emit('open-delete-template',selectedItem);
            }
        },
    }
</script>

<style lang="scss">
    @import '../../styles/table.scss';
</style>