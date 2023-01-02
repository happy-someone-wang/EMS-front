<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      :class="loginFormClass"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 :class="titleClass">账号激活</h3>
      </div>
      <el-form-item prop="email" class="input-box">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="Email"
          name="email"
          type="email"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="username" class="input-box">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password" class="input-box">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="3"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="confirmPassword" class="input-box">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="confirmPasswordType"
          ref="confirmPassword"
          v-model="loginForm.confirmPassword"
          :type="confirmPasswordType"
          placeholder="Confirm Password"
          name="confirmPassword"
          tabindex="3"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showConfirmPwd">
          <svg-icon
            :icon-class="
              confirmPasswordType === 'password' ? 'eye' : 'eye-open'
            "
          />
        </span>
      </el-form-item>

      <el-form-item prop="role">
        <div style="text-align: center">
          <el-radio-group v-model="loginForm.role">
            <el-radio label="student"></el-radio>
            <el-radio label="teacher"></el-radio>
          </el-radio-group>
        </div>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 25%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >前往登录</el-button
      >
      <el-button
        type="success"
        style="width: 25%; margin-left: 50%"
        @click.native.prevent="handleRegister"
        :loading="loading"
        >激活
      </el-button>

      <!-- <div class="tips">
          <span style="margin-right:20px;">username: admin</span>
          <span> password: any</span>
        </div> -->
    </el-form>
  </div>
</template>
  
<script>
import { validUsername } from "@/utils/validate";
import { call } from "body-parser";
import { activateAccount } from "@/api/student";
export default {
  name: "Login",
  data() {
    const validateEmail = (rule, value, callback) => {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!value) {
        callback(new Error("请输入邮箱"));
      }
      setTimeout(() => {
        if (value && !reg.test(value)) {
          callback(new Error("请输入正确的邮箱"));
        } else {
          callback();
        }
      }, 1000);
    };
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      var reg = /^[A-Za-z]+[0-9]+\S*/;
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 19 || !reg.test(value)) {
        callback(new Error("密码长度必须大于6小于20,由字母开头并且含有数字"));
      } else {
        if (this.loginForm.password !== "") {
          this.$refs.loginForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请重新输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次密码必须一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: "3155002905@qq.com",
        username: "2051196",
        password: "lyf123456",
        confirmPassword: "lyf123456",
        role: "",
      },
      loginRules: {
        email: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: validateEmail,
          },
        ],
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        confirmPassword: [
          {
            required: true,
            trigger: "blur",
            validator: validateConfirmPassword,
          },
        ],
        role: [{ required: true, trigger: "blur" }],
      },
      loading: false,
      passwordType: "password",
      confirmPasswordType: "password",
      redirect: undefined,
      titleClass: "title",
      loginFormClass: "login-form",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
        console.log(this.redirect);
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    showConfirmPwd() {
      if (this.confirmPasswordType === "password") {
        this.confirmPasswordType = "";
      } else {
        this.confirmPasswordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.confirmPassword.focus();
      });
    },
    handleLogin() {
      this.titleClass = "title-leave";
      setTimeout(() => {
        this.loginFormClass = "login-form-leave";
      }, 500);

      setTimeout(() => {
        this.$router.push("/login");
        this.loading = false;
      }, 1000);
    },
    handleRegister() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;

          activateAccount(this.loginForm)
            .then((res) => {
              console.log("注册", res);
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((err) => {
              console.log(err.response);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

  
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    animation: rotateInDownLeft;
    /* referring directly to the animation's @keyframe declaration */
    animation-duration: 1s;
    /* don't forget to set a duration! */
  }

  .login-form-leave {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    animation: rotateOutDownLeft;
    /* referring directly to the animation's @keyframe declaration */
    animation-duration: 1s;
    /* don't forget to set a duration! */
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
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
      animation: bounceInLeft;
      /* referring directly to the animation's @keyframe declaration */
      animation-duration: 1s;
      /* don't forget to set a duration! */
    }

    .title-leave {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      animation: bounceOutRight;
      /* referring directly to the animation's @keyframe declaration */
      animation-duration: 2s;
      /* don't forget to set a duration! */
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
  