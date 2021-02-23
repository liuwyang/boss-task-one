const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: '1',
    name: '超级管理员',
    description: '超级管理员。有权查看所有页面。',
    routes: routes
  },
  {
    key: '2',
    name: '普通用户',
    description: '可以看到除权限页面以外的所有页面',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: '3',
    name: '游客',
    description: '只是一个访客。只能看到主页和文档页面',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  },
  {
    key: '2',
    name: 'lwy',
    description: '研发人员',
    routes: [{
      path: '',
      redirect: 'tab',
      children: [
        {
          path: 'tab',
          name: 'tab',
          meta: { title: 'tab', icon: 'tab' }
        }
      ]
    }]
  },
]

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
