import Quill from "quill";
let Inline = Quill.import('blots/inline');

export class Icon extends Inline {
  static create(value) {
    let node = super.create(value);
    if (value) {
      console.log(value)
      node.setAttribute('class', value);
    }
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
    }
  }
}
Icon.blotName = 'icon';
Icon.tagName = 'span';
Quill.register(Icon);

var BackgroundClass = Quill.import('attributors/class/background');
var ColorClass = Quill.import('attributors/class/color');
var SizeStyle = Quill.import('attributors/style/size');
Quill.register(BackgroundClass, true);
Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);


var quill = new Quill('#editor-container', {
  modules: {
    toolbar: '#toolbar-container'
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'
});


var customButton = document.querySelector('#custom-button');
customButton.addEventListener('click', function() {
  quill.insertText(quill.getSelection().index, "★\n", 'icon', 'fa fa-icon fa-icon-green');
});