<template>
   <div class="container">
      <main class="main-content">
        <slot></slot>
      </main>
      <nav class="column--left">
        <slot name="sidebar"> nav </slot>
      </nav>
  </div>
</template>

<script>

export default {
  name: 'LayoutSidebarLeft',
  components: {
  },
  props: {
    title: String
  },
}
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction:row;
    gap:40px;
    flex: 1;
  }

  .main-content {
    flex: 1;
  }

  .column--left{
    flex: 0 0 12em;
    order: -1;
    background: $base-white;
    border-right:1px solid $border;
    padding:20px;
  }

</style>
