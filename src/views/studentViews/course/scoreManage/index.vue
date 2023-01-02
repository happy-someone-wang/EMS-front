<template>
    <div>
        <el-row class="tac">
          <el-col :span="4">
            <el-menu
              style="height: 100vh"
              :default-active="current_exp"
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
            <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
              <panel-group @handleSetLineChartData="handleSetLineChartData" />

              <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
                <line-chart :chart-data="lineChartData" />
              </el-row>
            </el-row>
          </el-col>
        </el-row>
    </div>
</template>

<script>
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
import LineChart from './LineChart'
import { mapGetters } from "vuex";
import { getStudentCourseList } from "@/api/student"
export default {
    name: 'EMSIndex',
    computed: {
      ...mapGetters(["userId", "roles"]),
    },
    data() {
        return {
            courseTable: [],
            current_exp: "",
            lineChartData: lineChartData.newVisitis
            
        };
    },
    components:{
      LineChart
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
        selectCourse(index){
            console.log(index);
        },
        handleSetLineChartData(type) {
          this.lineChartData = lineChartData[type]
        }
    },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>