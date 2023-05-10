<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">YP管理系统</h2>
    </div>
    <!-- 菜单 -->
    <el-menu
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
      :collapse="isFold"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="String(item.id)">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="String(subitem.id)">{{ subitem.name }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import useLoginStore from '@/stores/login/login'

//定义props接受属性
defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
})
// 获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenu
</script>
<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}
.el-menu {
  border-right: none;
}
.el-menu-item {
  background-color: rgba(12, 33, 53, 0.8);
  span {
    margin-left: 20px;
  }
}
.el-menu-item:hover {
  color: white !important;
}
.el-menu-item.is-active {
  background-color: rgba(10, 96, 189, 0.5) !important;
  color: white;
}
.el-sub-menu__title {
  background-color: #001529;
}

.el-meun-vertical:not(.el-meun--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
