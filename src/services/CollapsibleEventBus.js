// Note: may be a cleaner way of doing this. WIP
// Emitting up multiple children, especailly through slots
// seems to be kind of a donwer in vue.

import Vue from 'vue';
const collapsibleEventBus = new Vue();

export {collapsibleEventBus};