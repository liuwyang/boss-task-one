<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryForm" :inline="true">
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="queryForm.userName"
          class="filter-item"
          placeholder="请输入用户名称"
          style="width: 240px"
          clearable
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryForm.phone"
          class="filter-item"
          placeholder="请输入手机号"
          style="width: 240px"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button tv-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange" border fit highlight-current-row style="width: 100%;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="用户编号" prop="userId" align="center" sortable/>
      <el-table-column label="用户名称" prop="userName" :show-overflow-tooltip="true" align="center" />
      <el-table-column label="所属角色" prop="roleName" :show-overflow-tooltip="true" align="center" />
      <el-table-column label="手机号" prop="phone" :show-overflow-tooltip="true" align="center" />
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getList" />

    <el-dialog :title="dialogType==='编辑'?'编辑用户':'新增用户'" :visible.sync="dialogVisible" width="600px" :append-to-body="true">
      <el-form ref="form" :model="userForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="userForm.userName" placeholder="请输入用户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="userForm.phone" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" placeholder="请输入密码" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属角色" prop="roleIds">
              <el-select v-model="userForm.roleIds" multiple placeholder="请选择所属角色">
                <el-option
                  v-for="item in roles"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'UserManage',
  components: { Pagination },
  data() {
    return {
      loading: false,
      listLoading: false,
      total: 20,
      dialogVisible: false,
      dialogType: '新增',
      userForm: {},
      roles: [
        {
          roleId: '',
          roleName: '',
          status: ''
        }
      ],
      rules: {
        userName: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        roleIds: [
          { required: true, message: '所属角色不能为空', trigger: 'change' }
        ]
      },
      userList: [
        {
          userId: 1,
          userName: 'lwy',
          roleName: '超级管理员',
          phone: 13107936386
        },
        {
          userId: 2,
          userName: '张伟',
          roleName: '普通用户',
          phone: 13107936386
        }
      ],
      queryForm: {
        userName: '',
        phone: '',
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    submitForm() {

    },
    handleQuery() {

    },
    handleAdd() {
      this.resetForm()
      this.dialogVisible = true
      this.dialogType = '新增'
    },
    handleUpdate(row) {
      // this.resetForm()
      this.userForm.userName = row.userName
      this.userForm.phone = row.phone
      this.userForm.password = 'abc123'
      this.roles.roleId = row.roleName
      this.roles.roleName = row.roleName
      // console.log(row.roleName)
      this.dialogVisible = true
      this.dialogType = '编辑'
    },
    handleDelete(row) {
      this.$confirm('确认要删除该用户吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 删除操作
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    cancel() {
      this.dialogVisible = false
      this.resetForm()
    },
    resetForm() {
      this.userForm = {
        userId: '',
        userName: '',
        password: '',
        phone: '',
        roleIds: []
      }
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId)
      this.multiple = !selection.length
    },
    getList() {
      this.listLoading = true
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //
      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    }
  }
}
</script>
