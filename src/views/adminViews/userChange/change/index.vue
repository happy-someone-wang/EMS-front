<template>
  <el-form label-width="80px" :model="formLabelAlign">
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
import { getuser } from '@/api/admin'
export default {
  name: "Change",

  data() {
    return {
      formLabelAlign: {
      }
    };
  },

  mounted() {
    console.log("加载")
    console.log(this.$route.query)
    getuser(this.$route.query.id, this.$route.query.type)
      // this.$axios
      //   .get('http://localhost:8084/admin/check?id='+this.$route.query.id+'&type='+this.$route.query.type)
      .then((res) => {
        console.log(res.data);
        this.formLabelAlign = res.data.user;
      })
      .catch((err) => {
        //上传失败回调函数
        console.log(err)
      })
  },

  methods: {
    onSubmit() {
      console.log('submit!');
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let Jsondata = JSON.stringify(this.formLabelAlign)
      //adduser(Jsondata)
      // 自定义上传
      this.$axios
        .post('http://123.60.156.14:7999/admin/update', Jsondata, config)
        .then((res) => {
          alert(res.data.status);
          console.log(res)
        })
        .catch((err) => {
          //上传失败回调函数
          console.log(err)
        })
    }
  }

};
</script>