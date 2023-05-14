<template>
    <div :class="[$style['control-library'], classModifiers]">
        <slot></slot>
    </div>
</template>
  
<script>
  export default {
    name: 'control-library',
    components:{
       
    },
    props:{
       
    },
    computed:{
        classModifiers(){
            const obj = {}
            obj[this.$style['exai-button--primary']] = this.variation == 'primary';
            obj[this.$style['exai-button--secondary']] = this.variation == 'secondary';
            obj[this.$style['exai-button--icon-only']] = this.editMode && this.activated;
            return obj
        },
   },
  }
</script>
  
<style lang="scss" module>
    .control-library{
        display:flex;
        flex-direction: row;
        height:400px;
    }
</style>