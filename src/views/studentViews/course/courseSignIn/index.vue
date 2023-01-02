<template>
  <div>
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          style="height: 100vh"
          class="el-menu-vertical-demo"
          @select="selectCourse"
        >
          <el-menu-item
            v-for="course in courseTable"
            :key="course.courseId"
            :index="course.courseId"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ course.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div v-if="current_course == ''">
          <el-empty description="请选择课程"></el-empty>
        </div>
        <div v-else>
          <el-table :data="signList" style="width: 100%">
            <el-table-column prop="sign_id" label="签到序号" width="180">
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="300">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="300">
            </el-table-column>
            <el-table-column prop="signIn" label="签到状态" width="180">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.signIn === false ? 'danger' : 'success'"
                  disable-transitions
                  >{{
                    scope.row.signIn === false ? "未签到" : "已签到"
                  }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="signIn(scope.$index, scope.row)"
                  >签到</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox, Message } from 'element-ui'
import {
  getStudentCourseList,
  courseSignList,
  studentSignIn,
} from "@/api/student";
export default {
  name: "EMSIndex",
  computed: {
    ...mapGetters(["userId", "roles"]),
  },
  data() {
    return {
      courseTable: [],
      current_course: "",
      signList: null,
    };
  },

  mounted() {
    console.log("当前我的ID和身份为", this.userId, this.roles);
    getStudentCourseList(this.userId).then((res) => {
      console.log("当前的课程信息为", res.data);
      this.courseTable = res.data;
      console.log("当前的课程信息为", this.courseTable);
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
    selectCourse(courseId) {
      console.log(courseId);
      this.courseTable.forEach((element) => {
        if (element.courseId == courseId) {
          this.current_course = element;
        }
      });
      courseSignList(this.current_course.courseId, this.userId).then((res) => {
        console.log("获取到的签到信息为", res);
        this.signList = res.data.signList;
        this.signList.forEach((element) => {
          element.startTime = this.formatDate(element.startTime);
          element.endTime = this.formatDate(element.endTime);
        });
        console.log(this.signList);
      });
    },
    async signIn(index, row) {
      console.log("选中的签到信息为", index, row);
      await studentSignIn(row, this.userId, new Date()).then((res) => {
        console.log("学生签到", res);
        Message({
          message:"签到成功",
          type: 'success',
          duration: 5 * 1000
        })
      });
      
      // 重新获取签到信息
      await courseSignList(this.current_course.courseId, this.userId).then((res) => {
        console.log("获取到的签到信息为", res);
        this.signList = res.data.signList;
        this.signList.forEach((element) => {
          element.startTime = this.formatDate(element.startTime);
          element.endTime = this.formatDate(element.endTime);
        });
        console.log(this.signList);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>