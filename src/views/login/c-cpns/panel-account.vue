<template>
  <div class="panel-phone">
    <el-form :model="account" label-width="60px" size="large" :rules="accountRules" ref="formRef">
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
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import type { IAccount } from '@/types'
// 定义数据
const account: IAccount = reactive({
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
//表单ref
const formRef = ref<InstanceType<typeof ElForm>>()
//登录逻辑
const loginStore = useLoginStore()
function loginAction() {
  formRef.value?.validate((validate) => {
    if (validate) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('请输入正确的内容~')
    }
  })
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
