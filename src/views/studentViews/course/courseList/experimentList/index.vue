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
              <div class="condition-title" style="margin: 30px">
                实验基本信息
              </div>
              <el-descriptions style="margin: 30px">
                <el-descriptions-item label="实验名称">{{
                  currentExperiment.name
                }}</el-descriptions-item>
                <el-descriptions-item label="实验创建时间">{{
                  currentExperiment.createTime
                }}</el-descriptions-item>
                <el-descriptions-item label="实验截止时间">{{
                  currentExperiment.deadline
                }}</el-descriptions-item>
                <el-descriptions-item label="实验状态">
                  <el-tag
                    v-if="currentExperiment.state == '进行中'"
                    size="small"
                    type="success"
                    >{{ currentExperiment.state }}</el-tag
                  >
                  <el-tag v-else size="small" type="danger">{{
                    currentExperiment.state
                  }}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <div class="condition-title" style="margin: 30px">实验简介</div>
              <div style="margin: 30px">
                {{ currentExperiment.introduction }}
              </div>
            </el-tab-pane>

            <el-tab-pane label="实验流程">
              <div style="overflow: auto; height: 600px" v-if="this.currentExperiment.content!=null">
                <pdf v-for="i in numPages" :key="i" :src="src" :page="i" ></pdf>
              </div>
            </el-tab-pane>
            <el-tab-pane label="实验报告">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin: 15px;
                "
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
            </el-tab-pane>
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
import { mapGetters } from "vuex";
import indexVue from "@/components/Tinymce/index.vue";
import pdf from "vue-pdf";
import {
  getExperimentList,
  getReport,
  postReport,
  putReport,
  studentSignIn,
} from "@/api/student";
export default {
  name: "ExperimentList",
  components: {
    pdf,
    indexVue,
  },
  computed: {
    ...mapGetters(["userId", "roles"]),
  },
  data() {
    return {
      experiemntList: [
        {
          experimentId: "",
          name: "",
          creatimeTime: "",
          endTime: "",
          introduction: "",
        },
      ],
      current_exp: "",
      numPages: undefined,
      src: null,
      courseId: null,
      currentExperiment: null,
      reportInfo: null,
      newValue: null,
    };
  },

  async mounted() {
    this.courseId = this.$route.query;
    await getExperimentList(this.courseId).then((res) => {
      console.log("当前课程的实验信息", res);
      this.experiemntList = res.data;
      this.experiemntList.forEach((value, index) => {
        if (Date.parse(value.deadline) > new Date()) {
          value.state = "进行中";
        } else {
          value.state = "已结束";
        }
        // 将Date格式化
        value.createTime = this.formatDate(value.createTime);
        value.deadline = this.formatDate(value.deadline);
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
    selectExp(index) {
      console.log(index);
      this.experiemntList.forEach((element) => {
        if (element.experimentId == index) {
          this.currentExperiment = element;
        }
      });
      this.src = pdf.createLoadingTask(this.currentExperiment.content);
      this.src.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });

      getReport(this.currentExperiment.experimentId, this.userId).then(
        (res) => {
          console.log("获取到的报告信息为", res);
          this.reportInfo = res.data;
        }
      );
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
.condition-title {
  color: #2b3b4e;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 15px;
}
</style>