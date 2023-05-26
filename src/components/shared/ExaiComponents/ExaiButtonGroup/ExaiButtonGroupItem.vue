<template lang="html">
    <div v-show="isActive">
      <slot></slot>
    </div>
</template>

<script>
    export default {
      name: 'exai-button-group-item',
      props: {
        title: {
          type: String,
          default: 'Button'
        }
      },
      data () {
        return {
          isActive: true
        }
      }
    }
  </script>