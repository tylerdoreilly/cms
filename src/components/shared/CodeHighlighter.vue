<template>
  <div class="code-viewer">
    <code :class="codeType"> {{ code }} </code>
  </div>
</template>

<script>
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
    name: 'code-highlighter',
    props: {
      codeType: String,
      code:[Object, Array, String]
    },
    mounted() {
      Prism.highlightAll();
    }
  }
</script>

<style lang="scss">
  .code-viewer{
    padding:12px;
    background:$gunmetal;
  }

  :not(pre) > code[class*="language-"], 
  pre[class*="language-"] {
    background:$gunmetal !important;
  }

  code[class*="language-"], 
  pre[class*="language-"] {
    text-shadow:none !important;
  }

  .token { 
      text-shadow: none !important;
  }
</style>
