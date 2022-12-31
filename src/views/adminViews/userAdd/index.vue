<template>
<div>
    <el-card class="card-item">
        <div class="condition-title">新增学生</div>
        <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      accept=".xlsx"
      :on-exceed="Exceed"
      :limit="1"
      :on-remove="Remove1"
      :http-request="UploadFile1"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">1次只能上传1个xls文件</div>
    </el-upload>
    </el-card>
    <div class="preview-excel">
    <el-table class="listTable1_ele"  v-show="listTable1.length != 0" :data="listTable1" stripe height="250" style="width:100%">
        <el-table-column prop="name" label="姓名" width="200" align="center"></el-table-column>
        <el-table-column prop="class" label="班级" width="200" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200" align="center"></el-table-column>
        <el-table-column prop="sno" label="学号" width="200" align="center"></el-table-column>
    </el-table>
  </div>
  <el-card class="card-item">
        <div class="condition-title">新增教师</div>
        <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      accept=".xlsx"
      :on-exceed="Exceed"
      :limit="1"
      :on-remove="Remove2"
      :http-request="UploadFile2"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">1次只能上传1个xls文件</div>
    </el-upload>
    </el-card>
    <div class="preview-excel">
    <el-table class="listTable2_ele"  v-show="listTable2.length != 0" :data="listTable2" stripe height="250" style="width:100%">
        <el-table-column prop="name" label="姓名" width="200" align="center"></el-table-column>
        <el-table-column prop="class" label="班级" width="200" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200" align="center"></el-table-column>
        <el-table-column prop="sno" label="学号" width="200" align="center"></el-table-column>
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
        listTable1: [
        ],
        listTable2: [
        ],
      };
    },
  
    methods: {
    submitUpload() {
        this.$refs.upload.submit();
      },
    Remove1(file, fileList) {
        console.log(file, fileList);
        this.listTable1=[];
      },
    Remove2(file, fileList) {
        console.log(file, fileList);
        this.listTable2=[];
      },
    Exceed(){
        this.$message.error("最多只能上传1个xls文件");
    },
    UploadFile1(params) {
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
                rowTable.class = sheetArray[item].班级;
                rowTable.email = sheetArray[item].邮箱;
                rowTable.sno = sheetArray[item].学号;
                this.listTable1.push(rowTable);
              }

              console.log(this.listTable1)
            }
          } catch (e) {
            this.$message.warning('文件类型不正确！');
          }
        };
        fileReader.readAsBinaryString(_file);
    },
    UploadFile2(params) {
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
                rowTable.class = sheetArray[item].班级;
                rowTable.email = sheetArray[item].邮箱;
                rowTable.sno = sheetArray[item].学号;
                this.listTable2.push(rowTable);
              }

              console.log(this.listTable2)
            }
          } catch (e) {
            this.$message.warning('文件类型不正确！');
          }
        };
        fileReader.readAsBinaryString(_file);
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