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
import { localCache } from '@/utils/cache'
//定义catch常量
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
// 定义数据
const account: IAccount = reactive({
  name: localCache.getCatch(CACHE_NAME) ?? '',
  password: localCache.getCatch(CACHE_PASSWORD) ?? '',
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
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((validate) => {
    if (validate) {
      const name = account.name
      const password = account.password

      //登录逻辑
      loginStore.loginAccountAction({ name, password }).then(() => {
        //是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
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
