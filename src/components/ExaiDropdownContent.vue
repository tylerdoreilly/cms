<template>
  <transition name="dropdown-content">
    <div v-if="active" class="dropdown">
     <slot></slot>
    </div>
  </transition>
</template>

<script>
    export default {
        name: 'ExaiDropdownContent',
        props: ['templates'],
        inject: ["sharedState"],
       
        computed: {
            active() {
                return this.sharedState.active;
            }
        }
    }
</script>

<style lang="scss">
   .dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: all 0.2s;
}
.dropdown-content-enter,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.dropdown{
    background:#fff;
    padding:15px;
    border-radius: 10px;
    position:absolute;
    min-width:200px;
    right: 0;
    margin-top: 0.5rem;
    z-index:100;
    transform-origin: top right;
}
</style>