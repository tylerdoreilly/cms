<template>
    <div class="login-wrapper">
        <div class="login">
            <div class="login__header">
                <div class="login__title">Welcome to Exai</div>
                <div class="login__msg">Please login or signup below</div>
            </div>
            <div class="login__controls">
                <login-button />
            </div>
            
            <logout-button />
        </div>
    </div>
</template>

<script>
    import LoginButton from '@/components/user/LoginButton.vue'    
    import LogoutButton from '@/components/user/LogoutButton.vue'   
  export default {
    name: 'AppLogin',
    components: {
        LoginButton,
        LogoutButton
    },

  }
</script>

<style lang="scss">
    .login-wrapper{
        height:100vh;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .login{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap:20px;
        width:350px;
        border:1px solid $border;
        padding:20px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .login__header{
         @include flex(flex, column, $gap: 10px);
         align-items: center;
    }
    .login__title{
        font-size:20px;
    }
    .login__msg{
        font-size:14px;
    }

    .login__controls{
        display:flex;
        width:auto;
    }
</style>