<template>
  <el-dialog
    :title="$t('pub.name.reg')"
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
        prop="dci"
        label="DCI"        
        :rules="[{ required: true, message: this.$t('pub.no.empty')}]"
      >
        <el-input v-model="form.dci" :disabled="dciReadonly"></el-input>
      </el-form-item>

      <el-form-item
        prop="email"
        :label="$t('pub.name.email')"
        :rules="[{ required: true, message: this.$t('pub.no.empty')},
                {type: 'email', message: this.$t('pub.format.email')}]"
      >
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item
        prop="firstname"
        :label="$t('pub.name.firstname')"
        :rules="[{ required: true, message: this.$t('pub.no.empty')}]"
      >
        <el-input v-model="form.firstname"></el-input>
      </el-form-item>

      <el-form-item
        prop="lastname"
        :label="$t('pub.name.lastname')"
        :rules="[{ required: true, message: this.$t('pub.no.empty')}]"
      >
        <el-input v-model="form.lastname"></el-input>
      </el-form-item>          

      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="saveReg"
        >{{$t('pub.name.save')}}</el-button>
        <el-button @click="close">{{$t('pub.name.cancel')}}</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import * as regService from "@/api/app/prereg";
export default {
  name: "regEditForm",
  props: {
    reg: Object,
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        dci: '',
        firstname: '',
        lastname: '',
        email: ''
      },
      dciReadonly: false,
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
      if (this.reg.id) {
        this.dciReadonly = true;
        regService.getReg(this.reg.id).then(data => {
          let form = {};
          form.dci = data.dci;
          form.lastname = data.lastname;
          form.firstname = data.firstname;
          form.email = data.email;
          this.form = form;
        });
      } else {
        this.dciReadonly = false;
        this.form = {};
      }
    },
    saveReg() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          regService
            .saveReg({ ...this.form, id: this.reg.id })
            .then(data => {
              this.loading = false;
              this.dialogVisible = false;
              this.$emit("submit");
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

