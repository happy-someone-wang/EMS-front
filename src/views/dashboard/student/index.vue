<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="card-item">
          <el-descriptions title="用户信息" :column="2" border>
            <el-descriptions-item label="姓名">刘一飞</el-descriptions-item>
            <el-descriptions-item label="学号">2051196</el-descriptions-item>
            <el-descriptions-item label="院系">软件学院</el-descriptions-item>
            <el-descriptions-item label="专业">软件工程专业</el-descriptions-item>
            <el-descriptions-item label="身份">
              <el-tag>学生</el-tag> 
            </el-descriptions-item>
            <el-descriptions-item label="账号状态">
              <el-tag type="success">正常</el-tag> 
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions :column="2" border>
            
          </el-descriptions>
        </el-card>

        <el-card class="card-item">
          <span>快捷访问</span>
          <el-row>
            <el-col :span="6" class="qucik-access-item">
              <el-button
                plain
                type="primary"
                icon="el-icon-s-custom"
                class="quick-access-button"
              ></el-button>
            </el-col>
            <el-col :span="6" class="qucik-access-item">
              <el-button
                plain
                type="primary"
                icon="el-icon-s-comment"
                class="quick-access-button"
              ></el-button>
            </el-col>
            <el-col :span="6" class="qucik-access-item">
              <el-button
                plain
                type="primary"
                icon="el-icon-s-marketing"
                class="quick-access-button"
              ></el-button>
            </el-col>
            <el-col :span="6" class="qucik-access-item">
              <el-row>
                <el-button
                  plain
                  type="primary"
                  icon="el-icon-s-data"
                  class="quick-access-button"
                ></el-button>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="quick-access-info">
              个人信息
            </el-col>
            <el-col :span="6" class="quick-access-info">
              系统通知
            </el-col>
            <el-col :span="6" class="quick-access-info">
              课程列表
            </el-col>
            <el-col :span="6" class="quick-access-info">
              成绩管理
            </el-col>
          </el-row>
        </el-card>
        <el-card class="card-item" style="height: 267px">
          <el-row>
            <el-col :span="10">
              <span>通知公告</span>
            </el-col>
            <el-col :span="3" :offset="10">
              <el-button type="text" style="padding:0px"> 查看更多 ></el-button>
            </el-col>
          </el-row>
          
          
          <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="title" label="标题" width="360">
              </el-table-column>
              <el-table-column prop="date" label="日期">
              </el-table-column>
            </el-table>
          </template>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="card-item">
          <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{ data }">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split("-").slice(1).join("-") }}
                {{ data.isSelected ? "✔️" : "" }}
              </p>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DashboardStudent",
  // computed:{
  //   ...mapGetters(['roles'])
  // },
  // mounted() {
  //   console.log("加载了")
  //   console.log(this.roles)
  // },
  data() {
    return {
      tableData: [
        {
          title: "关于系统停机维护的通知",
          date: "2022-05-02",
        },
        {
          title: "关于同学查看所选实验课程的通知",
          date: "2022-10-02",
        },
        {
          title: "关于责任教师开设课程的通知",
          date: "2022-10-02",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
span {
  font-weight: bold;
}
.card-item {
  margin: 10px;
}
.qucik-access-item{
  display: flex; 
  justify-content: center;
}

.quick-access-button {
  font-size: 80px;
  padding: 0px;
  margin: 10px;
}
.quick-access-info {
  font-weight: 300;
  display: flex;
  justify-content: center;
}
</style>
