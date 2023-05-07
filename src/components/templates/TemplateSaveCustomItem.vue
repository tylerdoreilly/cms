<template>
    <div v-if="templateItemData">
    <exai-modal title="Save As New Custom Item">
        <template #exai-modal-body>
            <exai-form>
                <exai-form-group>
                    <exai-form-label text="Title" for="templateTitle"></exai-form-label>
                    <input type="text" id="templateTitle" class="form-control" v-model="templateItemData.name">
                </exai-form-group>
            </exai-form>

        </template>
        <template #exai-modal-actions>
            <exai-button text="Cancel" @click.native.prevent="closeModal"></exai-button>
            <exai-button text="Save" variation="primary" @click.native.prevent="submitted"></exai-button>
        </template>
      
    </exai-modal>
    </div>
</template>
  
<script>
  import ExaiButton from '../shared/ExaiButton.vue';
  import ExaiModal from '../shared/ExaiModal.vue';
  import ExaiForm from '../shared/forms/ExaiForm.vue';
  import ExaiFormGroup from '../shared/forms/ExaiFormGroup.vue';
  import ExaiFormLabel from '../shared/forms/ExaiFormLabel.vue';


  export default {
    name: 'template-save-custom-item',
    components:{
        ExaiModal,
        ExaiButton,
        ExaiForm,
        ExaiFormGroup,
        ExaiFormLabel,
    },
    props:{
        data:[Array, Object],
    },
    data() {
        return {
            templateItemData: this.data,
        }
    },
    methods: {
        submitted() {
            console.log('updated template item', this.templateItemData);
            this.$emit('save-custom-item', this.templateItemData);
            this.$emit('close-modal');
        },
        closeModal() {
            this.$emit('close-modal');
        },
    },
    mounted(){
    }
  }
</script>
  
  <style lang="scss">

    .form-group{
        display:flex;
        flex-direction: column;
        gap:6px;
        margin-bottom:15px;
    }

    .form-control{
        border:1px solid $border;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        padding:10px;
    }
   
  </style>