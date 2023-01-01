<template>
  <div>
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          style="height: 100vh"
          :default-active="current_exp"
          class="el-menu-vertical-demo"
          @select="selectExp"
        >
          <el-menu-item
            v-for="experiment in experiemntList"
            :key="experiment.experimentId"
            :index="experiment.experimentId"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ experiment.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div v-if="currentExperiment != null">
          <el-tabs type="card">
            <el-tab-pane label="实验信息">
              {{currentExperiment.name}}
            </el-tab-pane>
            <el-tab-pane label="实验流程">
              <div style="overflow: auto; height: 600px">
                <pdf v-for="i in numPages" :key="i" :src="src" :page="i"></pdf>
              </div>
            </el-tab-pane>
            <el-tab-pane label="实验报告">实验报告</el-tab-pane>
          </el-tabs>
        </div>
        <div v-else>
          <el-empty description="请选择课程"></el-empty>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import { getExperimentList } from "@/api/student";
var loadingTask = pdf.createLoadingTask("/static/2.pdf");
export default {
  name: "ExperimentList",
  components: {
    pdf,
  },
  data() {
    return {
      experiemntList: [
        {
          experimentId: "",
          name: "",
        },
      ],
      current_exp: "",
      numPages: undefined,
      src: loadingTask,
      courseId: null,
      currentExperiment:null
    };
  },

  mounted() {
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
    });
    this.courseId = this.$route.query;
    getExperimentList(this.courseId).then((res) => {
      console.log("当前课程的实验信息", res);
      this.experiemntList = res.data;
    });
  },

  methods: {
    selectExp(index) {
      console.log(index);
      this.experiemntList.forEach(element => {
        if(element.experimentId == index){
          this.currentExperiment = element;
        }        
      });

    },
    getNumPages(url) {
      var loadingTask = pdf.createLoadingTask(url);
      loadingTask
        .then((pdf) => {
          this.url = loadingTask;
          this.numPages = pdf.numPages;
        })
        .catch((err) => {
          console.error("pdf加载失败");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>