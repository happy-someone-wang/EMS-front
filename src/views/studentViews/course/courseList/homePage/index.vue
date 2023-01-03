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
              :fetch-suggestions="querySearch"
              popper-class="el-autocomplete-suggestion"
              v-model="filter_name"
              placeholder="请输入名称"
              size="small"
              @keyup.enter.native="submit"
            ></el-autocomplete>
          </el-form-item>

          <el-form-item
            style="margin-bottom: 0px; margin-left: 150px"
            label="上课工作日"
          >
            <el-select size="small" v-model="year" placeholder="请选择工作日">
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
            label="上课时间"
          >
            <el-select size="small" v-model="term" placeholder="请选择时间">
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
        :data="currentTable"
        highlight-current-row
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="courseId" label="课程序号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="课程名称" width="200">
        </el-table-column>
        <el-table-column prop="credit" label="学分" width="120">
        </el-table-column>
        <el-table-column prop="teacher" label="教师" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="开课时间" width="200">
        </el-table-column>
        <el-table-column prop="endTime" label="结课时间" width="200">
        </el-table-column>
        <el-table-column prop="classTime" label="上课时间" width="200">
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
          value: "1",
          label: "周一",
        },
        {
          value: "2",
          label: "周二",
        },
        {
          value: "3",
          label: "周三",
        },
        {
          value: "4",
          label: "周四",
        },
        {
          value: "5",
          label: "周五",
        },
        {
          value: "6",
          label: "周六",
        },
        {
          value: "7",
          label: "周日",
        },
      ],
      terms: [
        {
          value: "1-2",
          label: "1-2",
        },
        {
          value: "3-4",
          label: "3-4",
        },
        {
          value: "5-6",
          label: "5-6",
        },
        {
          value: "7-8",
          label: "7-8",
        },
        {
          value: "9-10",
          label: "9-10",
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
      currentTable:[
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
      courseNames: [],
    };
  },

  mounted() {
    console.log("当前我的ID和身份为", this.userId, this.roles);
    getStudentCourseList(this.userId).then((res) => {
      console.log("当前的课程信息为", res.data);
      this.courseTable = res.data;
      console.log("当前的课程信息为", this.courseTable);
      this.courseTable.forEach((element) => {
        element.startTime = this.formatDate(element.startTime);
        element.endTime = this.formatDate(element.endTime);

        // 创建智能搜索提示框
        var obj = new Object();
        obj.value = element.name;
        this.courseNames.push(obj);

        element.classTime =
          "周" +
          this.getWeek(element.weekday) +
          element.startCourse +
          "-" +
          element.endCourse +
          "节课";
      });
      this.currentTable = this.courseTable;
    });
    
  },

  methods: {
    getWeek(i) {
      if (i == 1) {
        return "一";
      } else if (i == 2) {
        return "二";
      } else if (i == 3) {
        return "三";
      } else if (i == 4) {
        return "四";
      } else if (i == 5) {
        return "五";
      } else if (i == 6) {
        return "六";
      } else {
        return "日";
      }
    },
    querySearch(queryString, cb) {
      var courseNames = this.courseNames;
      var results = queryString
        ? courseNames.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
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
      this.currentTable = this.courseTable;
    },
    FilterButtonClick() {
      console.log("Filter");
      console.log(this.year, this.term, this.filter_name);
      this.courseTable.forEach((e) => {
        if (
          e.name == this.filter_name &&
          e.classTime == "周" + this.getWeek(this.year) + this.term + "节课"
        ) {
          this.currentTable = [] 
          this.currentTable.push(e); 
        }
      });
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