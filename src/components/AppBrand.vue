<template>
    <div :class="[$style['brand']]">
        <div :class="[$style['brand__logo']]">
            <font-awesome-icon icon="fa-solid fa-face-grin-wink" :class="[$style['brand__logo-icon']]"/>
        </div>
        <div :class="[$style['brand__text']]">Exai</div>
    </div>    
</template>

<script>
    export default {
        name: 'app-brand',
    }
</script>

<style lang="scss" module>
    .brand{
        @include flex(flex, row, $gap: 10px);
        align-items:center;
    }

    .brand__logo{
        width:40px;
    }

    .brand__logo-icon {
        color:$base-white;
        font-size:28px;
    }

    .brand__text{
        font-size:20px;
        font-weight:normal;
        color:$base-white;
    }
</style>