<template>
    <div>
    <exai-modal title="Add Custom Control" modalSize="medium" styleType="fullBody">
        <template #exai-modal-body>
            <control-library>
                <control-library-menu v-if="!showDetails && customContentItems">
                    <template v-slot:control-library-filters>
                        <div class="control-group__menu">
                            <ul>
                                <li @click.prevent="switchList('all')" :class="{ active: controlsList === 'all' }">All</li>
                                <li @click.prevent="switchList('text-snippet')" :class="{ active: controlsList === 'text-snippet' }">Text Snippets</li>
                                <li @click.prevent="switchList('dynamic-control')" :class="{ active: controlsList === 'dynamic-control' }">Dynamic Controls</li>
                                <li @click.prevent="switchList('notes')" :class="{ active: controlsList === 'notes' }">Notes</li>
                            </ul>
                        </div>
                    </template>
                    <template v-slot:control-library-list>
                        <div class="form-title">Select A Control</div>
                        <div class="list-wrapper">
                            <div v-for="(item) in filteredItems(controlsList)" :key="item.field">
                                <control-library-item 
                                    :title="item.name" 
                                    :icon="item.icon"
                                    @click.native.prevent="showDetailsForm({type:item.control, control:item.field, data:item})">
                                </control-library-item> 
                            </div>
                        </div>
                    </template>
                </control-library-menu>
                <control-library-menu v-else>
                    <template v-slot:control-library-filters>
                        <p>Insert the dynamic control.</p>
                    </template>
                    <template v-slot:control-library-list>
                        <dynamic-control-form
                            v-if="formType === 'dynamic-control'"
                            :controlItem="controlItem"
                            :value="controlData"
                            :data="data"
                            @input="(newcontrolData) => {controlData = newcontrolData}">
                        </dynamic-control-form>

                        <custom-content-control-form
                            v-if="formType === 'text-snippet'"
                            :controlItem="controlItem"
                            :value="controlData"
                            :data="data"
                            @input="(newcontrolData) => {controlData = newcontrolData}">
                        </custom-content-control-form>
                    </template>
                </control-library-menu>
            </control-library>     
        </template>
        <template #exai-modal-actions>
            <exai-button text="Back" @click.native.prevent="back" v-if="showDetails"></exai-button>
            <exai-button text="Cancel" @click.native.prevent="closeModal"></exai-button>
            <exai-button text="Add Control" variation="primary" @click.native.prevent="submitted" v-if="showDetails"></exai-button> 
        </template>      
    </exai-modal>
    </div>
</template>
  
<script>
    import ExaiButton from '@/components/shared/ExaiComponents/ExaiButton.vue';
    import ExaiModal from '@/components/shared/ExaiComponents/ExaiModal.vue';
    import ControlLibrary from '@/components/shared/customEditor/controls/controlLibrary/ControlLibrary';
    import ControlLibraryMenu from '@/components/shared/customEditor/controls/controlLibrary/ControlLibraryMenu';
    import ControlLibraryItem from '@/components/shared/customEditor/controls/controlLibrary/ControlLibraryItem';
    import DynamicControlForm from '@/components/shared/customEditor/controls/controlLibrary/DynamicControlForm';
    import CustomContentControlForm from '@/components/shared/customEditor/controls/controlLibrary/CustomContentControlForm';

  export default {
    name: 'insert-custom-content-modal',
    components:{
        ExaiModal,
        ExaiButton,
        ControlLibrary,
        ControlLibraryMenu,
        ControlLibraryItem,
        DynamicControlForm,
        CustomContentControlForm
    },

    props:{
        sectionId:{
            type: Number,            
        },
        whatever:{
            type: String,
        },
        contentItems:{
            type:[Array, Object]
        },
        selectedControlItem:{
            type:[Object]
        }
    },

    data() {
        return {
            control: this.whatever,
            customContentItems: this.contentItems,
            showDetails:false,
            formType:'',
            controlItem:'',
            data:'',
            controlData: {},
            controlsList:'all',
        }
    },
   
    methods: {
        switchList(listType){
            this.controlsList = listType;
        },

        showDetailsForm(value){
            console.log('selection', value)
            this.showDetails = true;
            this.formType = value.type;
            this.controlItem = value.control;
            this.controlData.text = value.data.name;
            this.data = value.data;
            // this.controlData.text = value.data.name;
            // this.controlData.content = this.convertHtml(value.data.content);
        },

        submitted() {
            console.log('control data',this.controlData);
            this.$emit('submit-control', this.controlData);
            this.closeModal();
        },

        back() {
            this.showDetails = false;
            this.formType = '';
            this.clearForm();
        },

        closeModal() {
            this.showDetails = false;
            this.formType = '';
            this.clearForm();
            this.$emit('close-modal');
        },

        clearForm(){
            // this.controlData.text = '';
            // this.controlData.id = '';
            // this.controlData.class = '';
            // this.selectedDateFormat = '';
            // this.characterLimit = '';
        },
      
        filteredItems(selection){
            let listItems
            if (selection === 'all') {
                listItems = this.customContentItems;
            }
            if (selection === 'dynamic-control') {
                listItems = this.customContentItems.filter(item => item.control === selection);
            }
            if (selection === 'text-snippet') {
                listItems = this.customContentItems.filter(item => item.control === selection);
            }
            return listItems;
            
        },

        editControl(){
            if (Object.keys(this.selectedControlItem).length != 0) {
                this.showDetails = true;
                this.formType = 'dynamic-control';
                this.controlItem = this.selectedControlItem.data.controlName;
                this.controlData = this.selectedControlItem;
                this.data = this.selectedControlItem.data;
            } else{
                this.showDetails = false;
            }
        }
    },

    mounted(){
        console.log('passed data',this.selectedControlItem)
        this.editControl();
    }
  }
</script>
  
<style lang="scss">
    .modal-header-inline{
        display:flex;
        flex-direction: row;
        gap:10px;
        border-bottom:1px solid #ccc;
        padding-bottom:15px;
        margin-top:-2px;
        margin-bottom:15px;
        font-size:15px;
    }
    .exai-modal__actions{
        border-top:1px solid $border;
    }

    // layout to be moved to component

    .control-group__menu{
        flex: 0 0 12em;

        & ul{
            margin:0px;
            padding:0px;
            list-style:none;
        }
        & ul li{
            margin-bottom:8px;
            padding:0px;
            font-size:14px;
            cursor:pointer;

            &.active{
                color:$keppel;
                font-weight:bold;
            }

            &:hover{
                color:$keppel; 
            }
        }
    }
    .control-group__settings{
        flex: 0 0 14em;
        padding-right:15px;
        border-right: 1px solid $border;

    }
    .control-group__list{
        flex:1;
    }

    .control-list{
        display:flex;
        flex-direction: column;
        gap:10px;
    }

    .control-list__row{
        display:flex;
        justify-content: flex-start;
        flex-direction: row;
        gap:10px;
    }

    .control-list__item{
        flex:50%;
        @include flex(flex, row, $gap: 10px);
        cursor: pointer;  
        align-items:center;
        padding:12px;
        background:$white-smoke;
        border:1px solid $border;
        font-size:14px;
        font-weight: bold;

        &:hover{
            border-color:$keppel;
        }
    }
    .list-wrapper {
        flex:1;
        display: flex;
        flex-wrap: wrap;
        gap:15px;
      }
      .list-wrapper>* {
          flex: 0 0 48.6%;
      }
  
</style>