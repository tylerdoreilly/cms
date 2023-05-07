<template>
    <div class="navbar-nav ml-auto">
      <authentication-button />
    </div>
  </template>
  
  <script>
    import AuthenticationButton from '@/components/user/AuthenticationButton';
  
    export default {
      name: 'auth-nav',
      components: { AuthenticationButton },
    };
  </script>