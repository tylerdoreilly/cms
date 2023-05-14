<template>
    <div v-if="user">
      <div :class="[$style['user-control']]" v-popover.bottom="{ name: 'user' }" >
        <div :class="[$style['user-control__name']]" >{{ user.name }}</div>
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
      </div>
      <popover name="user" :width="250">
        <user-widget>
          <user-details :userDetails="user" />
          <exai-list>
            <exai-list-item-new>
              <logout-button />
            </exai-list-item-new>
          </exai-list>  
        </user-widget>         
      </popover>
    </div>
  </template>
  
<script>
    import LogoutButton from '@/components/user/LogoutButton';
    import UserWidget from '@/components/user/userWidget/UserWidget';
    import UserDetails from '@/components/user/userWidget/UserDetails';
    import ExaiList from '@/components/shared/ExaiComponents/ExaiList/ExaiList';
    import ExaiListItemNew from '@/components/shared/ExaiComponents/ExaiList/ExaiListItemNew';

    export default {
      name: 'logged-in-user',
      components: { 
        LogoutButton,
        ExaiList,
        ExaiListItemNew,
        UserWidget,
        UserDetails
      },
      data() {
        return {
          user: this.$auth.user,
        };
      },
      mounted () {
        console.log('user',this.$auth)
      }
    };
</script>

<style lang="scss" module>
  .user-control{
    @include flex(flex, row, $gap: 10px);
    color:$base-white;  
    font-weight:normal;
    font-size:14px;
    cursor:pointer;
  }

  .user-control__name {
    color:$base-white;  
  }
</style>

<style lang="scss">

  [data-popover='user'] {
    margin-left:-40px;
    left:auto !important;
    right:15px !important;
  }

  [data-popover='user']:before {
    border-left: 0px solid transparent !important;
    border-right: 0px solid transparent !important;
    border-bottom: 0px solid #fff !important;
  }

</style>