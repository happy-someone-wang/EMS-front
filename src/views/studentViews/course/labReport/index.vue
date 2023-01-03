<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-cascader-panel style="height: 100vh" :options="options">
          <template slot-scope="{ node, data }">
            <span style="display: block" @click="checkCourse(node)">{{
              data.label
            }}</span>
          </template>
        </el-cascader-panel>
      </el-col>
      <el-col :span="17">
        <div v-if="reportInfo != null">
          <div
            style="display: flex; justify-content: space-between; margin: 15px"
          >
            实验报告状态：{{ reportInfo.status }}
            <el-button type="primary" size="small" plain @click="submit"
              >提交报告</el-button
            >
          </div>
          <indexVue
            @getInput="getNew"
            :value="reportInfo.reportList[0].content"
          ></indexVue>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import indexVue from "@/components/Tinymce/index.vue";
import {
  getStudentCourseList,
  getExperimentList,
  getReport,
} from "@/api/student";
export default {
  name: "EMSIndex",
  computed: {
    ...mapGetters(["userId", "roles"]),
  },
  data() {
    return {
      options: [],
      courseTable: null,
      check: null,
      reportInfo: null,
      newValue: null,
    };
  },
  components: {
    indexVue,
  },
  async mounted() {
    console.log("当前我的ID和身份为", this.userId, this.roles);
    await getStudentCourseList(this.userId).then((res) => {
      console.log("当前的课程信息为", res.data);
      this.courseTable = res.data;
      console.log("当前的课程信息为", this.courseTable);
    });
    this.options = [];
    this.courseTable.forEach((element) => {
      var obj = new Object();
      obj.value = element.courseId;
      obj.label = element.name;
      obj.children = [];
      this.options.push(obj);
    });
  },

  methods: {
    checkCourse(node) {
      console.log(node);
      if (node.hasChildren == true) {
        // 请求课程中的实验信息
        getExperimentList(node.value).then((res) => {
          console.log("当前课程的实验信息为", res);
          this.options.forEach((course) => {
            if (course.value == node.value) {
              course.children = [];
              res.data.forEach((element) => {
                var obj = new Object();
                obj.value = element.experimentId;
                obj.label = element.name;
                course.children.push(obj);
              });
            }
          });
        });
      } else {
        console.log("请求实验");
        // 请求实验对应的报告信息
        getReport(node.value, this.userId).then((res) => {
          console.log(res);
          console.log("获取到的报告信息为", res);
          this.reportInfo = res.data;
        });
      }
    },
    getNew(newValue) {
      this.newValue = newValue;
    },
    submit(newValue) {
      if (this.reportInfo.status == "已提交报告") {
        putReport(
          this.reportInfo.reportList[0].reportId,
          this.userId,
          this.newValue
        ).then((res) => {
          console.log("提交报告！");
        });
      } else {
        postReport(
          this.currentExperiment.experimentId,
          this.userId,
          this.newValue
        ).then((res) => {
          console.log("提交报告！");
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-cascader-panel {
  width: auto;
}
</style>