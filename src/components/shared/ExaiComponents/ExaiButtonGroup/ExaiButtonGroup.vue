<template>
    <div>
      <div role="tabs-list" class="exai-button-group">
        <div class="exai-button-group__item" 
          v-for="(tab, index) in tabs" 
          :key="tab.title" 
          @click="selectTab(index)" 
          :class='{"exai-button-group__item--selected": (index == selectedIndex)}'>
          
            {{ tab.title }}
        </div>
      </div>
      <slot></slot>
    </div>
  </template>

<script>
  export default {
    name: 'exai-button-group',
    data () {
      return {
        selectedIndex: 0, // the index of the selected tab,
        tabs: [],        // all of the tabs
      }
    },
    created () {
      this.tabs = this.$children
   },
   mounted () {
      this.selectTab(0)
  },
  methods: {
      selectTab (i) {
        this.selectedIndex = i
        this.tabs.forEach((tab, index) => {
          tab.isActive = (index === i);
        });

        let getTab = this.tabs.find(item => item.isActive === true).title;
        this.$emit('filter-action', getTab)
      }
   }
  }
</script>

<style lang="scss">
  .exai-button-group{
    padding:0px;
    margin:0px;
    display:flex;
    flex-direction:row;
    border:1px solid $border;
    border-radius:2px;
  }

  .exai-button-group__item{
    padding:6px 12px;
    font-size:14px;
    border-right:1px solid $border;
    cursor:pointer;

    &:last-child{
      border-right:0px;
    }

    &--selected{
      background: $default-background;
    }
  }
</style>