<template>
    <div>
      <logged-in-user v-if="$auth.isAuthenticated" />
      <login-button v-else />
    </div>
  </template>
  
  <script>
    import LoginButton from '@/components/user/LoginButton';
    import LoggedInUser from '@/components/user/LoggedInUser';

    export default {
      name: 'authentication-button',
      components: { LoginButton, LoggedInUser },
    };
  </script>