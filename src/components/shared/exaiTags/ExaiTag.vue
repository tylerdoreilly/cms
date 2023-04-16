<template>
  <div :class="[$style['exai-tag'], classModifiers]">
    <span v-if="label"> {{ label }}: </span>
    {{ item }}
  </div>
</template>

<script>
  export default {  
    name: 'exai-tag',
    props: {
      item: [Number, String],
      label:String,
      variation:{
        type:String,
        default:'primary',
        docs:{
          validation:'_',
          description:'Variation of tag style. Can be primary or secondary'
        }
      }
    },
    computed:{ 
      classModifiers(){
        const obj = {}
        obj[this.$style['exai-tag--primary']] = this.variation == 'primary';
        obj[this.$style['exai-tag--secondary']] = this.variation == 'secondary';
        obj[this.$style['exai-tag--dark']] = this.variation == 'dark';
        return obj
      },
    },
   
    data() {
        return {
          content: this.data,
        }
    },
  }
</script>

<style lang="scss" module>
  .exai-tag{
    @include flex(inline-flex, row, $gap: 5px);
    align-items:center;
    font-size:12px;
    padding:4px 8px;

    &--primary{
      @include background(primary);
      @include color(onPrimary);
      @include border(primary, solid, $width:1px, $radius:3px)
    }

    &--secondary{
      @include background(secondary);
      @include color(onSecondary);
      @include border(secondary, solid, $width:1px, $radius:3px);
    }
    
    &--dark{
      @include background(dark);
      @include color(onDark);
      @include border(dark, solid, $width:1px, $radius:3px);
    }
  }

</style>
