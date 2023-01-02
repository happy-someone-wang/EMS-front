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
        <div v-if="courseInfo == undefined">
          <el-empty description="当前课程暂无通知"></el-empty>
        </div>
        <div v-else-if="courseInfo == ''">
          <el-empty description="请选择课程"></el-empty>
        </div>
        <div v-else>
          <el-card
            v-for="info in courseInfo"
            :key="info.notice.noticeId"
            class="card-item"
          >
            <div slot="header">
              <el-row>
                <el-col :span="16" class="title-item">
                  {{ info.notice.title }}
                </el-col>
                <el-col :span="8">
                  <el-button
                    class="button-item"
                    type="text"
                    @click="ShowDetails(info.noticeId)"
                    >查看详情</el-button
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8" class="date-item">
                  {{ info.notice.createTime }}
                </el-col>
              </el-row>
            </div>
            <div class="content-item" v-html="info.notice.content"></div>
          </el-card>
        </div>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getStudentCourseList, getCourseInfo } from "@/api/student";
export default {
  name: "EMSIndex",
  computed: {
    ...mapGetters(["userId", "roles"]),
  },
  data() {
    return {
      courseTable: [],
      current_course: null,
      courseInfo: "",
    };
  },

  async mounted() {
    console.log("当前我的ID和身份为", this.userId, this.roles);
    await getStudentCourseList(this.userId).then((res) => {
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
    selectCourse(index) {
      console.log(index);
      this.courseTable.forEach((element) => {
        if (element.courseId == index) {
          this.current_course = element;
        }
      });
      console.log("当前选择的课程为", this.current_course);
      getCourseInfo(this.current_course.courseId).then((res) => {
        console.log("当前所选择的课程的课程通知为", res);
        this.courseInfo = res.data.notices;
        console.log("课程通知为", this.courseInfo);
        if (!this.courseInfo == undefined) {
          this.courseInfo.forEach((element) => {
            element.notice.createTime = this.formatDate(
              element.notice.createTime
            );
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.condition-title {
  color: #2b3b4e;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 15px;
}
.card-item {
  background: white;
  border-radius: 10px;
  margin: 15px;
  padding: 5px;
  .title-item {
    font-weight: bold;
    font-family: "Hiragino Sans GB";
    font-size: 20px;
    line-height: 1.7;
  }
  .date-item {
    font-family: "Hiragino Sans GB";
    font-size: 15px;
    line-height: 1.7;
    color: darkgrey;
  }
  .content-item {
    font-weight: bold;
    font-family: "Hiragino Sans GB";
    font-size: px;
    line-height: 1.7;
  }
  .button-item {
    float: right;
    padding: 3px;
  }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>