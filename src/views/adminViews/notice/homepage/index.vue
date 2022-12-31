<template>
    <el-card class="card-item">
        <div class="condition-title">系统公告</div>
        <el-table
          ref="singleTable"
          :data="noticeList"
          highlight-current-row
          style="width: 100%"
          v-loading="loading"
        >
        <el-table-column prop="id" label="ID" width="300">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="400">
          </el-table-column>
          <el-table-column prop="time" label="时间" width="150">
          </el-table-column>
          <el-table-column fixed="right">
            <template slot-scope="scope">
              <el-button @click="ClickDetail(scope.row)" type="text" size="small"
                >详情/修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="ClickNew()">新增公告</el-button>
      </el-card>
</template>

<script>
export default {
  name: "Homepage",
  data() {
      return {
        noticeList: [
          {
            id: "000001",
            title: "关于系统停机维护的通知",
            time: "2022-12-29",
          },
          {
            id: "000002",
            title: "关于2022-2023学年第二学期实验教学课程的通知",
            time: "2022-12-29"
          }
        ],
      };
    },
created()
{
  this.$axios({//有跨域问题，待网关调试完成后再试
      method: 'get',
      url: 'http://localhost:8082/notice',
      params: {
        courseId: this.form.class
      }
    }).then((res) => {
      console.log('数据：', res)
    })
},
  
    methods: {
      ClickDetail(row) {
        console.log(row);
        this.$router.push({
          name: "Detail",
          query: {id:row.id},
        });
      },
      ClickNew() {
        this.$router.push({
          name: "Add",
        });
      },


    },
};
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