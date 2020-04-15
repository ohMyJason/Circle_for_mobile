<template>
  <div id="app">
    <!--<transition name="transitionRouter">-->
    <router-view/>
    <!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /*.transitionRouter-enter-active,*/
  /*.transitionRouter-leave-active {*/
    /*transition: all 0.4s;*/
  /*}*/

  /*.transitionRouter-enter,*/
  /*.transitionRouter-leave{*/
    /*transform: translate3d(100%, 0, 0);*/
  /*}*/

  .setting-cell{
    margin: 0 0 0 0;
  }
  .cell-interval{
    padding: 0.1rem 0 0.1rem 0.14rem;text-align: left;
  }
  .cell-interval span{
    font-size: 0.13rem;color: #7e8c8d
  }

</style>
