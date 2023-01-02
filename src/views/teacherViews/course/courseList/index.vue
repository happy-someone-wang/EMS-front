<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="24" class="center">
                    <el-avatar :size="'small'" :src="avatar"></el-avatar>
                    
                    <span>{{ name }}老师，您本学期共授课{{' '+ courseList.length +' ' }}门，在其中{{' '+ responsibleCourseNum+' ' }}门课中担任责任教师</span>
                </el-col>
            </el-row>
        </el-card>
        <el-card v-for="(course,index) in courseList" :key="course.courseId" 
            class="course-card" shadow="hover" @click="gotoCourseHome(course.courseId)">
            <el-row :gutter="20" class="course-list-header">
                <el-col :span="4">课号</el-col>
                <el-col :span="4">课程名称</el-col>
                <el-col :span="4">上课时间</el-col>
                <el-col :span="4">授课地点</el-col>
                <el-col :span="4">学分</el-col>
                <el-col :span="4">我的角色</el-col>
                <!-- <el-col :span="4">操作</el-col> -->
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">{{ course.courseId }}</el-col>
                <el-col :span="4">{{ course.name }}</el-col>
                <el-col :span="4">{{ new Date(course.startTime).toLocaleDateString() }}</el-col>
                <el-col :span="4"><el-link type="primary" @click="gotoTencentMeeting(course.courseId)">{{ '腾讯会议室' }}</el-link></el-col>
                <el-col :span="4">{{ course.credit }}</el-col>
                <el-col :span="4">{{ course.level==0?'责任教师':'任课教师' }}</el-col>
                <!-- <el-col :span="4"><el-button type="text">进入课程主页</el-button></el-col> -->
            </el-row>
        </el-card>
        <indexVue :value="'富文本编辑器'"></indexVue>
    </div>
</template>

<script>
import { getTeacherCourseList } from '@/api/teacher';
import { mapGetters } from 'vuex';
import indexVue from  '@/components/Tinymce/index.vue';

export default {
    components:{indexVue},
    computed: {
        ...mapGetters([
            'userId','roles','avatar','name'
        ]),
        responsibleCourseNum(){
            let result = this.courseList.filter(c=>c.level==0).length
            return result
        }
    },
    data() {
        return {
            courseList:[],
        }
    },

    mounted() {
        this.getData()
    },

    methods: {
        getData() {
            getTeacherCourseList(this.userId)
                .then((res) => {
                    this.courseList = res.data
                    console.log(res.data)
                })
                .catch((err) => {
                    this.$message.error("网络出错")
                })
        }
        ,
        gotoTencentMeeting(courseId) {
            window.open("https://meeting.tencent.com","_blank")
        }
        ,
        gotoCourseHome(courseId) {
            this.$router.push({ path: '/teacher/course/courseList/' + courseId })
            console.log('跳转到courseID'+courseId)
        }
    }
}
</script>

<style  scoped>
*{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.center{
    display: flex;
    justify-content: baseline;
    align-items: center;
}

.course-list-header{
    font-size: small;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB";
    color: #606266;
    line-height: 25px;
    margin: 0;
}

.course-card{
    padding: 0;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
}
</style>