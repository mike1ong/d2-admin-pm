<template>
  <d2-container>
    <template slot="header">
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        size="mini"
        style="margin-bottom: -18px;"
      >
        <el-form-item label="DCI" prop="dci">
          <el-input v-model="searchForm.dci" placeholder="DCI" style="width: 100px;"/>
        </el-form-item>

        <el-form-item :label="$t('pub.name.name')" prop="name">
          <el-input v-model="searchForm.name" :placeholder="$t('pub.name.name')" style="width: 100px;"/>
        </el-form-item>

        <el-form-item :label="$t('pub.name.email')" prop="email">
          <el-input v-model="searchForm.email" :placeholder="$t('pub.name.email')" style="width: 120px;"/>
        </el-form-item>

        <el-form-item :label="$t('pub.name.orderno')" prop="orderno">
          <el-input v-model="searchForm.orderno" :placeholder="$t('pub.name.orderno')" style="width: 100px;"/>
        </el-form-item>

        <el-form-item v-permission="['p_prereg_adv']" :label="$t('pub.name.creator')" prop="creator">
          <el-input v-model="searchForm.creator" :placeholder="$t('pub.name.creator')" style="width: 100px;"/>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSearchFormSubmit">
            <d2-icon name="search"/>{{$t('pub.name.query')}}
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleSearchFormReset">
            <d2-icon name="refresh"/>{{$t('pub.name.reset')}}
          </el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="add">{{$t('pub.name.add')}}</el-button>
    <el-button
      v-if="multipleSelection.length>0"
      type="danger"
      size="mini"
      icon="el-icon-delete"
      @click="batchDel"
    >{{$t('pub.name.del')}}</el-button>
    <el-button
      type="success"
      :title="$t('pub.name.vexport')"
      size="mini"
      icon="el-icon-download"
      @click="vexport"
    >{{$t('pub.name.vexport')}}</el-button>
    <el-table
      :data="tableData"
      v-loading="loading"
      size="small"
      stripe
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="DCI" prop="dci" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.dci}}</template>
      </el-table-column>

      <el-table-column :label="$t('pub.name.name')" prop="name" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.lastname}} {{scope.row.firstname}}</template>
      </el-table-column>

      <el-table-column :label="$t('pub.name.email')" prop="email" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.email}}</template>
      </el-table-column>

      <el-table-column :label="$t('pub.name.orderno')" prop="orderno" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.orderno}}</template>
      </el-table-column>    

      <el-table-column v-if="hasCreator" :label="$t('pub.name.creator')" prop="creator" sortable="custom">
        <template slot-scope="scope">{{scope.row.creator}}</template>
      </el-table-column>

      <el-table-column :label="$t('pub.name.createtime')" prop="createtime" sortable="custom">
        <template slot-scope="scope">{{scope.row.createtime}}</template>
      </el-table-column>      

      <el-table-column fixed="right" :label="$t('pub.name.oper')" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            :title="$t('pub.name.edit')"
            size="mini"
            icon="el-icon-edit"
            circle
            @click="openEditForm(scope.row)"
          ></el-button>
          <el-button
            v-permission="['p_prereg_adv']"
            type="danger"
            :title="$t('pub.name.del')"
            size="mini"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.id)"
          ></el-button>
          <el-button
            type="warning"
            :title="$t('pub.name.resend')"
            size="mini"
            icon="el-icon-refresh"
            circle
            @click="resend(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
        :page-sizes="[1,100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: -10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </template>
    <edit-form :reg="reg" v-model="editFormVisible" @submit="getTableData"/>
  </d2-container>
</template>
<script>
import * as regService from "@/api/app/prereg";
import editForm from "./editForm";
export default {
  name: "Prereg",
  components: { editForm },
  data() {
    return {
      searchForm: {
        dci: '',
        name: '',
        email: '',
        orderno: '',
        creator: ''
      },
      loading: false,
      tableData: [],
      multipleSelection: [],
      page: {
        current: 1,
        size: 100,
        total: 0
      },
      sort: {
        prop: "",
        order: ""
      },
      reg: {},
      editFormVisible: false,
      hasCreator: this.hasPermissions(["p_prereg_adv"])
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let query = {
        pageIndex: this.page.current,
        pageSize: this.page.size,
        sortBy: this.sort.prop,
        descending: this.sort.order === "descending",
        filter: this.searchForm
      };
      regService.getRegPagedList(query).then(data => {
        this.tableData = data.rows;
        this.page.total = data.totalCount;
      });
    },
    handleSearchFormSubmit() {
      this.getTableData();
    },
    handleSearchFormReset() {
      this.$refs.searchForm.resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSortChange(val) {
      this.sort.prop = val.prop;
      this.sort.order = val.order;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getTableData();
    },
    openEditForm(reg) {
      this.reg = reg;
      this.editFormVisible = true;
    },
    add() {
      this.reg = {};
      this.editFormVisible = true;
    },
    batchDel() {
      this.$confirm(this.$t('pub.confirm.del'), this.$t('pub.name.confirmation'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('pub.name.del'),
        cancelButtonText: this.$t('pub.name.cancel')
      }).then(() => {
        regService
          .delRegs({
            ids: JSON.stringify(this.multipleSelection.map(s => s.id))
          })
          .then(() => {
            this.getTableData();
          });
      });
    },
    del(id) {
      this.$confirm(this.$t('pub.confirm.del'), this.$t('pub.name.confirmation'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('pub.name.del'),
        cancelButtonText:  this.$t('pub.name.cancel')
      }).then(() => {
        regService.delReg(id).then(() => {
          this.getTableData();
        });
      });
    },
    resend(id) {
      this.$confirm(this.$t('pub.confirm.resend'), this.$t('pub.name.confirmation'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('pub.name.resend'),
        cancelButtonText:  this.$t('pub.name.cancel')
      }).then(() => {
        regService.resendReg(id).then(() => {
          
        });
      });
    },
    vexport() {
      let col=[
          { label: 'DCI', prop: 'dci' },
          { label: this.$t('pub.name.firstname'), prop: 'firstname' },
          { label: this.$t('pub.name.lastname'), prop: 'lastname' },
          { label: this.$t('pub.name.email'), prop: 'email' },
          { label: this.$t('pub.name.orderno'), prop: 'orderno' },
          { label: this.$t('pub.name.createtime'), prop: 'createtime' },
        ];
      if (this.hasCreator) {
        col.push({label: this.$t('pub.name.creator'), prop: 'creator' })
      }
      this.$export.excel({
        title: this.$t('pub.exp.title_reg'),
        columns: col,
        data:   this.tableData
      })
    }
  }
};
</script>
