// import Quill from "quill";

// class table {
 
//   static create (value) {
//     console.log('value',value)
//     let node = super.create()
//     node.setAttribute('class', value.class);
//     node.setAttribute('id', value.id);
//     node.setAttribute('data-section', value.section);
//     node.setAttribute('data-control', value.text);
//     return node;

//   }
//   static formats(domNode) {
//     console.log(domNode)
//     return domNode.getAttribute("class");
//   }

//   format(name, value) {
//     console.log('blahtest',name, value)
//     if (name !== this.statics.blotName || !value) return super.format(name, value);
//     if (value){
//       this.domNode.setAttribute('class', value.class);
//       this.domNode.setAttribute('id', value.id);
//       this.domNode.setAttribute('data-section', value.section);
//       this.domNode.setAttribute('data-control', value.text);
//     }
//   }

//   constructor(scroll, domNode) {
//     super(scroll, domNode);
//     const table = snow.getModule('table');
    
//   }

  
// }


// DynamicControl.blotName = 'dynamicControl'
// // CustomBlot.className = 'customTagName'
// DynamicControl.tagName = 'div';

// export {table};
// var bubble = new Quill('#bubble-container', {
//   theme: 'bubble',
//   modules: {
//     table: true,
//   }
// });
// var snow = new Quill('#snow-container', {
//   theme: 'snow',
//   modules: {
//     table: true,
//   }
// });
// var output = new Quill('#output-container', {
//   theme: 'bubble',
//   modules: { table: true },
//   readOnly: true,
// })
// bubble.on('text-change', function(delta, old, source) {
//   if (source === 'user') {
//     snow.updateContents(delta, 'api');
//     updateOutput();
//   }
// });
// const table = snow.getModule('table');
// snow.on('text-change', function(delta, old, source) {
//   if (source === 'user') {
//     bubble.updateContents(delta, 'api');
//     updateOutput();
//   }
// });

// function updateOutput() {
//   const bubbleContent = bubble.getContents();
//   const snowContent = snow.getContents();
//   // TODO compare
//   output.setContents(bubbleContent);
//   const outputContent = output.getContents();
//   // TODO compare outputContent
// }


// document.querySelector('#insert-table').addEventListener('click', function() {
//   table.insertTable(2, 2);
// });
// document.querySelector('#insert-row-above').addEventListener('click', function() {
//   table.insertRowAbove();
// });
// document.querySelector('#insert-row-below').addEventListener('click', function() {
//   table.insertRowBelow();
// });
// document.querySelector('#insert-column-left').addEventListener('click', function() {
//   table.insertColumnLeft();
// });
// document.querySelector('#insert-column-right').addEventListener('click', function() {
//   table.insertColumnRight();
// });
// document.querySelector('#delete-row').addEventListener('click', function() {
//   table.deleteRow();
// });
// document.querySelector('#delete-column').addEventListener('click', function() {
//   table.deleteColumn();
// });
// document.querySelector('#delete-table').addEventListener('click', function() {
//   table.deleteTable();
// });