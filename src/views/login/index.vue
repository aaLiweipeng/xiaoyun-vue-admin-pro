<template>
    <div class="login-container">

        <el-form
          class="login-form"
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules">

            <div class="title-container">
                <h3 class="title">用户登录</h3>
            </div>

            <!-- username -->
            <el-form-item prop="username">
                <!-- 图标 -->
                <span class="svg-container">
                    <!-- <el-icon>
                        <avatar />
                    </el-icon> -->
                    <svg-icon icon="user"></svg-icon>
                </span>
                <!-- 输入框 -->
                <el-input
                  placeholder="username"
                  name="username"
                  type="text"
                  v-model="loginForm.username"
                ></el-input>
            </el-form-item>

            <!-- password -->
            <el-form-item prop="password">
                <!-- 图标 -->
                <span class="svg-container">
                    <!-- <el-icon>
                        <avatar />
                    </el-icon> -->

                    <!-- 使用外部的svg -->
                    <!-- <svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon> -->

                    <svg-icon icon="password"></svg-icon>
                </span>
                <!-- 输入框 -->
                <el-input
                  placeholder="password"
                  name="password"
                  :type="passwordType"
                  v-model="loginForm.password"
                ></el-input>

                <span class="show-pwd">
                    <!-- <el-icon>
                        <avatar />
                    </el-icon> -->

                    <span class="svg-container" @click="onChangePwdType">
                        <svg-icon
                          :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
                        ></svg-icon>
                    </span>
                </span>
            </el-form-item>

            <!-- 登录按钮 -->
            <el-button
              type="primary"
              style="width: 100%; margin-bottom"
              :loading="loading"
              @click="handleLogin"
            >登录</el-button>
        </el-form>
    </div>
</template>

<script setup>
// 导入的组件可以直接使用
// import { Avatar } from '@element-plus/icons'
// SvgIcon 已经全局导入了，这里可以注释了
// import SvgIcon from '../../../src/components/SvgIcon/index.vue'
import { ref, reactive } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'

// 数据源
const loginForm = reactive({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

// 处理密码框文本显示状态
// inputType绑定它，图标点击修改它，进而修改inputType
const passwordType = ref('password')
// 注意ref数据在 这里的script中使用时，需要.value
// 而在template中则不需要，直接写字段即可
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

//
// 登录动作处理
const loading = ref(false)
const store = useStore()

// Vue3的话，
// 这里初始化为空之后，代码会去template中找，看看有没有loginFromRef，
// 有的话则把对应的标签化为实例，存到这里
// Vue2获取refs this.$refs.loginFormRef
const loginFormRef = ref(null)

/**
 * 登录按钮的触发回调
 */
const handleLogin = () => {
  /**
   * 1.进行表单校验；
   * 2.触发登录动作；
   * 3.进行登录后处理;
   */
  console.log('loginFormRef.value = ', loginFormRef.value)
  loginFormRef.value.validate(valid => {
    // 校验不通过，直接退出
    if (!valid) return

    // 2.触发登录动作；
    loading.value = true
    store
      .dispatch('user/login', loginForm)
      .then((data) => {
        loading.value = false
        console.log('登录接口访问成功/n', data)
        // TODO: 3.登录后操作
      })
      .catch(err => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$cursor:#fff;

.login-container{
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form{
        position: relative;
        width: 520px;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;

        ::v-deep .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        ::v-deep .el-input{
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                height: 47px;
                background: transparent;
                border: none;
                border-radius: 0px;
                padding: 12px 5px 15px;
                color: $light_gray;
                caret-color: $cursor;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;//鼠标置上边手指
        user-select: none;
    }

}
</style>
