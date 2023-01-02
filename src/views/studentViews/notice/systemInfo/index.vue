<template>
  <div class="views">
    <div class="condition-title" style="margin: 30px">系统通知</div>

    <el-card
      v-for="info in system_infos"
      :key="info.noticeId"
      class="card-item"
    >
      <div slot="header">
        <el-row>
          <el-col :span="16" class="title-item">
            {{ info.title }}
          </el-col>
          <el-col :span="8">
            <el-button
              class="button-item"
              type="text"
              @click="ShowDetails(info.noticeId)"
              >查看详情</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="date-item">
            {{ info.createTime }}
          </el-col>
        </el-row>
      </div>
      <div class="content-item">
        {{ info.content }}
      </div>
    </el-card>
    <el-dialog
      v-if="current_info != null"
      :title="current_info.title"
      :visible.sync="dialogVisible"
    >
      {{ current_info.content }}
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSystemInfo } from "@/api/student";
export default {
  name: "EMSIndex",

  data() {
    return {
      system_infos: {},
      current_info: null,
      dialogVisible: false,
    };
  },

  mounted() {
    getSystemInfo().then((res) => {
      console.log("当前的系统信息为", res);
      this.system_infos = res.data.noticeList;
      this.system_infos.forEach((element) => {
        element.createTime = this.formatDate(element.createTime);
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
    ShowDetails(noticeId) {
      console.log("当前选择的系统通知Id", noticeId);
      this.system_infos.forEach((element) => {
        if (element.noticeId == noticeId) {
          this.current_info = element;
        }
      });
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.condition-title {
  color: #2b3b4e;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 15px;
}
.views {
  .card-item {
    background: white;
    border-radius: 10px;
    margin: 15px;
    padding: 5px;
    .title-item {
      font-weight: bold;
      font-family: "Hiragino Sans GB";
      font-size: 20px;
      line-height: 1.7;
    }
    .date-item {
      font-family: "Hiragino Sans GB";
      font-size: 15px;
      line-height: 1.7;
      color: darkgrey;
    }
    .content-item {
      font-weight: bold;
      font-family: "Hiragino Sans GB";
      font-size: px;
      line-height: 1.7;
    }
    .button-item {
      float: right;
      padding: 3px;
    }
  }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>