<template>
  <div>
    <font-awesome-icon :icon="changeIcon(toggleState)" />
    <exai-button :text="btnText" :icon-left="changeIcon(toggleState)" @click.native="toggleBtn()"></exai-button>
  </div>
 
</template>

<script>
  import ExaiButton from './ExaiButton.vue'

  export default {
    name: 'exai-toggle-button',
    components: {
      ExaiButton
    },
    data() {
      return {    
        toggleState:false,
        btnText:this.upText,
        iconBase: 'fa-solid',
        btnIcon: this.upIcon,
      }
    },
    props:{
      upText:{
        type: String,
        docs:{
          validation:'_',
          description:'Button text'
        }
      },
      downText:{
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
      upIcon:{
        type: String,
        docs:{
          validation: '_',
          description:"icon selection"
        }
      },
      downIcon:{
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
    },
    methods:{
      toggleBtn(){
        console.log('btn', this.toggleState)
        this.toggleState = !this.toggleState;
        this.changeIcon(this.toggleState);
        this.$emit('toggle-action', this.toggleState)
      },

      changeIcon(value){
        let buildIcon
        if(!value){
        buildIcon = this.upIcon
        }
        if(value){
          buildIcon = this.downIcon 
        }
        return buildIcon
      }      
    }
  }
</script>


<style lang="scss" module>
  .exai-button {
    @include btn-base;
    @include btn-default();
    font-size: 14px;
    padding:6px 8px;

    &--primary{
      @include btn-primary();
    }

    &--secondary{
      background: $white-smoke;
      color:#2c3e50;
    }

    &--icon-only{
      border:0px;
      background:transparent;
    }
  }
</style>
