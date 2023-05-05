<template>
  <div class="main">
    <el-container>
      <el-aside width="210px">
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <main-header></main-header>
        </el-header>
        <el-main>MAIN</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
</script>
<style lang="less" scoped>
.main {
  color: red;
  height: 100%;
}
.el-container {
  height: 100%;
}
</style>
