<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="card-item">
          <el-descriptions title="用户信息" :column="2" border>
            <el-descriptions-item label="姓名">{{
              form.name
            }}</el-descriptions-item>
            <el-descriptions-item label="学号">{{
              form.studentId
            }}</el-descriptions-item>
            <el-descriptions-item label="院系">{{
              form.school
            }}</el-descriptions-item>
            <el-descriptions-item label="年级">{{
              form.startYear
            }}</el-descriptions-item>
            <el-descriptions-item label="身份">
              <el-tag>学生</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="账号状态">
              <el-tag type="success">正常</el-tag>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions :column="2" border> </el-descriptions>
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
                v-on:click="toPersonalInfo"
              ></el-button>
            </el-col>
            <el-col :span="6" class="qucik-access-item">
              <el-button
                plain
                type="primary"
                icon="el-icon-s-claim"
                class="quick-access-button"
                v-on:click="toCourseSignIn"
              ></el-button>
            </el-col>
            <el-col :span="6" class="qucik-access-item">
              <el-button
                plain
                type="primary"
                icon="el-icon-s-marketing"
                class="quick-access-button"
                v-on:click="toCourseList"
              ></el-button>
            </el-col>
            <el-col :span="6" class="qucik-access-item">
              <el-row>
                <el-button
                  plain
                  type="primary"
                  icon="el-icon-s-data"
                  class="quick-access-button"
                  v-on:click="toScoureManage"
                ></el-button>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="quick-access-info"> 个人信息 </el-col>
            <el-col :span="6" class="quick-access-info"> 课程签到 </el-col>
            <el-col :span="6" class="quick-access-info"> 课程列表 </el-col>
            <el-col :span="6" class="quick-access-info"> 成绩管理 </el-col>
          </el-row>
        </el-card>
        <el-card class="card-item" style="height: 267px">
          <el-row>
            <el-col :span="10">
              <span>通知公告</span>
            </el-col>
            <el-col :span="3" :offset="10">
              <el-button
                type="text"
                style="padding: 0px"
                v-on:click="toSystemNotice"
              >
                查看更多 ></el-button
              >
            </el-col>
          </el-row>

          <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="title" label="标题" width="360">
              </el-table-column>
              <el-table-column prop="createTime" label="日期">
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
                {{ data.day == formatDate(new Date(), "YY-MM-DD") ? "✔️" : "" }}
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
import { getStudentInfo, getSystemInfo } from "@/api/student";
export default {
  name: "DashboardStudent",
  computed: {
    ...mapGetters(["userId", "roles"]),
  },
  data() {
    return {
      tableData: [],
      form: {
        avatar: "",
        email: "",
        gender: "",
        name: null,
        residence: null,
        school: null,
        selfFesc: null,
        startYear: null,
        status: null,
        studentId: null,
        tags: null,
      },
      data: new Date(),
    };
  },
  async mounted() {
    await getStudentInfo(this.userId, this.roles[0]).then((res) => {
      console.log(res);
      this.form = res.data;
    });
    await getSystemInfo().then((res) => {
      console.log("当前的系统信息为", res);
      this.tableData = res.data.noticeList;
      this.tableData.forEach((element) => {
        element.createTime = this.formatDate(element.createTime);
      });
    });
  },
  methods: {
    // 格式化Date方法
    formatDate(time, format = "YY-MM-DD hh:mm:ss") {
      var date = new Date(time);

      var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
      var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return "0" + index;
      });
      var newTime = format
        .replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

      return newTime;
    },
    toPersonalInfo() {
      this.$router.push({ path: "/student/person/personInfo" });
    },
    toSystemNotice() {
      this.$router.push({ path: "/student/notice/systemInfo" });
    },
    toCourseList() {
      this.$router.push({ path: "/student/course/courseList" });
    },
    toScoureManage() {
      this.$router.push({ path: "/student/course/scoreManage" });
    },
    toCourseSignIn() {
      this.$router.push({ path: "/student/course/courseSignIn" });
    },
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
.qucik-access-item {
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
