import Quill from "quill";
const Block = Quill.import('blots/block');

class DynamicControl extends Block {

  static create (value) {
    console.log('value',value);
    let node = super.create();
    node.setAttribute('class', value.class);
    node.setAttribute('id', value.id);
    node.setAttribute('data-section', value.section);
    node.setAttribute('data-control', value.text);
    node.setAttribute('style', 'cursor: pointer;');
    node.addEventListener('click', function(e) { 
      console.log("blot clicked", {e, value}); 
    });
    return node;

  }
  static formats(domNode) {
    console.log(domNode)
    return domNode.getAttribute("class");
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

  constructor(scroll, domNode) {
    super(scroll, domNode);  
  }

}

DynamicControl.blotName = 'dynamicControl'
DynamicControl.tagName = 'div';

export {DynamicControl};
