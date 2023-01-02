<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="选择课程">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option v-for="one in courseTable" :key=" one.courseId" :label="one.name" :value="one.courseId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实验名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="截止时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="实验简介">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="实验内容">
            <el-upload
              class="upload-demo"
              drag
              :auto-upload="false"
              :on-change="onUploadChange"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :file-list="fileList">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getTeacherCourseList, postExperiment } from "@/api/teacher"
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        courseTable:null,
        fileList:null,
        file_data:null,
      }
    },
    computed: {
        ...mapGetters([
            'userId','roles','avatar','name'
        ]),
    },
    methods: {
      onSubmit() {
        let formdata = new FormData();
        formdata.append("name",this.form.name)
        formdata.append("courseId",this.form.region)
        formdata.append("createTime",new Date())
        formdata.append("deadline",this.form.date1)
        formdata.append("introduction",this.form.desc)
        formdata.append("file",this.file_data.raw,this.file_data.name)

        let config = {
          headers:{
              "Content-Type": "multipart/form-data",
          },
        }
        this.$axios.post("http://localhost:7999/experiment/postExperiment",formdata,config)
        .then(res=>{
          console.log(res);
        })

      },
      // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      onUploadChange(file, fileList) {
        console.log("onUploadChange", file);
        this.file_data = file;
        this.picture_amount += 1;
        const isPdf =
          file.raw.type === "application/pdf"

        if (!isPdf) {
          this.$message.error("上传文件只能是pdf格式!");
          this.picture_amount -= 1;
          // 从文件列表中删除最后一个元素
          this.fileList.pop();
          return false;
        }
      },
    },
    mounted(){
        getTeacherCourseList(this.userId)
        .then(res=>{
            console.log(res);
            this.courseTable = res.data
        })
    }
  }
</script>

<style  scoped>

</style>