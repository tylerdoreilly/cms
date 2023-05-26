import Vue from 'vue'

import ExaiButton from './ExaiButton.vue';
import ExaiPrompt from './ExaiPrompt.vue';
import ExaiModal from './ExaiModal.vue';
import ExaiLoader from './ExaiLoader.vue';
import ExaiSearch from './ExaiSearch.vue';
import { ExaiTabs, ExaiTab } from './ExaiTabs/index.js';
import { ExaiTags, ExaiTag } from './ExaiTags/index.js';
import { ExaiButtonGroup, ExaiButtonGroupItem } from './ExaiButtonGroup/index.js';
import { ExaiDescriptionList, ExaiDescriptionListGroup, ExaiDescriptionTerm, ExaiDescriptionDetails } from './ExaiDescriptionList/index.js';
import { ExaiTableContainer, ExaiTableControls } from './ExaiTable/index.js';
import { ExaiList, ExaiListItem, ExaiListItemNew } from './ExaiList/index.js';

export { 
    ExaiButton,
    ExaiLoader,
    ExaiModal,
    ExaiPrompt,
    ExaiTabs, ExaiTab,
    ExaiTags, ExaiTag,
    ExaiSearch
 }

// Buttons
Vue.component('exai-button', ExaiButton);
Vue.component('exai-button-group', ExaiButtonGroup);
Vue.component('exai-button-group-item', ExaiButtonGroupItem);

// Description List
Vue.component('exai-dl', ExaiDescriptionList);
Vue.component('exai-dl-group', ExaiDescriptionListGroup);
Vue.component('exai-dt', ExaiDescriptionTerm);
Vue.component('exai-dd', ExaiDescriptionDetails);

// List
Vue.component('exai-list', ExaiList);
Vue.component('exai-list-item', ExaiListItem);
Vue.component('exai-list-item-new', ExaiListItemNew);

// Other
Vue.component('exai-loader', ExaiLoader);
Vue.component('exai-modal', ExaiModal);
Vue.component('exai-prompt', ExaiPrompt);
Vue.component('exai-search', ExaiSearch);

// Table
Vue.component('exai-table-container', ExaiTableContainer);
Vue.component('exai-table-controls', ExaiTableControls);

// Tabs
Vue.component('exai-tabs', ExaiTabs);
Vue.component('exai-tab', ExaiTab);

// Tags
Vue.component('exai-tags', ExaiTags);
Vue.component('exai-tag', ExaiTag);

