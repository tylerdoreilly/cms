<template>
    <div>
      <ul role="tabs-list" class="exai-tabs__list">
        <li class="exai-tabs__item" v-for="(tab, index) in tabs" :key="tab.title" @click="selectTab(index)" :class='{"exai-tabs__item--selected": (index == selectedIndex)}'>
            {{ tab.title }}
        </li>
      </ul>
      <slot></slot>
    </div>
  </template>

<script>
  export default {
    name: 'exai-tabs',
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
        // loop over all the tabs
        this.tabs.forEach((tab, index) => {
          tab.isActive = (index === i)
        })
      }
   }
  }
</script>

<style lang="scss">
  .exai-tabs__list{
    list-style-type: none;
    padding:0px;
    margin:0px;
    display:flex;
    flex-direction:row;
    gap:15px;
    border-bottom:1px solid $border;
    margin-bottom:20px;
  }

  .exai-tabs__item{
    padding:4px 4px 8px 4px;
    cursor:pointer;
    &--selected{
      border-bottom:2px solid $keppel
    }
  }
</style>