<template>
  <div id="app">
    <div class="login">
      <div class="logo">
        <img src="./assets/img/d-login.png" alt="">
        <span>Login</span>
      </div>
      <div class="login-input">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="" prop="username">
            <el-input v-model="ruleForm.username" clearable placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="Password" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">
              <loading v-if="load"></loading>
              <span v-else>Login</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import loading from './components/loading'
import { AccountLogin } from './api/login'
export default {
  components: { loading },
  data () {
    let checkUsername = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        return callback(new Error('Username is required'))
      }
      callback()
    }
    let validatePass = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        return callback(new Error('Password is required'))
      }
      callback()
    }
    return {
      load: false,
      ruleForm: {
        password: '',
        username: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.load = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AccountLogin({
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }).then(({ data }) => {
            this.load = false
            this.$message({
              message: 'Authentication is successful, the browser window will close automatically after 5 seconds.',
              type: 'success',
              duration: 5 * 1000
            })
            setTimeout(() => {
              window.close()
            }, 5000)
          }).catch(() => {
            this.load = false
          })
        } else {
          this.load = false
          this.$message({
            message: 'Error Submit!!',
            type: 'error',
            duration: 5 * 1000
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang='scss'>
  .login {
    width: 100%;
    height: 100%;
    background: rgb(48, 49, 62);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    .logo {
      color: rgb(3, 174, 189);
      font-size: 30px;
      // font-style: italic;
      font-weight: bold;
      margin-bottom: 20px;
      img {
        width: 74px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .login-input {
      width: 290px;
      padding: 10px;
      margin-top: 10px;
      .el-input {
        // margin-bottom: 20px;
        .el-input__inner {
          border-radius: 30px !important;
          text-align: center;
        }
      }
      .el-button {
        border-radius: 30px !important;
        width: 270px;
        background: rgb(3, 174, 189);
        color: #fff;
        border: 0;
      }
      .register {
        text-align: right;
        margin: 10px;
        a {
          color: #fff
        }
      }

    }
  }
</style>
