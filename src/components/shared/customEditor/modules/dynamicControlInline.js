import Quill from "quill";
let Inline = Quill.import('blots/inline');

class DynamicControlInline extends Inline {
  static create (value) {
    console.log('value',value)
    let node = super.create()
    node.setAttribute('class', value.class);
    node.setAttribute('id', value.id);
    node.setAttribute('data-section', value.section);
    node.setAttribute('data-control', value.text);
    return node;

  }
  static formats(domNode) {
    // console.log(domNode)
    return domNode.getAttribute("class");
  }

  format(name, value) {
    console.log('blahtest',name, value)
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


DynamicControlInline.blotName = 'dynamicControlInline'
DynamicControlInline.tagName = 'span';

export {DynamicControlInline};