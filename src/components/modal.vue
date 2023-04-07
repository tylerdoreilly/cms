<template>
    <transition name="modal-fade">
      <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modal" @click.stop>
          
          <h6>Saved!</h6>
          <p>Your Details have been saved Successfully</p>
          <button>Go Home</button>
        </div>
        <div class="close" @click="$emit('close-modal')">
          close
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'AppModal',
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
        justify-content: center;
        background-color: #000000da;
    }
    .modal {
        text-align: center;
        background-color: white;
        height: 400px;
        width: 600px;
        margin-top: 10%;
        padding: 60px 0;
        border-radius: 10px;
    }
    .close {
        margin: 10% 0 0 16px;
        cursor: pointer;
    }
    .close-img {
        width: 25px;
    }
    .check {
        width: 150px;
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