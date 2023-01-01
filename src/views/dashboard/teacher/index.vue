<template>
    <div>
        <!-- teacher -->
        <el-row :gutter="20">
            <el-col :span="12">
                <!-- 通知公告列表 -->
                <el-card class="card-common">
                    <div class="card-header">
                        <span>通知公告</span>
                        <el-button class="card-header-button" type="text">更多</el-button>
                    </div>
                    <el-divider class="card-divider"></el-divider>
                    <!-- 置顶通知 -->
                    <ul class="card-list-ul" v-if="topNoticeList.length">
                        <li v-for="item in topNoticeList" :key="item.id">
                           <i class="el-icon-s-flag" style="color: red;"></i> {{ item.title }} 
                            <span class="card-list-li-date">{{ new Date(item.createTime).toLocaleDateString() }}</span>
                        </li>
                    </ul>
                    <ul class="card-list-ul">
                        <li v-for="item,index in NoticeList" :key="item.id">
                            <span>{{ index+1 + '.' }}</span>  {{ item.title }} 
                            <span class="card-list-li-date">{{ new Date(item.createTime).toLocaleDateString() }}</span>
                        </li>
                    </ul>
                </el-card>

                <div class="gap-vertical"></div>
                <!-- 待办事项 -->
                <el-card class="card-common">
                    <div class="card-header">
                        <span>我的待办</span>
                        <el-button class="card-header-button" type="text">更多</el-button>
                    </div>
                    <el-divider class="card-divider"></el-divider>
                    <ul class="card-list-ul">
                        <li v-for="item,index in toDoList" :key="item.id">
                            <span>{{ index+1 + '.' }}</span>  {{ item.title }} 
                            <span class="card-list-li-date">{{ new Date(item.createTime).toLocaleDateString() }}</span>
                        </li>
                    </ul>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="card-common" style="height: 640px;">
                    <div class="card-header">
                        <span>我的授课</span>
                        <el-button class="card-header-button" type="text">全部</el-button>
                    </div>
                    <el-divider class="card-divider"></el-divider>
                    <el-card v-for="(course,index) in courseList" :key="course.courseId" 
                        class="card-course" :style="'background-color:'+ colors[index%colors.length]+';'"
                        shadow="hover">
                        {{ course.name }}
                    </el-card>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {getTopNoticeList} from '@/api/notice'
import { resolve } from 'path';


export default {
    name: 'EMSIndex',

    data() {
        return {

            topNoticeList: [
                { id: 1001, title: '2023年元旦法定节假日放假通知', createTime: '2022-12-29 16:55:56', content: '内容为空' },
                { id: 2002, title: '关于实验教学系统维护的通知', createTime: '2022-12-30 16:55:56', content: '内容为空' },
            ],
            NoticeList: [
                { id: 101, title: '关于校内实行防疫新十条的说明', createTime: '2022-12-26 16:55:56', content: '内容为空' },
                { id: 102, title: '教育部产学研优秀项目公示', createTime: '2022-12-26 16:55:56', content: '内容为空' },
                { id: 103, title: '安楼停水通知', createTime: '2022-12-26 16:55:56', content: '内容为空' },
                { id: 104, title: '关于启用实验教学系统的通知', createTime: '2022-12-26 16:55:56', content: '内容为空' },
                { id: 105, title: '同济后勤集团服务满意度调研', createTime: '2022-12-26 16:55:56', content: '内容为空' },
                { id: 106, title: '期末考试纪律要求', createTime: '2022-12-26 16:55:56', content: '内容为空' },
            ],
            toDoList: [
                {id:201,title:'计算机网络课程设计访问控制列表ACL实验',createTime:'2022-12-25 16:55:56'}
            ],

            colors : ['#ede3e7','#ccccd6','#2b73af','#93b5cf','#12a182','#248067','#c6dfc8'],
            courseList: [
                { courseId: 301, name: '微观经济学', },
                { courseId: 302, name: '软件工程课程设计', },
                { courseId: 303, name: '计算机网络课程设计', },
                { courseId: 304, name: '数据库系统课程设计', },
                { courseId: 305, name: '操作系统课程设计', },
                { courseId: 305, name: '物理实验下', },
                { courseId: 305, name: '软件工程经济学', },
                { courseId: 305, name: '软件测试', },
                
            ],
        };
    },

    mounted() {
        this.getTopNotice()
    },

    methods: {
        getTopNotice() {
            getTopNoticeList()
                .then(res => {
                    this.topNoticeList = res.data
                    console.log("res = ", res)
                    // resolve(res.data)
                })
                .catch(err => {
                    console.log("err")
                })
        }
    },
};
</script>

<style lang="scss" scoped>

.card-common{
    background-color: #fff;
    overflow: hidden;
    padding: 0;
    height: 310px;
}
.card-header{
    height: 30px;
    font-size: small;
    line-height: normal;
}

.card-header-button{
    float: right;
    padding: 3px 0;
}

.card-divider{
    margin: 0 0px;
    padding: 0;
}

.card-list-ul{
    list-style: none;
    line-height: 30px;
    font-size: 16px;
    padding: 0;
    margin: 0;
    color: #303133;
    cursor: pointer;
}

.card-list-ul li:hover{
    color: #909399;
}

.card-list-li-date{
    float: right;
    padding: 0 5px;
    color: #909399;
}

.gap-vertical{
    height: 20px;
}

.card-course{
    width: 25%;
    height: 100px;
    margin: 25px 0 0 25px;
    display: inline-block;
    cursor: pointer;
}
</style>