<template>
     <div class="nav-control">
      <exai-button text="Close" variation="secondary" iconLeft="fa-angles-left" @click.native="collapseMenu"></exai-button>
    </div>
</template>

<script>
    import ExaiButton from '@/components/shared/ExaiButton.vue';

    export default {
        name: 'admin-menu-ctrl',
        components: {
            ExaiButton
        },
    
    }
</script>

<style lang="scss">
  .nav-control{
    border-top:1px solid $border;
    display:flex;
    flex-direction: row;
    padding:10px 0px 0px 0px;
    margin-right:-20px;
    position:sticky;
    top:calc(100vh - 69px);

    width:12em;
  }

</style>