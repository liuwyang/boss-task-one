<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryForm" :inline="true">
      <el-form-item label="菜单名称">
        <el-input
          v-model="queryForm.menuName"
          placeholder="请输入菜单名称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button tv-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="menuList"  border fit highlight-current-row style="width: 100%;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="300px"/>
      <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getList" />

    <el-dialog :title="dialogType==='编辑'?'编辑菜单':'新增菜单'" :visible.sync="dialogFormVisible" width="600px" append-to-body>
      <el-form ref="menuForm" :model="menuForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="权限标识" prop="permission">
              <el-input v-model="menuForm.permission" placeholder="请输入权限标识" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'MenuManage',
  components: { Pagination },
  data() {
    return {
      loading: false,
      listLoading: false,
      total: 20,
      input: '',
      value: '',
      dialogFormVisible: false,
      menuForm: {},
      dialogType: '新增',
      rules: {
        menuName: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '路由地址不能为空', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '组件路径不能为空', trigger: 'blur' }
        ],
        permission: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' }
        ]
      },
      menuList: [
        {
          menuName: '系统配置',
          icon: 'el-icon-setting',
          component: 'http://localhost:9527/#/systemConfig/',
          createTime: '2021.02.22'
        }
      ],
      queryForm: {
        menuName: '',
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    handleQuery() {

    },
    handleAdd() {
      this.resetForm()
      this.dialogFormVisible = true
      this.dialogType = '新增'
    },
    handleUpdate(row) {
      this.menuForm.menuName = '系统配置'
      this.menuForm.path = '/systemConfig'
      this.menuForm.component = 'http://localhost:9527/#/systemConfig/'
      this.menuForm.permission = 1
      this.dialogFormVisible = true
      this.dialogType = '编辑'
    },
    handleDelete(row) {
      const menuName = row.menuName
      this.$confirm('是否确认删除菜单"' + menuName + '"的数据?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        // return delUser(userId)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    },
    submitForm() {
    },
    cancel() {
      this.dialogVisible = false
      this.resetForm()
    },
    resetForm() {
      this.menuForm = {
        menuName: '',
        path: '',
        component: '',
        permission: ''
      }
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
