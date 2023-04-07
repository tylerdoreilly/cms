<template>
    <div class="brand">Exai</div>
</template>

<script>
    export default {
        name: 'AppBrand',
        props: ['templates']
    }
</script>

<style lang="scss">
    .brand{
        color:$gunmetal;
        font-size:20px;
        margin-left:12px;
        position:sticky;
        top:40px;
    }
</style>