<template>
  <div :class="[$style['template-object'], classObject]">
    <div :class="[$style['template-item__header'], headerModifiers]">
      <div :class="[$style['template-item__title']]" v-if="this.$slots['title']">
        <slot name="icon"></slot>
        <slot name="title"></slot>
      </div>
      <div :class="[$style['template-item__controls']]" v-if="this.$slots['controls']">
        <slot name="controls"></slot>
      </div>
    </div>
    <div :class="[$style['template-item__body']]" v-if="this.activated">
      <slot></slot>
    </div>
  </div> 
</template>

<script>

  export default {
    name: 'TemplateObject',
    components: {
     
    },
    props: {
      editMode: {
        type:Boolean,
        default:false,
        docs:{
          validation:'_',
          description: 'sets edit mode styles'
        }
      },
      activated: {
        type:Boolean,
        default:false,
        docs:{
          validation:'_',
          description: 'sets edit mode styles'
        }
      }
    },
    data() {
      return {

      }
    },
    computed:{
      classObject(){
       const obj = {}
        obj[this.$style['template-object--edit-mode']] = this.editMode && this.activated;
        return obj
      },
      headerModifiers(){
       const obj = {}
        obj[this.$style['template-item__header--list']] = this.activated == false;
        return obj
      }
    },
    methods: {
     
    },
  }
</script>

<style lang="scss" module>
  @import './templateItem.scss';
 
</style>
