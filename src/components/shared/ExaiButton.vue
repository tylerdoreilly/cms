<template>
  <button type="button" :class="[$style['exai-button'], classObject]">
    <div v-if="this.leftIcon">
      <font-awesome-icon :icon="setLeftIcon" />
    </div>

    <div v-if="this.text">
      {{ text }}
    </div>
    
    <div v-if="this.rightIcon">
      <font-awesome-icon :icon="setRightIcon" />
    </div>

    <div v-if="this.icon">
      <font-awesome-icon :icon="setIcon" />
    </div>
  </button>
</template>

<script>

  export default {
    name: 'exai-button',
    components: {
    
    },
    data() {
      return {
        selectedIcon:'',
        iconBase: 'fa-solid',
        btnIcon: this.icon,
        leftIcon: this.iconLeft,
        rightIcon: this.iconRight
      }
    },
    props:{
      text:{
        type: String,
        docs:{
          validation:'_',
          description:'Button text'
        }
      },
      variation:{
        type:String,
        default:"medium",
        docs:{
          validation: '_',
          description: 'exai theme button'
        }
      },
      icon:{
        type: String,
        docs:{
          validation: '_',
          description:"icon selection"
        }
      },
      iconLeft:{
        type: String,
        docs:{
          validation: '_',
          description:"icon selection"
        }
      },
      iconRight:{
        type: String,
        docs:{
          validation: '_',
          description:"icon selection"
        }
      }
    },
    computed:{
      classObject(){
       const obj = {}
        obj[this.$style['exai-button--icon-only']] = this.editMode && this.activated;
        obj[this.$style['exai-button--secondary']] = this.variation == 'secondary';
        return obj
      },
      setIcon(){
        let buildIcon
        if(this.btnIcon){       
          buildIcon = `${this.iconBase} + ${this.btnIcon}`  
          console.log('icon',buildIcon)       
        }
        return buildIcon
      },
      setLeftIcon(){
        let buildLeftIcon
        if(this.leftIcon != null || this.leftIcon != ''){       
          buildLeftIcon = `${this.iconBase} + ${this.leftIcon}`  
          console.log('icon',buildLeftIcon)       
        }
        return buildLeftIcon
      },
      setRightIcon(){
        let buildRightIcon
        if(this.rightIcon != null || this.rightIcon != ''){       
          buildRightIcon = `${this.iconBase} + ${this.rightIcon}`  
          console.log('icon',buildRightIcon)       
        }
        return buildRightIcon
      }
    },
  }
</script>


<style lang="scss" module>
  @mixin base-btn {
    @include flex(inline-flex, row, $gap: 5px);
    align-content:center;
    align-items:center;
    text-align: center;
    border:0px;
    border-radius: 4px;
    margin:0px;
    cursor:pointer;
  }
  .exai-button {
    @include base-btn;
    background-color: $keppel;
    color: white;
    font-size: 14px;
    padding:6px 8px;

    &--icon-only{
      border:0px;
      background:transparent;
    }

    &--secondary{
      background: $white-smoke;
      color:#2c3e50;
    }
  }
</style>
