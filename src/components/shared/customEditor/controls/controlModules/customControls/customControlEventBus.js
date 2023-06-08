// Note: 
// There might be a better way to call the vue model 
// from the ckEditor plugin but haven't found it yet.

import Vue from 'vue';
const customControlEventBus = new Vue();
console.log(customControlEventBus)
export {customControlEventBus};