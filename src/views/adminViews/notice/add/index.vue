<template>
  <div class="views">
    <el-card class="card-item">
      <div class="condition-title">新增公告</div>
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="公告标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="公告内容">
    <el-input type="textarea" v-model="form.content"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="$router.go(-1)">取消</el-button>
  </el-form-item>
</el-form>

    </el-card>
  </div>
</template>

<script>
import { postnotice } from '@/api/systemnotice'
export default {
  name: "Detail",
  data() {
      return {
        form: {
          title: '',
          content: '',
        }
      }
    },
  
methods: {
    onSubmit() {        
      console.log(this.form);
      let config = {
        headers: {
        'Content-Type':'application/json'
        }
      };

      let Jsondata=JSON.stringify(this.form)
      //adduser(Jsondata)
      // 自定义上传
      this.$axios
      .post('http://localhost:8082/notice/systemNotice', Jsondata,config)
      .then((res) => {
      console.log(res)
      this.$router.go (-1);
      })
      .catch((err) => {
      //上传失败回调函数
      console.log(err)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.views {
  .card-item {
    background: white;
    margin: 15px;
    padding: 5px;

    .condition-title {
      color: #2b3b4e;
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      margin-bottom: 15px;
    }
    .condition-body {
      display: flex;
      margin-left: 60px;
      align-items: center;
      .condition-form {
        margin-bottom: 0px;
        .conditon-form-item1 {
          margin-bottom: 0px;
          .inline-input {
            width: 250px;
          }
        }

        .conditon-form-item2 {
          margin-bottom: 0px;
        }
      }
    }
    .form-page {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .CareServices-Row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    .service-card {
      margin-right: 10px;
      margin-bottom: 10px;
      .card-content {
        .card-img {
          display: flex;
          align-content: center;
          justify-content: center;
        }
        .card-info {
          padding-left: 14px;
        }
        .requireServieButton {
          display: flex;
          align-content: center;
          justify-content: center;
        }
      }
    }
  }

  .serviceDialog {
    width: 100%;
    display: flex;
    flex-direction: column;

    //弹窗内容
    .dialog-content {
      display: flex;
      flex-direction: column;

      .dialog-img-box {
        display: flex;
        flex-direction: column;
      }
      .dialog-info {
        font-weight: bold;
        color: black;
        font-size: 30px;
      }
    }
  }
}

</style>