<template>
  <div class="panel-phone">
    <el-form :model="account" label-width="60px" size="large" :rules="accountRules">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import type { FormRules } from 'element-plus'
// 定义数据
const account = reactive({
  name: '',
  password: '',
})
// 定义规则
const accountRules: FormRules = {
  name: [
    {
      required: true,
      message: '内容不能为空~',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须由6~20位数字或字母组成~',
      trigger: 'blur',
    },
  ],
  password: [{ required: true, message: '内容不能为空~', trigger: 'blur' }],
}

//登录逻辑
function loginAction() {
  console.log(11)
}
defineExpose({
  loginAction,
})
</script>
<style lang="less" scoped>
.panel-phone {
  color: red;
}
</style>
