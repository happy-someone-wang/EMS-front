<template>
  <div class="dashboard-container">
    这是管理员的页面
    <el-descriptions title="用户信息" border>
        <el-descriptions-item label="姓名">刘一飞</el-descriptions-item>
        <el-descriptions-item label="学号">2051196</el-descriptions-item>
        <el-descriptions-item label="身份">{{roles}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {  
  name: 'DashboardAdmin',
  computed:{
    ...mapGetters(['roles'])
  },
  // mounted() {
  //   console.log("加载了")
  //   console.log(this.roles)
  // },
  
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
