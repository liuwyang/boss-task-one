<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryForm" :inline="true">
      <el-form-item label="用户名" prop="userName">
        <el-input
          class="filter-item"
          v-model="queryForm.userName"
          placeholder="请输入用户名称"
          style="width: 240px"
          clearable
        />
      </el-form-item>
      <el-form-item label="角色名" prop="roleName">
        <el-input
          class="filter-item"
          v-model="queryForm.roleName"
          placeholder="请输入角色名称"
          style="width: 240px"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button tv-waves class="filter-item" type="primary" icon="el-icon-search" @click="submitForm">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="userAndRoleList" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="用户编号" prop="userId" align="center" />
      <el-table-column label="用户名称" prop="userName" :show-overflow-tooltip="true" align="center" />
      <el-table-column label="角色编号" prop="roleId" align="center" />
      <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" align="center" />
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/article' // 暂时用这个链接代替
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'UserRoleManage',
  components: { Pagination },
  data() {
    return {
      loading: false,
      listLoading: false,
      total: 20,
      userAndRoleList: [
        {
          userId: 1,
          userName: 'lwy',
          roleId: 1,
          roleName: '超级管理员'
        },
        {
          userId: 2,
          userName: '张伟',
          roleId: 2,
          roleName: '普通用户'
        }
      ],
      queryForm: {
        userName: '',
        roleName: '',
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    submitForm() {

    },
    resetForm() {
      this.$refs.queryForm.resetField()
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
