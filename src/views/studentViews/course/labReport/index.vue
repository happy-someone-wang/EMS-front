<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-cascader-panel style="height: 100vh" :options="options"></el-cascader-panel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'EMSIndex',


  data() {
    return {
      options: [
        {
          value: "zhinan",
          label: "软件工程管理与经济",
          children: [
            {
              value: "shejiyuanze",
              label: "需求与供给实验",
            },
            {
              value: "daohang",
              label: "财务分析实验",
            },
            {
              value: "daohan",
              label: "软件规模度量实验",
            },
          ],
        },
      ],
    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
.el-cascader-panel {
  width: auto;
}
</style>