<template>
  <div class="login">
    <loginPanel></loginPanel>
  </div>
</template>
<script lang="ts" setup>
import loginPanel from './c-cpns/login-panel.vue'
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/img/login-bg.svg');
}
</style>
