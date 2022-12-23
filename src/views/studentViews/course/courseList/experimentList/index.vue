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
            <el-tab-pane label="实验流程">实验流程</el-tab-pane>
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
export default {
  name: "ExperimentList",

  data() {
    return {
      experiemntList: [
        {
          id: "1",
          name: "需求与供给实验",
        },
        {
          id: "2",
          name: "财务分析实验",
        },
        {
          id: "3",
          name: "软件规模度量实验",
        },
      ],
      current_exp: "",
    };
  },

  mounted() {},

  methods: {
    selectExp(index) {
      console.log(index);
      this.current_exp = index;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>