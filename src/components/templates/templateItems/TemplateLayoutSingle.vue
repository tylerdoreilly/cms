<template>
  <div class="template-layout-item">
    <div class="template-layout-item__header">
      <div class="template-layout-item__title">Layout</div>
      <div class="template-layout-item__controls">
        <button class="template-layout-item__btn">Edit</button>
        <button class="template-layout-item__btn">Add</button>
        <button class="template-layout-item__drag">===</button>
      </div>
      
    </div>
    <div class="template-layout__content">
      <div class="content-row">
        <div class="template-layout__content-header">
          <div class="template-layout__content-title">Row</div>
          <div class="template-layout__content__controls">
            <button class="template-layout-item__btn">Add</button>
          </div>          
        </div>
        <div class="content-items-wrapper">
          <slot>content area</slot> 
        </div>
      
      </div>
      
    </div>
  </div>
</template>

<script>


export default {
  name: 'TemplateLayoutSingle',
  components: {

  },
  props: {
    msg: String
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0,
          content: "<h1>Initial Content</h1>"
      }
  },
  methods: {
   
  },
  mounted () {
  
  }
}
</script>

<style lang="scss">
  @import './templateLayoutItem.scss';
 .template-layout{
  display:flex;
  flex-direction: row;
 }
</style>
