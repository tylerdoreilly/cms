<template>
    <transition name="modal-fade">
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
    </transition>
  </template>
  
  <script>
  import ExaiButton from '../../ExaiButton.vue'

  export default {
    name: 'insert-modal',
    components:{
        ExaiButton
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
    .modal-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        background-color: #000000da;
        z-index:1000;
    }
    .modal {
        background-color: white;
        text-align: left;
        height: 400px;
        width: 600px;
        margin-top: 10%;
        padding: 60px 0;
        border-radius: 10px;
        padding:20px;
    }

    .modal-header{
        display:flex;
        flex-direction: row;
        border-bottom:1px solid $border;
        margin-bottom:15px;
        padding-bottom:15px;
        align-items: center;
    }
    .modal-header__title{
       font-size:18px;
    }

    .modal-header__actions{
        margin-left: auto;
        display:flex;
        flex-direction: row;
        gap:10px;
    }
   
    .modal-fade-enter,
    .modal-fade-leave-to {
        opacity: 0;
    }
    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity 0.5s ease;
    }

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