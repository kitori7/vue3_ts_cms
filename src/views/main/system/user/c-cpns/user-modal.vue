<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实性名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-input v-model="formData.roleId" placeholder="请选择角色"></el-input>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-input v-model="formData.departmentId" placeholder="请选择部门"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span><el-button>取消</el-button><el-button type="primary">确定</el-button></span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const dialogVisible = ref(true)

const formData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: 0,
  departmentId: 0,
})
function setModalVisible() {
  dialogVisible.value = true
}
defineExpose({ setModalVisible })
</script>
<style lang="less" scoped>
.modal {
  .form {
    padding: 0 20px;
  }
}
</style>
