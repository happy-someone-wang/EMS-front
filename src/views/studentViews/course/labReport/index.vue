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
      <el-col :span="8"> 实验报告 </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getStudentCourseList, getExperimentList,getReport } from "@/api/student";
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
    };
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
        console.log("请求实验")
        // 请求实验对应的报告信息
        getReport(node.value, this.userId)
        .then(res =>{
          console.log(res);
        })
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