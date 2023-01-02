<template>
    <div>
      <el-row>
        <div style="font-size: 24px; color: cornflowerblue;display: flex;justify-content: center;align-items: center;">管理员页面</div>
      </el-row>
      <el-card class="card-item">
        <div class="condition-title">用户列表</div>
        <el-table
          ref="singleTable"
          :data="userTable"
          highlight-current-row
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="index" label="学号/工号" width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="150">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="400">
          </el-table-column>
          <el-table-column prop="type" label="类型" width="120">
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="card-item">
        <div class="condition-title">待办事项</div>
        <el-table
          ref="singleTable"
          :data="noticeList"
          highlight-current-row
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="index" label="工号" width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="150">
          </el-table-column>
          <el-table-column prop="content" label="内容" width="400">
          </el-table-column>
          <el-table-column prop="time" label="时间" width="150">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {  
  name: 'DashboardAdmin',
  computed:{
    ...mapGetters(['roles'])
  },
  // mounted() {
  //   console.log("加载了")
  //   console.log(this.roles)
  // },
  data() {
      return {
        options: [
          {
            value: "学生",
            label: "学生",
          },
          {
            value: "教师",
            label: "教师",
          },
        ],
        userTable: [
          {
            index: "2052348",
            name: "王杨乐",
            email: "1759469055@qq.com",
            type: "学生",
          },
        ],
        noticeList: [
          {
            index: "2052348",
            name: "王杨乐",
            content: "请求：重置密码",
            time: "2022-12-29",
          },
        ],
        result:[],
      };
    },
  
    mounted() {
      console.log("加载")
    //getusers()
    this.$axios
      .get('http://localhost:8084/admin/check?id=0&type=all')
      .then((res) => {
        this.userTable=res.data.users;
      })
      .catch((err) => {
        //上传失败回调函数
        console.log(err)
      })
    },
  
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
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
