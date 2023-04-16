import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Popover from 'vue-js-popover'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
};



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { 
  faUserSecret, 
  faGear, 
  faGripLines, 
  faHeader, 
  faHeading, 
  faParagraph, 
  faList, 
  faEllipsis, 
  faLock, 
  faXmark, 
  faPencil, 
  faLayerGroup, 
  faArrowDown, 
  faArrowRight,
  faChevronDown,
  faChevronRight } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faGear, faGripLines, faHeader, faHeading, faParagraph, faList, faEllipsis,faLock,faXmark,faPencil,faLayerGroup, faArrowDown,faArrowRight, faChevronDown,faChevronRight)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Toast, options);
Vue.use(Popover);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
