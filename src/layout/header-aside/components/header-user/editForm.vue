<template>
  <el-dialog
    :title="$t('pub.name.resetpwd')"
    :visible.sync="dialogVisible"
    @opened="dialogOpen"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
    >
      <el-form-item
        prop="oldpassword"
        :label="$t('pub.name.oldpassword')"        
        :rules="[{ required: true, message: this.$t('pub.no.empty')}]"
      >
        <el-input type="password" v-model="form.oldpassword"></el-input>
      </el-form-item>

      <el-form-item
        prop="newpassword"
        :label="$t('pub.name.newpassword')"        
        :rules="[{ required: true, message: this.$t('pub.no.empty')}]"
      >
        <el-input type="password" v-model="form.newpassword"></el-input>
      </el-form-item>

      <el-form-item
        prop="repeatpassword"
        :label="$t('pub.name.repeatpassword')"        
        :rules="[{ required: true, message: this.$t('pub.no.empty')}]"
      >
        <el-input type="password" v-model="form.repeatpassword"></el-input>
      </el-form-item>        

      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="changePassword"
        >{{$t('pub.name.save')}}</el-button>
        <el-button @click="close">{{$t('pub.name.cancel')}}</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import * as userService from "@/api/sys/user";
var md5 = require('js-md5')
export default {
  name: "changePasswordForm",
  props: {
    reg: Object,
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        oldpassword: '',
        newpassword: '',
        repeatpassword: '',
      },
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    dialogOpen() {
      this.$refs.form.resetFields();
      this.form = {};
    },
    changePassword() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.newpassword !== this.form.repeatpassword) {
            this.$message.warning(this.$t('pub.err.diffPwd'))
            return false;
          }
          let param = {
            oldpassword: md5('pandaevents' + this.form.oldpassword),
            newpassword: md5('pandaevents' + this.form.newpassword),
          }
          this.loading = true;
          userService
            .changePassword(param)
            .then(data => {
              this.loading = false;
              this.dialogVisible = false;
              this.$emit("submit");
              this.$message.success('Success')
            })
            .catch(err => {
              this.loading = false;              
            });
        } else {
          return false;
        }
      });
    },
    close() {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
    }
  }
};
</script>

