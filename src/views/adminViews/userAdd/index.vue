<template>
<div>
    <el-card class="card-item">
        <div class="condition-title">新增用户</div>
        <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      accept=".xlsx"
      :on-exceed="Exceed"
      :limit="1"
      :on-remove="Remove"
      :http-request="UploadFile"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">1次只能上传1个xls文件</div>
    </el-upload>
    <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-card>
    <div class="preview-excel">
    <el-table class="listTable_ele"  v-show="listTable.length != 0" :data="listTable" stripe height="250" style="width:100%">
        <el-table-column prop="name" label="姓名" width="200" align="center"></el-table-column>
        <el-table-column prop="sno" label="学号/工号" width="200" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" width="200" align="center"></el-table-column>
    </el-table>
    </div>
</div>
</template>
  
  <script>
  import * as XLSX from "xlsx";
  export default {
    name: "userAdd",

    data() {
        return {
        listTable: [
        ],
      };
    },
  
    methods: {
    submitUpload() {
        this.$refs.upload.submit();
      },
    Remove(file, fileList) {
        console.log(file, fileList);
        this.listTable=[];
      },
    Exceed(){
        this.$message.error("最多只能上传1个xls文件");
    },
    UploadFile(params) {
        const _file = params.file;
        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: 'binary'
            });
            for (let sheet in workbook.Sheets) {
              //循环读取每个文件
              const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
              //若当前sheet没有数据，则continue
              if(sheetArray.length == 0){
                continue;
              }
              console.log("读取文件");
              console.log(sheetArray);
              for(let item in sheetArray){
                let rowTable = {};
                //这里的rowTable的属性名注意要与上面表格的prop一致
                //sheetArray的属性名与上传的表格的列名一致
                rowTable.name = sheetArray[item].姓名;
                rowTable.sno = sheetArray[item].学号;
                rowTable.type = sheetArray[item].类型;
                this.listTable.push(rowTable);
              }

              console.log(this.listTable)
            }
          } catch (e) {
            this.$message.warning('文件类型不正确！');
          }
        };
        fileReader.readAsBinaryString(_file);
    },
    submitUpload() {
      console.log("上传学生");
      let config = {
        headers: {
        'Content-Type':'application/json'
        }
      };

      let Jsondata=JSON.stringify(this.listTable)
      // 自定义上传
      this.$axios
      .post('http://localhost:7000/admin/add', Jsondata,config)
      .then((res) => {
      //上传成功回调函数
      })
      .catch((err) => {
      //上传失败回调函数
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