<template>
  <button
    class="btn btn-primary btn-block"
    v-if="!$auth.isAuthenticated"
    @click="handleSignUp"
  >
    Sign Up
  </button>
</template>
  
<script>
  export default {
    name: 'signup-Button',
    methods: {
    handleSignUp() {
      this.$auth.loginWithRedirect({
        appState: {
          targetPath: "/admin",
        },
        authorizationParams: {
          screen_hint: "signup",
        }
      });
    },
  },
  };
</script>