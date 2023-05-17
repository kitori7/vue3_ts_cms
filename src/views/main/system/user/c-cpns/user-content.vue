<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px"></el-table-column>
        <el-table-column align="center" label="序号" type="index" width="50px"></el-table-column>
        <el-table-column align="center" label="用户名" prop="name" width="150px"></el-table-column>
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="180px"
        ></el-table-column>
        <el-table-column align="center" label="状态" prop="enable" width="80px"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt"></el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt"></el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <el-button text size="small" type="primary" icon="Edit">编辑</el-button>
          <el-button text size="small" type="danger" icon="Delete">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system/system'

// 发起请求
const systemStore = useSystemStore()
systemStore.postUsersListAction()
// 获取数据展示
const { usersList } = storeToRefs(systemStore)
</script>
<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  margin-bottom: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  .title {
    font-size: 22px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
</style>
