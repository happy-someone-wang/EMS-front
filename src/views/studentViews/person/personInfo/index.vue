<template>
  <div class="userInfor_page">
    <el-card class="card-item">
      <div class="condition-title">用户信息</div>
      <div class="box">
        <img :src="form.avatar" alt="ImgError" class="my_avatar" />
      </div>
      <el-descriptions :column="3" style="margin: 10px">
        <el-descriptions-item label="学号">{{
          form.studentId
        }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{
          form.name
        }}</el-descriptions-item>
        <el-descriptions-item label="身份">
          学生
        </el-descriptions-item>
        <el-descriptions-item label="年级">{{
          form.startYear
        }}</el-descriptions-item>
        <el-descriptions-item label="院系">{{
          form.school
        }}</el-descriptions-item>
        
      </el-descriptions>
      <el-button type="primary" v-on:click="toModifyInfor"
        >修改个人信息</el-button
      >
    </el-card>
    <el-card class="card-item">
      <div class="condition-title">账号信息</div>
      <el-descriptions style="margin: 10px">
        <el-descriptions-item label="账号状态">
          正常
        </el-descriptions-item>
        <el-descriptions-item label="验证邮箱">{{
          form.email
        }}</el-descriptions-item>
      </el-descriptions>

      <el-button type="primary" v-on:click="toModifyPassword"
        >修改密码</el-button
      >
      <el-button type="primary" v-on:click="toModifyPassword"
        >修改邮箱</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getStudentInfo } from "@/api/student"
export default {
  name: "EMSIndex",
  computed: {
    ...mapGetters(["userId", "roles"]),
  },
  data() {
    return {
      form: {
        avatar:"",
        email:"",
        gender:"",
        name:null,
        residence:null,
        school:null,
        selfFesc:null,
        startYear:null,
        status:null,
        studentId:null,
        tags:null,

        // userId: "2051196",
        // name: "刘一飞",
        // grade: "2020级",
        // department: "软件学院",
        // major: "软件工程专业",
        // roles: "学生",
        // status: "正常",
        // email: "3155002905@qq.com",
      },
    };
  },

  mounted() {
    getStudentInfo(this.userId,this.roles[0])
    .then(res =>{
      console.log(res);
      this.form = res.data;
    })
  },

  methods: {
    toModifyInfor() {},
    async toModifyPassword() {
      await this.$store.dispatch('user/logout');
      this.$router.push("/forget");
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
}
.my_avatar {
  width: 150px;
  margin-bottom: 30px;
  margin-top: 10px;
  border-radius: 50%;
}
.condition-title {
  color: #2b3b4e;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 15px;
}
.card-item {
  background: white;
  margin: 15px;
  padding: 5px;
}
</style>