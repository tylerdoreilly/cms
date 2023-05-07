<template>
    <transition name="modal-fade">
      <div class="exai-modal-overlay" @click="$emit('close-modal')">
        <div class="exai-modal" @click.stop>
            <div class="exai-modal__header">
                <div class="exai-modal__header-title">{{ title }}</div> 
                <div class="exai-modal__header-actions">
                    <exai-button icon="fa-xmark" @click.native="$emit('close-modal')"></exai-button>
                </div>                
            </div>
            <div class="exai-modal__body">
                <slot name="exai-modal-body"></slot>
            </div>
            <div class="exai-modal__actions">
                <slot name="exai-modal-actions"></slot>
            </div>
        </div>
      </div>
    </transition>
</template>
  
<script>
  import ExaiButton from './ExaiButton.vue'

  export default {
    name: 'exai-modal',
    components:{
        ExaiButton
    },
    props:{
        title:{
            type:String,   
            default:"Modal",
            docs:{
                validation:'_',
                description: 'Modal Title'
            }         
        },
    },
  }
  </script>
  
  <style lang="scss">
    .exai-modal-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items:flex-start;
        justify-content: center;
        background-color: $overlay;
        z-index:1000;
    }

    .exai-modal {
        background-color: $base-white;
        text-align: left;
        height: auto;
        width: 600px;
        margin-top: 10%;
        border-radius: 10px;
        display:flex;
        flex-direction: column;    
    }

    .exai-modal__header{
        display:flex;
        flex-direction: row;
        min-height:55px;
        align-items: center;
        background:$white-smoke;
        padding:0px 15px;
        border-bottom:1px solid $border;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .exai-modal__header-title{
       font-size:18px;
    }

    .exai-modal__header-actions{
        margin-left: auto;
        display:flex;
        flex-direction: row;
        gap:10px;
    }

    .exai-modal__body{
        padding:20px;
        height: auto;
        max-height:600px;
        overflow-y: auto;
    }

    .exai-modal__actions{
        margin-left: auto;
        display:flex;
        flex-direction: row;
        gap:10px;
        padding:20px;
    }
   
    .modal-fade-enter,
    .modal-fade-leave-to {
        opacity: 0;
    }
    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity 0.5s ease;
    }

  </style>