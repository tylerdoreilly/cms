const MyPlugin = {
    install(Vue) {
      Vue.mixin({
        mounted() {
          console.log('Mounted!');
        }
      });
    }
  };
  
export default MyPlugin;