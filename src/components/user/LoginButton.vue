<template>
   <exai-button 
    text="Login" 
    variation="primary" 
    @click.native.prevent="handleLogin" 
    v-if="!$auth.isAuthenticated">
  </exai-button>
</template>
  
<script>
  import ExaiButton from '@/components/shared/ExaiComponents/ExaiButton.vue';

  export default {
    name: 'login-button',
    components: {
      ExaiButton
    },
    methods: {
      handleLogin() {
        this.$auth.loginWithRedirect({
          appState: {
            targetPath: "/admin",
          },
        });
      },
    },
  };
</script>