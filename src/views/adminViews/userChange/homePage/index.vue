<template>
    <div>
      <el-card class="card-item">
        <el-row>
          <el-col :span="21">
            <div class="condition-title">筛选条件</div>
          </el-col>
        </el-row>
        <!-- 搜索框部分 -->
        <div class="condition-body">
          <el-form :inline="true" class="condition-form" @submit.native.prevent>
            <el-form-item class="conditon-form-item1" label="学号/工号">
              <!-- 带输入建议的文本框 -->
              <!-- 默认的下拉框poppers是挂载到body上的，所以设置的css样式el-autocomplete-suggestion在App.vue中 -->
              <el-autocomplete
                class="inline-input"
                :trigger-on-focus="false"
                popper-class="el-autocomplete-suggestion"
                v-model="filterForm.index"
                placeholder="请输入ID"
                size="small"
                @keyup.enter.native="submit"
              ></el-autocomplete>
            </el-form-item>
  
            <el-form-item
              style="margin-bottom: 0px; margin-left: 150px"
              label="用户类型"
            >
              <el-select size="small" v-model="filterForm.type" placeholder="请选择类型">
                <el-option
                  v-for="item in options"
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
        <div class="condition-title">已选用户</div>
        <el-table
          ref="singleTable"
          :data="result"
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
          <el-table-column fixed="right">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small"
                >修改信息</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
  
    data() {
      return {
        filterForm:{
	        index:'',
	        type:"",
        },
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
        result:[],
      };
    },
  
    mounted() {},

    watch: {
	// 监听对象变化
	  filterForm:{
		handler(val, oldVal){
			if(val){
				// 如果筛选条件全为空，查全部；否则按条件筛选
				var objIsEmpty = this.filterForm.index == '' && this.filterForm.type == ''
				if(objIsEmpty){
					this.result = this.userTable
				} else {
					// /拿到有值的参数
					let tempFilter = {};
					for(var key in this.filterForm) {
						if(typeof(this.filterForm[key]) != "undefined" && typeof(this.filterForm[key]) != "null" && this.filterForm[key] != null && this.filterForm[key] != "") {
							tempFilter[key] = this.filterForm[key];
						}
					}
					// console.log(tempFilter,'输出tempFilter')
					this.result = this.userTable.filter(
						//筛选
						(item) => {
							let flag = false;
							for(key in tempFilter) {
								console.log(key,'输出key')
									if(item[key].toString().indexOf(tempFilter[key].toString()) >= 0) {
										flag = true;
									} 
                  else {
                    flag = false;
                    break;
                  }
              }
              if(flag) {
                return item;
              }
            }
          );
          console.log(this.result,'输出筛选结果')
        }
      }
    },
    deep:true
  }
},
  
    methods: {
      handleClick(row) {
        console.log(row);
        this.$router.push({
          name: "Change",
          query: {id:row.index},
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