<template>
  <div>
    <el-card class="card-item">
      <el-row>
        <el-col :span="21">
          <div class="condition-title">筛选条件</div>
        </el-col>
        <el-col :span="3">
          <el-button
            size="small"
            class="title-button"
            @click="ResetButtonClick"
          >
            &ensp;重置&ensp;
          </el-button>
          <el-button
            type="primary"
            size="small"
            class="title-button"
            @click="FilterButtonClick"
          >
            &ensp;筛选&ensp;
          </el-button>
        </el-col>
      </el-row>
      <!-- 搜索框部分 -->
      <div class="condition-body">
        <el-form :inline="true" class="condition-form" @submit.native.prevent>
          <el-form-item class="conditon-form-item1" label="课程名称">
            <!-- 带输入建议的文本框 -->
            <!-- 默认的下拉框poppers是挂载到body上的，所以设置的css样式el-autocomplete-suggestion在App.vue中 -->
            <el-autocomplete
              class="inline-input"
              :trigger-on-focus="false"
              popper-class="el-autocomplete-suggestion"
              v-model="filter_name"
              placeholder="请输入名称"
              size="small"
              @keyup.enter.native="submit"
            ></el-autocomplete>
          </el-form-item>

          <el-form-item
            style="margin-bottom: 0px; margin-left: 150px"
            label="开课学年"
          >
            <el-select size="small" v-model="year" placeholder="请选择学年">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            style="margin-bottom: 0px; margin-left: 20px"
            label="开课学期"
          >
            <el-select size="small" v-model="term" placeholder="请选择学期">
              <el-option
                v-for="item in terms"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="card-item">
      <div class="condition-title">已选实验课程</div>
      <el-table
        ref="singleTable"
        :data="courseTable"
        highlight-current-row
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="courseId" label="课程序号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="课程名称" width="300">
        </el-table-column>
        <el-table-column prop="credit" label="学分" width="120">
        </el-table-column>
        <el-table-column prop="teacher" label="教师" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="开课时间" width="200">
        </el-table-column>
        <el-table-column prop="endTime" label="结课时间" width="200">
        </el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >进入课程</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getStudentCourseList } from "@/api/student";
export default {
  name: "HomePage",
  computed: {
    ...mapGetters(["userId", "roles"]),
  },
  data() {
    return {
      loading: false,
      filter_name: null,
      options: [
        {
          value: "2022",
          label: "2022-2023",
        },
      ],
      terms: [
        {
          value: "1",
          label: "第一学期",
        },
        {
          value: "2",
          label: "第二学期",
        },
      ],
      courseTable: [
        {
          courseId: "",
          name: "",
          credit: null,
          startTime: "",
          endTime: "",
          teacher: [],
        },
      ],

      year: "",
      term: "",
      currentCourseId: null,
    };
  },

  mounted() {
    console.log("当前我的ID和身份为", this.userId, this.roles);
    getStudentCourseList(this.userId).then((res) => {
      console.log("当前的课程信息为", res.data);
      this.courseTable = res.data;
      console.log("当前的课程信息为", this.courseTable);
      this.courseTable.forEach(element => {
        element.startTime = this.formatDate(element.startTime);
        element.endTime = this.formatDate(element.endTime);
      });
    });
  },

  methods: {
    // 格式化Date方法
    formatDate(time, format = "YY-MM-DD hh:mm:ss") {
      var date = new Date(time);

      var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
      var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return "0" + index;
      });
      var newTime = format
        .replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

      return newTime;
    },
    ResetButtonClick() {
      console.log("Reset");
    },
    FilterButtonClick() {
      console.log("Filter");
    },
    handleClick(row) {
      console.log(row);
      this.$router.push({
        name: "ExperimentList",
        query: row.courseId,
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