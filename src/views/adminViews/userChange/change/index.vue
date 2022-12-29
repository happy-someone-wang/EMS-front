<template>
   <el-form :label-position='right' label-width="80px" :model="formLabelAlign">
  <el-form-item label="学号/工号">
    <el-input v-model="formLabelAlign.id"></el-input>
  </el-form-item>
  <el-form-item label="姓名">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="formLabelAlign.email"></el-input>
  </el-form-item>
  <el-form-item label="类型">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form-item>
</el-form>
</template>
  
  <script>
  export default {
    name: "Change",
  
    data() {
      return {
        formLabelAlign: {
          name: '王杨乐',
          id: this.$route.query.id,
          type: '学生',
          email: '1759469055@qq.com',
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }

  };
  </script>