<script setup>
// 表单校验（账号名+密码）

import { ref } from "vue";

import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user.js";
import { useAuthStore } from "@/stores/auth.js";

const userStore = useUserStore();

// 1. 准备表单对象
const form = ref({
  username: "",
  password: "",
  agree: true,
});

// 2. 准备规则对象
const rules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 14, message: "密码长度为6-14个字符", trigger: "blur" },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        console.log(value);
        // 自定义校验逻辑
        // 勾选就通过 不勾选就不通过
        if (value) {
          callback();
        } else {
          callback(new Error("请勾选协议"));
        }
      },
    },
  ],
};

// 3. 获取form实例做统一校验
const formRef = ref(null);
const router = useRouter();
const doLogin = () => {
  const { username, password } = form.value;
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表单都通过校验  才为true
    console.log(valid);
    // 以valid做为判断条件 如果通过校验才执行登录逻辑
    if (valid) {
      // TODO LOGIN
      await userStore.getUserInfo({ username, password });
      // 1. 提示用户
      ElMessage({ type: "success", message: "登录成功" });
      console.log(userStore);

      // 2. 跳转首页
      router.replace({ path: "/" });
    } else {
      ElMessage({ type: "error", message: "用户或者密码错误" });
      console.log(userStore);
    }
  });
};

// 4. 存储用户信息

// 1. 用户名和密码 只需要通过简单的配置（看文档的方式 - 复杂功能通过多个不同组件拆解）
// 2. 同意协议  自定义规则  validator:(rule,value,callback)=>{}
// 3. 统一校验  通过调用form实例的方法 validate -> true
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">CMDB</RouterLink>
        </h1>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="username-box">
          <div class="form">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="right"
              label-width="60px"
              status-icon
            >
              <!-- <el-form-item prop="username" label="请输入你的AD账户">
                <el-input v-model="form.username" />
              </el-form-item> -->
              <el-form
                ref="formRef"
                :model="form"
                :rules="rules"
                label-width="120px"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input
                    v-model="form.username"
                    placeholder="请输入用户名"
                    type="text"
                  ></el-input>
                </el-form-item>
              </el-form>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" type="password" />
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin"
                >点击登录</el-button
              >
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>CopyRight &copy; 鸡肉丝</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px /
        contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url("@/assets/images/backgroup.jpg") no-repeat center / cover;
  height: 700px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 60px 0 100px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.username-box {
  .toggle {
    background-color: #f8f8f8; /* 添加背景色 */
    border-bottom: 1px solid #ccc; /* 添加底部边框 */

    a {
      display: inline-block; /* 修改链接为按钮样式 */
      padding: 10px 20px;
      background-color: #4caf50; /* 添加按钮背景色 */
      color: #fff;
      border-radius: 5px;
      transition: background-color 0.3s ease; /* 添加过渡效果 */

      &:hover {
        background-color: #45a049; /* 悬停时颜色变化 */
      }
    }
  }

  .form {
    border: 1px solid #ccc; /* 添加边框 */
    border-radius: 5px; /* 添加圆角 */
    padding: 20px;

    &-item {
      margin-bottom: 20px;

      .input {
        position: relative;
        border: 1px solid #ccc; /* 修改输入框边框样式 */
        border-radius: 3px; /* 添加圆角 */
        background-color: #f8f8f8; /* 添加背景色 */
        padding: 10px;
        transition: border-color 0.3s ease; /* 添加过渡效果 */

        &:focus {
          border-color: #4caf50; /* 获取焦点时边框颜色变化 */
        }

        input {
          border: none;
          background: transparent; /* 使输入框透明 */
          width: 100%;
          outline: none; /* 去除输入框聚焦时的默认样式 */

          &.error {
            border-color: #ff0000; /* 修改错误状态的边框颜色 */
          }
        }
      }

      > .error {
        color: #ff0000; /* 修改错误提示文字颜色 */
      }
    }

    .btn {
      width: 100%;
      padding: 10px;
      background-color: #4caf50; /* 修改按钮背景色 */
      color: #fff;
      border: none;
      border-radius: 3px; /* 添加圆角 */
      cursor: pointer;
      transition: background-color 0.3s ease; /* 添加过渡效果 */

      &:hover {
        background-color: #45a049; /* 悬停时颜色变化 */
      }
    }
  }

  .action {
    padding: 10px 20px;
    background-color: #f8f8f8; /* 添加背景色 */
    border-top: 1px solid #ccc; /* 添加顶部边框 */
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
