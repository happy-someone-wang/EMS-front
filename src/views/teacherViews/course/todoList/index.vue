<template>
    <div>
        <el-row class="tac">
            <el-col :span="4">
                <el-menu style="height: 100vh" :default-active="current_exp" class="el-menu-vertical-demo"
                    @select="selectCourse">
                    <el-menu-item v-for="course in courseTable" :key="course.courseId" :index="course.courseId">
                        <i class="el-icon-setting"></i>
                        <span slot="title">{{ course.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getTeacherCourseList,getTeacherReportList } from "@/api/teacher";

export default {
    name: "TodoList",
    computed: {
        ...mapGetters(["userId", "roles"]),
    },
    data() {
        return {
            courseTable: [],
            current_exp: "",
            resourceTable: [],
            file: "",
            filename: "",
            courseId: "",
            downloadName: [],
            downloadUrl: [],
        }
    },
    mounted() {
        console.log("当前我的ID和身份为", this.userId, this.roles);
        this.flush();
    },

    methods: {
        selectReport(index) {
            this.courseId = index
            getresources(index).then((res) => {
                console.log("当前的课程文件信息为", res.data);
                this.resourceTable = res.data.resourceList;
                console.log("当前的课程文件信息为", this.resourceTable);
            });
        },
        flush() {
            getTeacherCourseList(this.userId).then((res) => {
                console.log("当前的课程信息为", res.data);
                this.courseTable = res.data;
                console.log("当前的课程信息为", this.courseTable);
            });
        },
        submitUpload() {
            let formdata = new FormData()
            formdata.append("file", this.file, this.filename)
            formdata.append("teacherId", this.userId)
            formdata.append("courseId", this.courseId)
            formdata.append("type", 0)
            console.log(formdata)
            // uploadResource(formdata).then((res) => {
            //   console.log(res);
            // });
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            // 自定义上传
            this.$axios
                .post('http://localhost:7999/resource/upload', formdata, config)
                .then((res) => {
                    alert(res.data.status);
                    console.log(res)
                })
                .catch((err) => {
                    //上传失败回调函数
                    console.log(err)
                })
            this.flush()
        },
        handleChange(file) {
            this.file = file.raw// 拿到文件的信息
            console.log(file)
            this.filename = file.name
        },
        handlePull(row) {
            let a = document.createElement('a')
            a.href = row.filePath;
            a.target = '_blank'//在新窗口打开
            a.download = row.fileName;
            console.log(a);
            a.click();
        },
        handleDelete(row) {
            deleteresources(row.resourceId).then((res) => {
                this.flush();
                console.log(res);
            });
        }

    }
}
</script>

<style  scoped>

</style>