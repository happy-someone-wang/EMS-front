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
        <el-descriptions-item label="身份"> 学生 </el-descriptions-item>
        <el-descriptions-item label="年级">{{
          form.startYear
        }}</el-descriptions-item>
        <el-descriptions-item label="院系">{{
          form.school
        }}</el-descriptions-item>
        <!-- <el-descriptions-item label="手机号码">{{
          form.phone
        }}</el-descriptions-item> -->
      </el-descriptions>
      <!-- <el-descriptions :column="1" direction="vertical" style="margin: 10px" border>
          <el-descriptions-item label="自我介绍">{{
            form.selfDesc
          }}</el-descriptions-item>
      </el-descriptions> -->
      <el-button type="primary" v-on:click="toModifyInfor">上传头像</el-button>
    </el-card>
    <el-card class="card-item">
      <div class="condition-title">账号信息</div>
      <el-descriptions style="margin: 10px">
        <el-descriptions-item label="账号状态"> 正常 </el-descriptions-item>
        <el-descriptions-item label="验证邮箱">{{
          form.email
        }}</el-descriptions-item>
      </el-descriptions>

      <el-button type="primary" v-on:click="toModifyPassword"
        >修改密码</el-button
      >
    </el-card>
    <el-dialog title="修改头像" :visible.sync="dialogVisible">
      <div class="el_upload">
        <el-upload
          action=""
          list-type="picture-card"
          :auto-upload="false"
          :on-change="onUploadChange"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          :class="{ disabled: picture_amount == 1 }"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="img_dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <el-button type="primary" v-on:click="save" style="margin-right: 20px"
        >保存</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getStudentInfo,uplaodAvatar } from "@/api/student";
export default {
  name: "EMSIndex",
  computed: {
    ...mapGetters(["userId", "roles"]),
  },
  data() {
    return {
      form: {
        avatar: null,
        email: null,
        gender: null,
        name: null,
        residence: null,
        school: null,
        selfFesc: null,
        startYear: null,
        status: null,
        studentId: null,
        tags: null,
      },
      dialogVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      // 展示放大图的对话框是否显示
      img_dialogVisible: false,
      // 查看放大图的url
      dialogImageUrl: "",
      // 上传文件数据
      file_data: null,
      // 从后端获取的图片url
      image_url: null,
      // 是否展示获取的图片
      image_show: true,
      // 当前上传的图片数量
      picture_amount: 0,
      // 上传的文件列表
      fileList: [],
    };
  },

  mounted() {
    getStudentInfo(this.userId, this.roles[0]).then((res) => {
      console.log(res);
      this.form = res.data;
      if (this.form.avatar == null) {
        console.log("设置默认头像");
        this.form.avatar =
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
      }
    });
  },

  methods: {
    toModifyInfor() {
      this.dialogVisible = true;
    },
    async toModifyPassword() {
      await this.$store.dispatch("user/logout");
      this.$router.push("/forget");
    },
    onSubmit() {
      console.log("submit!");
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onUploadChange(file, fileList) {
      console.log("onUploadChange", file);
      this.file_data = file;
      this.picture_amount += 1;
      const isIMAGE =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/png" ||
        file.raw.type === "image/gif";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
        this.picture_amount -= 1;
        // 从文件列表中删除最后一个元素
        this.fileList.pop();
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
        this.picture_amount -= 1;
        // 从文件列表中删除最后一个元素
        this.fileList.pop();
        return false;
      }
    },
    handleRemove(file, fileList) {
      this.picture_amount -= 1;
      this.file_data = null;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.img_dialogVisible = true;
    },
    save(){
      uplaodAvatar(this.file_data, this.userId, this.roles[0]).then(res=>{
        console.log(res);
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.disabled .el-upload--picture-card {
  display: none !important;
}
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>