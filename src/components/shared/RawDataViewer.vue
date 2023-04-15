<template>
  <div class="raw-data-viewer">
    <div class="raw-data-viewer__header"  @click="toggleData = !toggleData">
      <font-awesome-icon icon="fa-solid fa-user-secret" />
        Raw Data
    </div>
    <div class="raw-data-viewer__content" v-show="toggleData">
      <exai-tags>
        <exai-tag label="Name" :item="content.name"></exai-tag>
        <exai-tag label="Field" :item="content.field"></exai-tag>
        <exai-tag label="Id" :item="content.id"></exai-tag>
        <exai-tag label="Position" :item="content.position"></exai-tag>
      </exai-tags>

      <div class="raw-html-viewer">
        <code class="language-html"> {{ content.content }} </code>
      </div>
    </div>
  </div>
</template>

<script>
import ExaiTags from './ExaiTags.vue'
import ExaiTag from './ExaiTag.vue'
import Prism from "prismjs";
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-liquid'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-scss'

export default {
  
  name: 'raw-data-viewer',
  components: {
    ExaiTag,
    ExaiTags,
  },
  props: {
    data: Object,
  },
  data() {
      return {
        content: this.data,
        toggleData:true,
      }
  },
  mounted() {
    Prism.highlightAll();
  }
}
</script>

<style lang="scss">
 .raw-data-viewer{
    background:$white-smoke;
    padding:15px;
    overflow-y:auto;
    display:flex;
    flex-direction: column;
    gap:15px;
 }
.raw-data-viewer__header{
  display:flex;
  flex-direction: row;
  align-items:center;
  gap:10px;
  cursor:pointer;
}

.raw-data-viewer__content{
  display:flex;
  flex-direction: column;
  gap:15px;
}
.raw-html-viewer{
  padding:12px;
  background:$gunmetal;
}

:not(pre) > code[class*="language-"], pre[class*="language-"] {
  background:$gunmetal !important;
}
code[class*="language-"], pre[class*="language-"] {
 text-shadow:none !important;

}
.token { 
    text-shadow: none !important;
}
// .raw-data-viewer__content ul{
//   display:flex;
//   flex-direction:column;
//   flex: 0 0  12em;
//   width:400px;
//  }

//  .raw-data-viewer__content div{

//   flex: 1;

//  }

</style>
