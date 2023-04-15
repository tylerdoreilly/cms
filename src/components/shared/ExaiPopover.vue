<template>
  <div>
  <details data-popover="down">
    <summary>
      <div class="popover-btn popover-btn--secondary"><font-awesome-icon icon="fa-solid fa-ellipsis" /></div>
    </summary>
    <div class="popover-body">
      <slot></slot>
    </div>
    
  </details>
  </div>
  
</template>

<script>

  export default {
    name: 'exai-popover',
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


<style lang="scss">
// details[data-popover] > summary {
//  cursor
// }
//  details[data-popover] > summary:focus {
//   outline: none;
// }
details[data-popover] > summary {
  cursor:pointer
}
details[data-popover] > summary::-webkit-details-marker {
  display: none;
}
details[data-popover] > summary {
  list-style: none;
}
details[data-popover] > summary {
  list-style: none;
  text-decoration: underline dotted teal;
}
details[data-popover] {
  position: relative;
}
details[data-popover] > summary + * {
  position: absolute;
}
details[data-popover] > .popover-body{
  background:$base-white;
  border:1px solid $border;
  padding:15px;
  border-radius:4px;
  min-width:120px;
  z-index:900;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
// Positioning
details[data-popover="up"] > summary + * {
  bottom: calc(0.5rem + 100%);
  right: 50%;
  transform: translateX(50%);
}
details[data-popover="down"] > summary + * {
  top: calc(0.5rem + 100%);
  right: 50%;
  transform: translateX(50%);
}
details[data-popover="left"] > summary + * {
  right: calc(1rem + 100%);
  bottom: 50%;
  transform: translateY(50%);
}
details[data-popover="right"] > summary + * {
  left: calc(1rem + 100%);
  bottom: 50%;
  transform: translateY(50%);
}

.popover-btn {
    background-color: $keppel;
    color: white;
    font-size: 14px;
    border-radius: 4px;
    display:inline-flex;
    flex-direction:row;
    gap:5px;
    align-content:center;
    align-items:center;
    text-align: center;
    border:0px;
    margin:0px;
    padding:6px 8px;
    cursor:pointer;

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
