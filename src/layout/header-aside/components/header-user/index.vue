<template>
  <div>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{$t('pub.pageHeader.hello')}} {{info.name}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5" /> {{$t('pub.name.logout')}}
      </el-dropdown-item>
      <el-dropdown-item @click.native="resetPwd">
        <i class="el-icon-refresh"></i> {{$t('pub.name.resetpwd')}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

  <edit-form v-model="dialogVisible"/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as sysService from "@/api/sys/sys";
import editForm from "./editForm";
export default {  
  data () {
    return {
      reg: {},
      dialogVisible: false
    }
  },
  components: { editForm },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  methods: {
    ...mapActions("d2admin/account", ["logout"]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        vm: this,
        confirm: true
      });
    },
    resetPwd() {
      this.dialogVisible = true;
    }
  }
};
</script>
