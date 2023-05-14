<template>
  <div :class="[$style['template-object'], classObject]">
    <div :class="[$style['template-item__header'], headerModifiers]">
      <div :class="[$style['template-item__title']]">
        <exai-button icon="fa-grip-vertical" @mousedown.native="dragTemplateItem(content)" class="grab"></exai-button>
        <font-awesome-icon :icon="setIcon" />
        {{ title }}
      </div>
      <div :class="[$style['template-item__controls']]" v-if="this.activated">
        <exai-button icon="fa-gear" @click.native="toggleEditMode()"></exai-button>
        <exai-popover>
          <exai-list>
            <exai-list-item title="Save Item" @click.native.prevent="saveItem(content)"></exai-list-item>
            <exai-list-item title="Remove Item" @click.native="removeItem(sectionId)"></exai-list-item>
             <exai-list-item title="Move Up" @click.native="saveItem(content)"></exai-list-item>
            <exai-list-item title="Move Down" @click.native="saveItem(content)"></exai-list-item>
          </exai-list>
        </exai-popover>
      </div>
    </div>
    <div :class="[$style['template-item__body']]" v-if="this.activated">
      <slot></slot>
    </div>
  </div> 
</template>

<script>
  import ExaiButton from '../../shared/ExaiComponents/ExaiButton.vue'
  import {templateItemEventBus} from '../../../services/TemplateItemEventBus.js'
  import ExaiList from '../../shared/exaiList/ExaiList.vue'
  import ExaiListItem from '../../shared/exaiList/ExaiListItem.vue'
  import ExaiPopover from '../../shared/ExaiPopover.vue'
  export default {
    name: 'TemplateObject',
    components: {
      ExaiButton,
      ExaiList,
      ExaiListItem,
      ExaiPopover
    },
    props: {
      title:{
        type:String,
        docs:{
          validation:'_',
          description: 'Template Item Title'
        }
      },
      icon:{
        type: String,
        docs:{
          validation: '_',
          description:"icon selection"
        }
      },
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
      },
      data:[Array, Object],
      sectionId:Number
    },
    
    data() {
      return {
        editState: this.editMode,
        remove:false,
        iconBase: 'fa-solid',
        headerIcon: this.icon,
        section:this.sectionId,
        content:this.data,
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
      },
      setIcon(){
        let buildIcon = `${this.iconBase} + ${this.headerIcon}`   
        return buildIcon
      },
    },

    methods: {
      toggleEditMode(){
        this.editState = !this.editStatee;
        this.$emit('edit-mode', this.editState)
      },
      removeItem(sectionId){
        console.log('remove clicked',sectionId)
        this.$parent.$emit('remove-item', sectionId)
      },
      saveItem(item){
        this.$parent.$emit('save-custom-item', item)
      },
      dragTemplateItem(item) {
        let itemId = item.id;
        templateItemEventBus.$emit('drag-template-item', item.id);
        console.log("editor blur!", itemId);
      }
    },
  }
</script>

<style lang="scss" module>
  @import './templateItem.scss';
 
</style>
