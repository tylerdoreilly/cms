<template>
  <div class="exai-tags">
    <slot></slot>
  </div>
</template>

<script>
  export default { 
    name: 'exai-tags',
  }
</script>

<style lang="scss">
 .exai-tags{
   display:flex;
   flex-direction: row;
   align-items:center;
   gap:5px;
 }
</style>
