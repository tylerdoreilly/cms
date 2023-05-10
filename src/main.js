import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Plugins
import Popover from 'vue-js-popover';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
  faChevronRight,
  faChevronLeft,
  faCalendar,
  faComment,
  faFont,
  faP,
  faGripVertical,
  faFaceGrinWink,
  faGauge,
  faListCheck,
  faUserGroup,
  faArrowRightFromBracket,
  faAnglesLeft
} from '@fortawesome/free-solid-svg-icons';
import { authConfig } from '../auth_config.js';
import { Auth0Plugin } from '@/auth/auth0-plugin';

// Custom Plugin




// Toast Options
const options = {
    // You can set your default options here
};

/* Font Awesome library */
library.add(faUserSecret, 
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
  faChevronRight,
  faChevronLeft,
  faCalendar,
  faComment,
  faFont,
  faP,
  faGripVertical,
  faFaceGrinWink,
  faGauge,
  faListCheck,
  faUserGroup,
  faArrowRightFromBracket,
  faAnglesLeft
)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Toast, options);
Vue.use(Popover);
Vue.use(Auth0Plugin, {
  authConfig,
  redirectUri: authConfig.redirectUri,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
