<template>
  <exai-button 
    text="Logout" 
    variation="secondary" 
    iconLeft="fa-arrow-right-from-bracket" 
    @click.native.prevent="logout" 
    v-if="$auth.isAuthenticated">
  </exai-button>
</template>

<script>
  import ExaiButton from '@/components/shared/ExaiComponents/ExaiButton.vue'
  export default {
    name: 'logout-button',
    components: {
      ExaiButton
    },
    methods: {
      logout() {
        this.$auth.logout();
        this.$router.push({ path: '/' });
      },
    },
  };
</script>