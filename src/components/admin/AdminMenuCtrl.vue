<template>
     <div :class="[$style['nav-control']]">
      <exai-button :icon="toggleIcon()" @click.native="collapseMenu"></exai-button>
    </div>
</template>

<script>
    import ExaiButton from '@/components/shared/ExaiComponents/ExaiButton.vue';

    export default {
        name: 'admin-menu-ctrl',
        components: {
            ExaiButton
        },

        data() {
          return {
            toggleMenu:false,
            icon: 'fa-angles-left'
          }
        },

        methods:{
          collapseMenu() {
            this.toggleMenu = !this.toggleMenu
            console.log('collapse menu', this.toggleMenu)
            this.$emit('collapse-menu', this.toggleMenu);
          },

          toggleIcon() {
            this.icon = this.toggleMenu ? 'fa-angles-right' : 'fa-angles-left';
            console.log('newIcon', this.icon)
            return this.icon
          }
        }
    }
</script>

<style lang="scss" module>
  .nav-control{
    display:flex;
    flex-direction: row;
  }
</style>