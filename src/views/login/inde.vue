<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left"></div>
      <div class="login-form">
        <div class="login-title">
          <img class="icon" src="@/assets/logo.png" alt="logo" />
          <h2 class="title">Vue-Admin</h2>
        </div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="0"
        >
          <el-form-item label="" prop="username">
            <el-input
              placeholder="请输入用户名"
              autoComplete="on"
              style="position: relative"
              v-model="ruleForm.username"
              @keyup.enter="submitForm"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><UserFilled /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              placeholder="请输入密码"
              autoComplete="on"
              @keyup.enter="submitForm"
              v-model="ruleForm.password"
              :type="passwordType"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><GoodsFilled /></el-icon>
              </template>
              <template #suffix>
                <div class="show-pwd" @click="showPwd">
                  <svg-icon
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              @click="submitForm"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store/modules/user';

const ruleFormRef = ref<FormInstance>();
const router = useRouter();

const userStore = useUserStore();

const passwordType = ref('password');
const loading = ref(false);
const rules = reactive({
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
});
// 表单数据
const ruleForm = reactive({
  username: 'vueadmin',
  password: '123456',
});

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = '';
  } else {
    passwordType.value = 'password';
  }
};
const submitForm = () => {
  loading.value = true;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 登录
      setTimeout(async () => {
        //登陆并写入到 userStore
        userStore.login(ruleForm);
        router.push({
          path: '/',
        });
        ElNotification({
          message: '欢迎登录 Vue Sys',
          type: 'success',
          duration: 3000,
        });
        loading.value = true;
      }, 1000);
    } else {
      console.log('error submit!');
      loading.value = false;
      //return false;
    }
  });
};
</script>

<style lang="scss">
$dark_gray: #889aa4;
.login-box {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 620px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-left {
    width: 50%;
    img {
      width: 100%;
      max-width: 900px;
      min-height: 1024px;
    }
  }
  .login-form {
    max-width: 480px;
    width: 50%;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
  }
  .login-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .title {
      margin: 0;
      font-size: 30px;
      white-space: nowrap;
    }
    .icon {
      width: 60px;
    }
  }
  ::v-deep(.el-input__inner) {
    height: 40px;
  }
}
.login-btn {
  margin-top: 20px;
  width: 100%;
  height: 47px;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
  ::v-deep(.svg-icon) {
    vertical-align: 0;
  }
}
.login-container {
  background-color: #f0f2f5;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 25px;
  box-sizing: border-box;
}
.login-dark {
  position: absolute;
  right: 20px;
  top: 20px;
}

@media (max-width: 850px) {
  .login-container {
    padding: 10px;
  }
  .login-box {
    .login-form {
      width: 88%;
      .title {
        font-size: 20px;
      }
    }
  }
  .login-left {
    display: none;
  }
}
</style>
