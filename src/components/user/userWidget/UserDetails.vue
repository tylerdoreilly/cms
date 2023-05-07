<template>
  <div :class="[$style['user-details']]">
    <div :class="[$style['user-details__avatar']]">
      <avatar :src="userDetails.picture" :size=40></avatar>
    </div>
    <div :class="[$style['user-details__info']]">
      <div :class="[$style['user-name']]">{{ userDetails.name }}</div> 
      <div :class="[$style['user-details__email']]">{{ userDetails.email }}</div> 
    </div>
  </div>  
</template>
  
<script>
  import Avatar from "vue-avatar";

  export default {
    name: 'user-details',
    components: { 
      Avatar,
    },
    props: {
      userDetails: {
        type:[Object, Array]
      }
    },
  };
</script>

<style lang="scss" module>
  .user-details{
    @include flex(flex, row, $gap: 10px);
    margin-bottom:15px;
  }

  .user-details__info{
    @include flex(flex, column, $gap: 5px);
  }

  .user-details__email{
    font-size:13px;
  }

</style>