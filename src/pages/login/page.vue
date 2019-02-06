<template>
  <div class="login-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/logo.png" alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <div class="title">Pandaevents Pre-registration</div>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
            <el-form-item prop="username">
              <el-input type="text" v-model="formLogin.username" :placeholder="$t('pub.username')">
                <i slot="prepend" class="fa fa-user-circle-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" @keyup.enter.native="submit" :placeholder="$t('pub.password')">
                <i slot="prepend" class="fa fa-keyboard-o"></i>
              </el-input>
            </el-form-item>
            <el-button-group>
              <el-button size="default" @click="submit" type="primary"> {{$t('pub.login')}}</el-button>
            </el-button-group>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-dialog title="快速选择用户" :visible.sync="dialogVisible" width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="user-btn" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o" />
            <span>{{user.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
require("particles.js");
import config from "./config/default";
import { mapActions } from "vuex";
import * as sysService from "@/api/sys/sys";
export default {
  data() {
    return {
      // 快速选择用户
      dialogVisible: false,
      users: [
        {
          name: "",
          username: "",
          password: ""
        }
      ],
      // 表单
      formLogin: {
        username: "",
        password: ""
      },
      // 校验
      rules: {
        username: [
          { required: true, message: this.$t('pub.need.username'), trigger: "blur" }
        ],
        password: [{ required: true, message: this.$t('pub.need.password'), trigger: "blur" }]
      }
    };
  },
  mounted() {
    // 初始化例子插件
    particlesJS("login", config);
  },
  beforeDestroy() {
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  },
  methods: {
    ...mapActions("d2admin/account", ["login"]),
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.username = user.username;
      this.formLogin.password = user.password;
      this.submit();
    },
    /**
     * @description 提交表单
     */
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login({
            vm: this,
            username: this.formLogin.username,
            password: this.formLogin.password
          });
        } else {
          this.$message.error(this.$t('pub.err.formvalid'));
        }
      });
    },
    resetDb() {
      sysService.resetDb();
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
