<template>
  <div :class="[$style['exai-spinner']]"></div>
</template>

<script>
  export default {
    name: 'exai-spinner',
  }
</script>


<style lang="scss" module>
  .exai-spinner {
    margin: auto;
    border: 6px solid $white-smoke;
    border-radius: 50%;
    border-top: 6px solid $keppel;
    width: 40px;
    height: 40px;
    animation: spinner 4s linear infinite;
    display:flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
