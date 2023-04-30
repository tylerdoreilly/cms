import Quill from "quill";
import Vue from 'vue';

const eventBus = new Vue();
const Block = Quill.import('blots/block/embed');

class DynamicControl extends Block {

  static create (value) {
    console.log('value',value);
    let node = super.create();
    node.setAttribute('class', value.class);
    node.setAttribute('id', value.id);
    node.setAttribute('data-section', value.section);
    node.setAttribute('data-control', value.text);
    node.setAttribute('contenteditable', 'false');
    node.innerHTML = `<span class="control-wrapper"><span class="control-display">${value.text}</span></span>`;
    let wrapperNode = node.querySelector('span')
    let sNode = document.createElement('span');
    sNode.setAttribute('class', 'edit');
    sNode.setAttribute('style', 'padding-left: 5px;cursor: pointer; display: none;');
    sNode.innerHTML = `edit`;
    wrapperNode.appendChild(sNode);

    eventBus.$on('update-control', (data) => {
      console.log('control data test',data)
      node.innerHTML = `<span class="control-wrapper"><span class="control-display">${data.text}</span></span>`;
    });

    return node;
  }

  static formats(domNode) {
    console.log(domNode)
    return domNode.getAttribute("div");
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) return super.format(name, value);
    if (value){
      this.domNode.setAttribute('class', value.class);
      this.domNode.setAttribute('id', value.id);
      this.domNode.setAttribute('data-section', value.section);
      this.domNode.setAttribute('data-control', value.text);  
    }
  }

  get quill() {
    if (!this.scroll || !this.scroll.domNode.parentNode) {
        return null;
    }

    return Quill.find(this.scroll.domNode.parentNode);
  }

  constructor(scroll, domNode) {
    super(scroll, domNode); 

    let controlValue = {
      class: this.domNode.getAttribute('class'),
      id: this.domNode.getAttribute('id'),
      section: this.domNode.getAttribute('data-section'),
      text: this.domNode.getAttribute('data-control'),
      type: 'custom',
    }
    const element = this.domNode;
    const innerElement = element.querySelector('.control-wrapper');
    const editBtn = innerElement.querySelector('.edit');
    console.log('test', innerElement);

    innerElement.addEventListener('mouseover', (event) => {
      let editControls = innerElement.querySelector('.edit');
      editControls.setAttribute('style', 'display: inline-block; cursor: pointer;');
      console.log("hover", {event}); 
    });

    innerElement.addEventListener('mouseout', (event) => {
      let editControls = innerElement.querySelector('.edit');
      editControls.setAttribute('style', 'display: none; cursor: pointer;');
      console.log("hover", {event}); 
    });

    editBtn.addEventListener('click', (event) => {
      this.editDynamicControl(event, controlValue)
    });
    
    
  }

  editDynamicControl(event, controlValue){
    eventBus.$emit('edit-control', controlValue)
    console.log("blot clicked", {event, controlValue}); 
  }

  // update(value){
  //   console.log('value >> updated', value)
  //   this.quill.on('text-change', (range, oldRange, source) => {
  //     console.log("blot clicked", {oldRange, source}); 
  //     // Returns the leaf Blot at the specified index within the document
  //     let [leaf] = this.quill.getLeaf(range.index); // Experimental API
     
  //      if(leaf.domNode.nodeName === 'dynamicControl') {
  //        console.log("fuck")
  //      }
     
  //    })
  // }
 
}

DynamicControl.blotName = 'dynamicControl'
DynamicControl.tagName = 'div';

export {DynamicControl, eventBus};
