<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px"></el-table-column>
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
        <el-table-column align="center" label="状态" width="80px">
          <template #default="scope"
            ><el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>{{
              scope.row.enable ? '启用' : '禁用'
            }}</el-button></template
          ></el-table-column
        >
        <el-table-column align="center" label="创建时间"
          ><template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template></el-table-column
        >
        <el-table-column align="center" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button text size="small" type="primary" icon="Edit">编辑</el-button>
            <el-button
              text
              size="small"
              type="danger"
              icon="Delete"
              @click="handleDeleteBtnClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format'

//自定义事件
const emit = defineEmits(['newClick'])
//页码相关逻辑
const currentPage = ref(1)
const pageSize = ref(10)

function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 发起请求
const systemStore = useSystemStore()
fetchUserListData()
// 获取数据展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

//定义网络请求函数
function fetchUserListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}
//暴露网络请求
defineExpose({ fetchUserListData })

//编辑删除操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}
//新建用户功能
function handleNewUserClick() {
  emit('newClick')
}
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
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
