import Quill from "quill";
const Block = Quill.import('blots/block');

export class CustomBlot extends Block {
  static create (value) {
    console.log('value',value)
    let node = super.create()
    node.setAttribute('class', value);
    node.setAttribute('id', 'dynamic-rule');
    return node;

  }
  static formats(domNode) {
    console.log(domNode)
    return domNode.getAttribute("class");
  }

    format(name, value) {
      console.log(name, value)
      if (name !== this.statics.blotName || !value) return super.format(name, value);
      if (value){
        this.domNode.setAttribute('class', value);
        this.domNode.setAttribute('id', 'dynamic-rule');
      }
    }
}
CustomBlot.blotName = 'customTagName'
CustomBlot.className = 'customTagName'
CustomBlot.tagName = 'div';