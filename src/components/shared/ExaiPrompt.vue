<template>
    <transition name="modal-fade">
      <div class="exai-prompt-overlay">
        <div class="exai-prompt" @click.stop>
            <div class="exai-prompt__header">
                <div class="exai-prompt__header-title">{{ title }} {{ item.id }}</div>   
            </div>
            <div class="exai-prompt__body">
               <p>{{ message }}</p>
            </div>
            <div class="exai-prompt__actions">
                <exai-button text="Cancel" variation="secondary" @click.native="$emit('close-modal')"></exai-button>
                <exai-button text="Yes" variation="primary" @click.native="$emit('close-and-submit', item)"></exai-button>
            </div>
        </div>
      </div>
    </transition>
</template>
  
<script>
  import ExaiButton from './ExaiButton.vue'

  export default {
    name: 'exai-prompt',
    components:{
        ExaiButton
    },
    props:{
        title:{
            type:String,   
            default:"Modal",
            docs:{
                validation:'_',
                description: 'Prompt Title'
            }         
        },
        message:{
            type:String,   
            default:"Are You Sure?",
            docs:{
                validation:'_',
                description: 'Prompt Message'
            }         
        },
        data:{
            type:Object,   
            docs:{
                validation:'_',
                description: 'data'
            }         
        },
    },
    data() {
      return {
        item: this.data,
      }
  },
  }
  </script>
  
  <style lang="scss">
    .exai-prompt-overlay {
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

    .exai-prompt {
        background-color: $base-white;
        text-align: left;
        height: auto;
        // min-height:200px;
        width: 500px;
        margin-top: 10%;
        border-radius: 10px;
        display:flex;
        flex-direction: column;
    }

    .exai-prompt__header{
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

    .exai-prompt__header-title{
       font-size:18px;
    }

    .exai-prompt__header-actions{
        margin-left: auto;
        display:flex;
        flex-direction: row;
        gap:10px;
    }

    .exai-prompt__body{
        padding:20px;
        height: auto;
        max-height:500px;
        overflow-y: auto;
    }
    .exai-prompt__body p{
        margin:0px;
        font-size:16px;
    }

    .exai-prompt__actions{
        padding:20px;
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

  </style>