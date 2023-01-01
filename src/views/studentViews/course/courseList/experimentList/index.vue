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
            :key="experiment.id"
            :index="experiment.id"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ experiment.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div v-if="current_exp != ''">
          <el-tabs type="card">
            <el-tab-pane label="实验信息">实验信息</el-tab-pane>
            <el-tab-pane label="实验流程">
              <div style="overflow:auto;height:600px;">
                <pdf
                    v-for="i in numPages"
                    :key="i"
                    :src="src"
                    :page="i"
                ></pdf>
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
          id: "1",
          name: "基本运算器实验",
        },
        {
          id: "2",
          name: "微程序控制器实验",
        },
        {
          id: "3",
          name: "CPU与简单模型机实验",
        },
      ],
      current_exp: "",
      numPages: undefined,
      src: loadingTask,
    };
  },

  mounted() {
    this.src.promise.then(pdf => {

        this.numPages = pdf.numPages;
    });

  },

  methods: {
    selectExp(index) {
      console.log(index);
      this.current_exp = index;
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