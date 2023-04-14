<template>
    <!-- <transition name="modal-fade">
        <exai-modal title="Add Dynamic Control">
        </exai-modal>
      <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modal" @click.stop>
            <div class="modal-header">
                <div class="modal-header__title">Add Dynamic Control</div> 
                <div class="modal-header__actions">
                    <exai-button variation="secondary" icon="fa-xmark" @click.native="$emit('close-modal')"></exai-button>
                </div>
                
            </div>
            <div class="form-group">
                <label for="email">Control Text</label>
                <input type="text" id="controlText" class="form-control" v-model="controlData.text">
            </div>
            <div class="form-group">
                <label for="email">Control Id</label>
                <input type="text" id="controlId" class="form-control" v-model="controlData.id">
            </div>
            <exai-button text="Add Control" variation="primary" @click.native.prevent="submitted"></exai-button>
        </div>
      </div>
    </transition> -->
    <div>
    <exai-modal title="Add Dynamic Control">
        <template #exai-modal-body>
            <exai-form>
                <exai-form-group>
                    <exai-form-label text="Control Text" for="controlText"></exai-form-label>
                    <input type="text" id="controlText" class="form-control" v-model="controlData.text">
                </exai-form-group>
                <exai-form-group>
                    <exai-form-label text="Control Id" for="controlId"></exai-form-label>
                    <input type="text" id="controlId" class="form-control" v-model="controlData.id">
                </exai-form-group>
            </exai-form>
        </template>
        <template #exai-modal-actions>
            <exai-button text="Add Control" variation="primary" @click.native.prevent="submitted"></exai-button>
        </template>
      
    </exai-modal>
    </div>
</template>
  
<script>
  import ExaiButton from '../ExaiButton.vue';
  import ExaiModal from '../ExaiModal.vue';
  import ExaiForm from '../../forms/ExaiForm.vue';
  import ExaiFormGroup from '../../forms/ExaiFormGroup.vue';
  import ExaiFormLabel from '../../forms/ExaiFormLabel.vue';
  export default {
    name: 'insert-modal',
    components:{
        ExaiModal,
        ExaiButton,
        ExaiForm,
        ExaiFormGroup,
        ExaiFormLabel
    },
    props:{
        sectionId:{
            type:Number,            
        },
        controlType:String
    },
    data() {
        return {
            control: this.controlType,
            controlData: {
                text: '',
                id:'',
                class:'',
                section: this.sectionId,
            }
        }
    },
    methods: {
        submitted() {
            this.controlData.class = `dynamic-control ${this.controlType}`
            let control = this.controlData
            let type = this.controlType
            this.$emit('submit-control',{control, type});
            this.$emit('close-modal')
        }
    },
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