<template>
  <header :class="[$style['app-header']]">
    <app-brand />
    <div :class="[$style['app-header__controls']]">
      <auth-nav v-if="!$auth.isLoading" />
    </div>
  </header>
</template>

<script>
  import AuthNav from '@/components/AuthNav';
  import AppBrand from '@/components/AppBrand';

  export default {
    name: 'app-header',
    components: {
      AuthNav,
      AppBrand
    },
    props: {
      title: String
    },
  }
</script>

<style lang="scss"  module>
  .app-header {
    height:50px;
    display:flex;
    flex-direction:row;
    align-items:center;
    padding:0px 20px;
    background: darken( $gunmetal, 10% );
    gap:10px;
    position: sticky;
    top: 0;
    z-index:900;
  }
  .app-header__brand-logo{
    width:40px;
  }
  .app-header__brand{
    font-size:20px;
    font-weight:normal;
    color:$base-white;
  }

  .app-header__brand-icon {
    color:$base-white;
    font-size:28px;
  }

  .app-header__controls{
    @include flex(flex, row, $gap: 10px);
    margin-left:auto;
  }
</style>
