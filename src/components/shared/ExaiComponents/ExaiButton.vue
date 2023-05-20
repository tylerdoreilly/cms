<template>
  <button type="button" :class="[$style['exai-button'], classModifiers]">
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
      classModifiers(){
        const obj = {}
        obj[this.$style['exai-button--primary']] = this.variation == 'primary';
        obj[this.$style['exai-button--secondary']] = this.variation == 'secondary';
        obj[this.$style['exai-button--icon-only']] = this.editMode && this.activated;
        return obj
      },

      setIcon(){
        let buildIcon;
        console.log('newIcon', this.btnIcon)
        if (this.btnIcon) {       
          buildIcon = `${this.iconBase} + ${this.btnIcon}`        
        }
        return buildIcon
      },

      setLeftIcon(){
        let buildLeftIcon
        if(this.leftIcon != null || this.leftIcon != ''){       
          buildLeftIcon = `${this.iconBase} + ${this.leftIcon}`       
        }
        return buildLeftIcon
      },

      setRightIcon(){
        let buildRightIcon
        if(this.rightIcon != null || this.rightIcon != ''){       
          buildRightIcon = `${this.iconBase} + ${this.rightIcon}`     
        }
        return buildRightIcon
      }
    },
    mounted() {
        this.$watch(() => this.icon, (value) => { this.btnIcon = value;})
    },
    methods: {
    }

  }
</script>


<style lang="scss" module>
  .exai-button {
    @include btn-base;
    @include btn-default();
    font-size: 14px;
    padding:6px 8px;
    align-items:center;
    text-align:center;
    
    &--primary{
      @include btn-primary();
    }

    &--secondary{
      background: $base-white;
      color:#2c3e50;
    }

    &--icon-only{
      border:0px;
      background:transparent;
    }
  }

  .grab{
    cursor:grab;
  }
</style>
