<template>
  <div class="json-viewer">
    <pre>{{ content | pretty(4) }}</pre>
  </div>
</template>

<script>

export default {
  
  name: 'JsonViewer',
  components: {

  },
  props: {
    data: Object,
  },
  data() {
      return {
        content: this.data,
      }
  },
  filters: {
    pretty: (val, indent = 2) => {
      if (typeof val === "string") {
        val = JSON.parse(val)
      }
      return JSON.stringify(val, null, indent)
    }
  },
}
</script>

<style lang="scss">
 .json-viewer{
    background:$white-smoke;
    padding:15px;
    overflow-y:auto;
    overflow-wrap: break-word;
 }
 .json-viewer pre{
  width:500px;
 }
</style>
