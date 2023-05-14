<template>
  <div :class="[$style['html-viewer']]">
    <code-highlighter codeType="language-html" :code="content"></code-highlighter>
  </div>
</template>

<script>
  import CodeHighlighter from '@/components/shared/CodeHighlighter.vue'

  export default {    
    name: 'html-viewer',
    components: {
      CodeHighlighter
    },
    props: {
      data: String,
    },
    data() {
        return {
          content: this.data,
        }
    },
  }
</script>

<style lang="scss" module>
  .html-viewer{
    @include flex(flex, column, $gap: 15px);
  }

</style>
