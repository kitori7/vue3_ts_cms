<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuClick">
      <el-icon>
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <HeaderCrumb></HeaderCrumb>
      </div>
      <Header-info />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'
// 自定义事件
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
function handleMenuClick() {
  //内部状态
  isFold.value = !isFold.value
  // 传递事件
  emit('foldChange', isFold.value)
}
</script>
<style lang="less" scoped>
.main-header {
  display: flex;
  width: 100%;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    cursor: pointer;
    align-items: center;
    display: flex;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0 20px;
    align-items: center;
  }
}
</style>
