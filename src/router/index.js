import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },




  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
    {
    path: '/admin',
    component: Layout,
    name: 'Admin',
    redirect: '/admin/useradd',
    meta: { title: '管理中心', icon: 'el-icon-s-tools', roles: ['admin'] },
    children: [
      {
        path: 'useradd',
        name: 'Useradd',
        component: () => import('@/views/adminViews/userAdd/index'),
        meta: { title: '添加用户', icon: 'el-icon-s-marketing' },
      },
      {
        path: 'userchange',
        name: 'Userchange',
        component: () => import('@/views/adminViews/userChange/index'),
        meta: { title: '修改用户', icon: 'el-icon-s-claim' },
        children: [
          {
            path: '',
            name: 'HomePage',
            component: () => import('@/views/adminViews/userChange/homePage/index'),
            hidden: true
          },
          {
            path: 'change',
            name: 'Change',
            component: () => import('@/views/adminViews/userChange/change/index'),
            meta: { title: '修改', icon: 'el-icon-s-marketing' },
            hidden: true
          },
        ]
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/adminViews/notice/index'),
        meta: { title: '系统通知', icon: 'el-icon-s-claim' },
        children: [
          {
            path: '',
            name: 'HomePage',
            component: () => import('@/views/adminViews/notice/homepage/index'),
            hidden: true
          },
          {
            path: 'detail',
            name: 'Detail',
            component: () => import('@/views/adminViews/notice/detail/index'),
            meta: { title: '公告细节', icon: 'el-icon-s-marketing' },
            hidden: true
          },
          {
            path: 'add',
            name: 'Add',
            component: () => import('@/views/adminViews/notice/add/index'),
            meta: { title: '新增公告', icon: 'el-icon-s-marketing' },
            hidden: true
          },
        ],
      },
    ]
  },
  {
    path: '/student/course',
    component: Layout,
    name: 'Course',
    redirect: '/student/course/courseList',
    meta: { title: '实验课程中心', icon: 'el-icon-s-help', roles: ['student'] },
    children: [
      {
        path: 'courseList',
        name: 'CourseList',
        component: () => import('@/views/studentViews/course/courseList/index'),
        meta: { title: '课程列表', icon: 'el-icon-s-marketing' },
        children: [
          {
            path: '',
            name: 'HomePage',
            component: () => import('@/views/studentViews/course/courseList/homePage/index'),
            hidden: true
          },
          {
            path: 'experiemntList',
            name: 'ExperimentList',
            component: () => import('@/views/studentViews/course/courseList/experimentList/index'),
            meta: { title: '实验列表', icon: 'el-icon-s-marketing' },
            hidden: true
          },
        ]
      },
      {
        path: 'courseSignIn',
        name: 'CourseSignIn',
        component: () => import('@/views/studentViews/course/courseSignIn/index'),
        meta: { title: '课程签到', icon: 'el-icon-s-claim' }
      },
      {
        path: 'labReport',
        name: 'LabReport',
        component: () => import('@/views/studentViews/course/labReport/index'),
        meta: { title: '实验报告', icon: 'form' }
      },
      {
        path: 'scoreManage',
        name: 'ScoreManage',
        component: () => import('@/views/studentViews/course/scoreManage/index'),
        meta: { title: '成绩管理', icon: 'el-icon-s-data' }
      },
    ]
  },

  {
    path: '/student/person',
    component: Layout,
    meta: { title: '个人中心', icon: 'el-icon-menu', roles: ['student'] },
    children: [
      {
        path: 'personInfo',
        name: 'PersonInfo',
        component: () => import('@/views/studentViews/person/personInfo/index'),
        meta: { title: '个人信息', icon: 'el-icon-s-custom' }
      },
      {
        path: 'accountManage',
        name: 'AccountManage',
        component: () => import('@/views/studentViews/person/accountManage/index'),
        meta: { title: '账号管理', icon: 'el-icon-s-finance' }
      }
    ]
  },

  {
    path: '/student/notice',
    component: Layout,
    name: 'Notice',
    meta: { title: '信息中心', icon: 'el-icon-s-promotion', roles: ['student'] },
    children: [
      {
        path: 'systemInfo',
        name: 'SystemInfo',
        component: () => import('@/views/studentViews/notice/systemInfo/index'),
        meta: { title: '系统通知', icon: 'el-icon-s-comment' }
      },
      {
        path: 'courseInfo',
        name: 'CourseInfo',
        component: () => import('@/views/studentViews/notice/courseInfo/index'),
        meta: { title: '实验课程通知', icon: 'el-icon-message-solid' }
      },
    ]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
