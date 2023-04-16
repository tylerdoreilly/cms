<template>
  <div :class="[$style['template-item-details']]">
    <exai-tags>
      <exai-tag variation="primary" label="Name" :item="content.name"></exai-tag>
      <exai-tag variation="primary" label="Field" :item="content.field"></exai-tag>
      <exai-tag variation="primary" label="Id" :item="content.id"></exai-tag>
      <exai-tag variation="primary" label="Position" :item="content.position"></exai-tag>
    </exai-tags>

    <code-highlighter codeType="language-html" :code="content.content"></code-highlighter>
  </div>
</template>

<script>
  import ExaiTags from '../shared/exaiTags/ExaiTags.vue'
  import ExaiTag from '../shared/exaiTags/ExaiTag.vue'
  import CodeHighlighter from '../shared/CodeHighlighter.vue'

  export default {    
    name: 'template-item-details',
    components: {
      ExaiTag,
      ExaiTags,
      CodeHighlighter
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
  }
</script>

<style lang="scss" module>
  .template-item-details{
    @include flex(flex, column, $gap: 15px);
  }

</style>
