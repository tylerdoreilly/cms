<template>
    <div v-if="templateItemData">
    <exai-modal title="Save As New Custom Item">
        <template #exai-modal-body>
            <exai-form>
                <exai-form-group>
                    <exai-field-label text="Title" for="templateTitle"></exai-field-label>
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
  import ExaiButton from '../shared/ExaiComponents/ExaiButton.vue';
  import ExaiModal from '../shared/ExaiComponents/ExaiModal.vue';
  import ExaiForm from '../shared/forms/ExaiForm.vue';
  import ExaiFormGroup from '../shared/forms/ExaiFormGroup.vue';
  import ExaiFieldLabel from '../shared/forms/ExaiFieldLabel.vue';


  export default {
    name: 'template-save-custom-item',
    components:{
        ExaiModal,
        ExaiButton,
        ExaiForm,
        ExaiFormGroup,
        ExaiFieldLabel,
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
   
  </style>