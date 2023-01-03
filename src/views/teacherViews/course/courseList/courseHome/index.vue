<template>
    <div>
        <!-- 课程ID{{ courseId }} -->
        <el-card shadow="none">
            <el-row :gutter="20">
                <el-col :span="4">{{ currentCourse.name }}</el-col>
                <el-col :span="12"><p></p></el-col>
                <el-col :span="4">{{ name }} - {{ currentCourse.level==0?'责任教师':'任课教师' }}</el-col>
            </el-row>
        </el-card>
        <el-tabs type="card" class="tabs-common" v-model="tabValue" @tab-click="handleTabClick">
            <el-tab-pane label="实验项目" name="experiment" class="table-common">
                <el-table :data="experimentList" stripe>
                    <el-table-column prop="name" label="实验名称" width="300"></el-table-column>
                    <el-table-column label="创建时间" width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ new Date(scope.row.createTime).toLocaleString() }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="截止时间" width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ new Date(scope.row.deadline).toLocaleString() }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="实验描述" width="360">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px" class="in-row-long-text">{{ scope.row.introduction }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="gotoExperimentDetailInfo(scope.row.experimentId)">详情</el-button>
                            <el-button size="mini" type="danger" @click="deleteExperimentItem(scope.row.experimentId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 实验项目列表 -->
            </el-tab-pane>
            <el-tab-pane label="实验报告" name="report">

                <!-- 实验报告 -->
            </el-tab-pane>
            <el-tab-pane label="人员" name="person">
                <!-- 课程人员 -->
                <el-table :data="courseStudent" stripe class="table-common">
                    <el-table-column label="学号" width="300">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="getStudentDetailInfo(scope.row)">详情</el-button>
                            <el-button size="mini" type="danger" @click="getStudentCourseGrade(scope.row)">成绩</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="课程通知">
                <!-- 课程通知 -->
                <el-table v-show="!publishNoticeVisible" :data="courseNoticeList" class="table-common">
                    <el-table-column label="通知标题" width="300">
                        <template slot-scope="scope">
                            <i v-if="scope.row.notice.top" class="el-icon-s-flag" style="color: red;"></i>
                            <span >{{ scope.row.notice.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布时间" width="300">
                        <template slot-scope="scope">
                            <span >{{ new Date(scope.row.notice.createTime).toLocaleString() }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布教师" width="300">
                        <template slot-scope="scope">
                            <span>{{ scope.row.teacher.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="showCourseNoticeDetail(scope.row.notice.noticeId)">详情</el-button>
                            <el-button size="mini" @click="opCourseNoticeTop(scope.row.notice.noticeId,scope.row.notice.top)">{{ scope.row.notice.top?'取消置顶':'置顶通知' }}</el-button>
                            <el-button size="mini" type="danger" @click="deleteCourseNoticeItem(scope.row.notice.noticeId)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot="header" slot-scope="scope">
                            <el-button style="margin-right: 5px;" @click="publishNoticeVisible=true">发布通知</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div v-if="publishNoticeVisible">
                    <el-form :inline="true" :model="postNotice" >
                        <el-form-item label="通知标题">
                            <el-input v-model="postNotice.title" placeholder="请输入通知标题" class="input-style"></el-input>
                        </el-form-item>
                        <el-form-item label="置顶通知">
                            <el-switch v-model="postNotice.top"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="publishNotice">发布<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="publishNoticeVisible=false">取消</el-button>
                        </el-form-item>
                    </el-form>
                    <indexVue :value="'请输入通知内容'" @getInput="getNoticeContent"></indexVue>
                </div>
            </el-tab-pane>
            <el-tab-pane label="课程签到">
                <!-- 课程签到 -->
                <el-table :data="courseSignList.signList" class="table-common">
                    <el-table-column label="课程签到" width="300">
                        <template slot-scope="scope">
                            <span>{{ '签到'+(scope.$index+1) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" width="300">
                        <template slot-scope="scope">
                            <span>{{ new Date(scope.row.startTime).toLocaleString() }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" width="300">
                        <template slot-scope="scope">
                            <span>{{ new Date(scope.row.endTime).toLocaleString() }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="showStudentCourseSign(scope.row.signId)">查看学生签到详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot="header" slot-scope="scope">
                            <el-button size="small" style="margin-right: 5px;" @click="postCourseSignVisible=true">发起签到</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="成绩分配">
                <el-row :gutter="20">
                    <el-col :span="8" align="center">
                        <div>
                            <p>实验项目数</p>
                            <p>{{ experimentList.length }}</p>
                        </div>
                    </el-col>
                    <el-col :span="8" align="center">
                        <div>
                            <p>实验成绩占比</p>
                            <p>{{ gradeProportion.experiment }}</p>
                        </div>
                    </el-col>
                    <el-col :span="8" align="center">
                        <div>
                            <p>出勤成绩占比</p>
                            <p>{{ gradeProportion.sign }}</p>
                        </div>
                    </el-col>
                </el-row>
                <div class="grade-proportion-slider">
                    <span>
                        实验项目占比
                    </span>
                    <el-slider v-model="gradeProportion.experiment" show-input></el-slider>
                </div>
                <div class="grade-proportion-slider">
                    <span>
                        出勤成绩占比
                    </span>
                    <el-slider v-model="gradeProportion.sign" show-input></el-slider>
                </div>
                <div >
                    <p style="margin-left: 5px;">各实验占比</p>
                    <el-row :gutter="20" v-for="item,index in experimentList" style="margin-left: 5px;margin-top: 10px;">
                        <el-col :span="4">
                            <span>{{ item.name }}</span>
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="proportion[index]" @input="getExperimentItemProportion(item.experimentId,index)" size="mini" style="display: inline-block;width: 100px;"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <el-button size="small" type="primary" style="float: right;" @click="submitProportion">提交</el-button>
            </el-tab-pane>
        </el-tabs>
        <!-- 学生详细信息模态框 -->
        <el-dialog title="学生信息" :visible.sync="studentInfoDialogVisible">
             <el-row :gutter="2">
                <el-col :span="8" class="text-center">
                    <el-avatar :src="studentInfo.avatar"></el-avatar>
                    <p>{{ studentInfo.name }}</p>
                    <p class="student-selfdesc">{{ studentInfo.selfDesc }}</p>
                    <div class="student-tags">
                        <el-tag :type="'info'"  size="mini" v-for=" item,index in studentTags" :color="colors[index]">{{ item }}</el-tag>
                    </div>
                </el-col>
                <el-col :span="6" align="right">
                    <el-divider direction="vertical" content-position="right"></el-divider>
                </el-col>
                <el-col :span="10">
                    <el-descriptions :column="1">
                        <el-descriptions-item label="学号">{{ studentInfo.studentId }}</el-descriptions-item>
                        <el-descriptions-item label="性别">{{ studentInfo.gender }}</el-descriptions-item>
                        <el-descriptions-item label="学院">{{ studentInfo.school }}</el-descriptions-item>
                        <el-descriptions-item label="邮箱"><el-link>{{ studentInfo.email }}</el-link></el-descriptions-item>
                        <el-descriptions-item label="住地">{{ studentInfo.residence }}</el-descriptions-item>
                    </el-descriptions>
                </el-col>
             </el-row>
        </el-dialog>
        <!-- 通知详情模态框 -->
        <el-dialog title="通知详情" v-if="currentNoticeVisible" :visible.sync="currentNoticeVisible">
            <p class="text-center">{{ currentNotice.notice.title }}</p>
            <div v-html="currentNotice.notice.content"></div>
        </el-dialog>
        <!-- 发起签到模态框 -->
        <el-dialog title="发起签到" v-if="postCourseSignVisible" :visible.sync="postCourseSignVisible">
            <p>请选择起讫时间</p>
            <el-form>
                <el-form-item label="开始时间">
                    <el-date-picker
                    v-model="postCourseSign.startTime"
                    type="datetime"
                    placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                    v-model="postCourseSign.endTime"
                    type="datetime"
                    placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="postCourseSignVisible = false">取 消</el-button>
                <el-button type="primary" @click="publishCourseSign">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 学生成绩 -->
        <el-dialog title="学生成绩" :visible.sync="studentGradeVisible">

        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
    getCourseAllExperiment, deleteExperiment
    , getCourseAllStudent, getDetailPersonInfo, getCourseAllNotice,
    cancelCourseNoticeTop, deleteCourseNotice, publishCourseNotice,
    getCourseSignList, postCourseSignIn, getCourseGradeProportion,
    changeSignExperimentProportion,changeExperimentProportion,getStudentGrade
} from '@/api/teacher'
import indexVue from '@/components/Tinymce/index.vue'

export default {
    components:{indexVue},
    computed: {
        ...mapGetters([
            'userId','name','role'
        ])
    },
    data() {
        return {
            currentCourse: null,
            tabValue: '实验项目',
            experimentList: [],

            // 课程人员信息
            courseStudent: [],

            // 选课学生信息
            studentInfoDialogVisible:false,
            studentInfo: {},
            studentTags: [],
            colors: ['#67C23A', '#E6A23C', '#F56C6C', '#909399'],

            // 课程通知
            courseNoticeList: [],
            postNotice: {
                teacherId: '',
                courseId:'',
                title: '',
                top: false,
                content: '',
                createTime:''
            },
            publishNoticeVisible: false,
            currentNotice: {},
            currentNoticeVisible: false,

            // 签到列表
            courseSignList: [],
            postCourseSign: {
                startTime: null,
                endTime: null,
                courseId: null,
                experimentId: 1,
            },
            postCourseSignVisible: false,

            // 成绩占比
            gradeProportion: {},
            proportion: [23, 45, 67, 89, 34, 56, 12, 45],
            experimentItem: [1, 2, 3, 4, 5, 6, 7],

            studentGradeVisible: false,
            studentGrade: {},
        }
    },
    mounted() {
       this.getCurrentCourse(this.$route.params.courseId)
    },
    methods: {
        getCurrentCourse(courseId) {
          let courseList = JSON.parse(localStorage.getItem('courseList'))
          this.currentCourse = courseList.find(c=>c.courseId===courseId)
        },
        handleTabClick(tab) {
            console.log(" = ", tab)
            if (tab.index == 0) {
                getCourseAllExperiment(this.currentCourse.courseId)
                    .then((res) => {
                        this.experimentList = res.data
                    console.log(res.data)
                    })
                    .catch((err) => {
                        this.$message.error('获取实验项目失败')
                    })
            } else if (tab.index == 2) {
                // 获取课程人员
                if (this.courseStudent.length > 0) {
                    return
                }
                getCourseAllStudent(this.currentCourse.courseId)
                    .then(res => {
                        this.courseStudent = res.data
                    console.log(res.data)
                    })
                    .catch(err => {
                    this.$message.error("请求错误")
                })
            } else if (tab.index == 3) {
                // 获取课程通知
                if (this.courseNoticeList.length > 0) {
                    return
                }
                getCourseAllNotice(this.currentCourse.courseId)
                    .then(res => {
                        this.courseNoticeList = res.data.notices
                        console.log(this.courseNoticeList)
                    })
                    .catch((err) => {
                        this.$message.error("获取课程通知失败")
                    })
            } else if (tab.index == 4) {
                // 获取签到列表
                if (this.courseSignList.length > 0) {
                    return
                }
                getCourseSignList(this.currentCourse.courseId)
                    .then((res) => {
                        console.log(res.data)
                        this.courseSignList = res.data
                    })
                    .catch((err) => {
                        this.$message.error("获取签到列表失败")
                })
            } else if (tab.index == 5) {
                if (this.gradeProportion.experimentItem) {
                    return
                }
                this.getGradeProportion()
            }
        }
        ,
        gotoExperimentDetailInfo(experimentId) {
            // 查看实验详情
        }
        ,
        deleteExperimentItem(experimentId) {
            this.$confirm('是否要删除该实验项目？')
                .then(_ => {
                    this.$message.success("删除")
                    // return
                    deleteExperiment(experimentId)
                        .then((res) => {
                            this.$message.success('已成功删除')
                        }).catch(err => {
                            this.$message.error('未知错误')
                        })

            }).catch(_=>{})
            // 删除实验项目
        },
        // 获取学生详细信息
        getStudentDetailInfo(studentId) {
            // studentId = 2050001
            getDetailPersonInfo(studentId, 'student')
                .then(res => {
                    this.studentInfo = res.data
                    this.studentInfoDialogVisible = true
                    this.studentTags = res.data.tags.split(',')
                    console.log(res.data)
                })
                .catch(err => {
                this.$message.error("获取学生信息失败")
            })
        }
        ,
        // 获取学生课程成绩
        getStudentCourseGrade(studentId) {
            console.log(studentId)
            getStudentGrade(this.currentCourse.courseId, studentId)
                .then((res) => {
                    this.studentGrade = res.data
                    console.log(res.data)
                }).catch(err => {
                console.log(err)
            })
        }
        ,
        deleteCourseNoticeItem( noticeId) {
            // 删除课程通知
            deleteCourseNotice(noticeId)
                .then(res => {
                this.$message.success("删除成功")
                this.courseNoticeList = this.courseNoticeList.filter(i=>i.notice.noticeId!=noticeId)
                })
                .catch(err => {
                this.$message.error("删除失败")
            })
        }
        ,
        showCourseNoticeDetail(noticeId) {
            // 展示通知详情
            this.currentNotice = this.courseNoticeList.find(n => n.notice.noticeId === noticeId)
            this.currentNoticeVisible = true
        }
        ,
        opCourseNoticeTop(noticeId, option) {
            // 对通知取消置顶或将其置顶
            if (option == true) {
                //取消置顶
                cancelCourseNoticeTop(noticeId)
                    .then(res => {
                        this.courseNoticeList.find(c => c.notice.noticeId == noticeId)
                        this.$message.success("已取消置顶")
                    }).catch((err) => {
                        this.$message.error("无法取消置顶")
                })
            }
        }
        ,
        getNoticeContent(value) {
            this.postNotice.content = value
            console.log(this.postNotice)
        }
        ,
        publishNotice() {
            this.postNotice.teacherId = this.userId
            this.postNotice.courseId = this.currentCourse.courseId
            this.postNotice.createTime = new Date()
            publishCourseNotice(this.postNotice)
                .then((res) => {
                    this.courseNoticeList.push(res.data)
                    this.$message.success("发布成功")
                    this.publishNoticeVisible = false
                })
                .catch(err => {
                this.$message.error("发布失败")
            })
            
        }
        ,
        showStudentCourseSign(signId) {
            // 查看学生签到详情

        }
        ,

        publishCourseSign() {
            let nowTime = new Date()
            let time1 = new Date(this.postCourseSign.startTime)
            let time2 = new Date(this.postCourseSign.endTime)
            if (time2 - time1 <= 0) {
                this.$message.error("结束时间晚于开始时间")
                return
            }
            if (nowTime - time2 >= 0) {
                this.$message.error("结束时间不合理")
                return
            }
            this.postCourseSign.courseId = this.currentCourse.courseId
            this.postCourseSignVisible = false
            this.postCourseSign.startTime = new Date(this.postCourseSign.startTime).toISOString()
            this.postCourseSign.endTime = new Date(this.postCourseSign.endTime).toISOString()
            console.log(this.postCourseSign)

            postCourseSignIn(this.postCourseSign).then((res) => {
                console.log(res.data)
                this.courseSignList.unshift(res.data)
            }).catch((err)=>{this.$message.error("发起签到失败")})
        }
        ,

        getGradeProportion() {
            getCourseGradeProportion(this.currentCourse.courseId)
                .then((res) => {
                    this.gradeProportion = res.data
                console.log(res.data)
                }).catch(err => {
                this.$message.error("请求出错")
            })
        }
        ,
        getExperimentItemProportion(Id,index) {
            let item = {
                courseId: this.currentCourse.courseId,
                experimentId: Id,
                proportion:this.proportion[index]
            }
            this.experimentItem[index] = item
            console.log(this.experimentItem)
        }
        ,
        submitProportion() {
            let courseGrade = {
                courseId: this.currentCourse.courseId,
                experiment: this.gradeProportion.experiment,
                sign: this.gradeProportion.sign,
            }
            changeSignExperimentProportion(courseGrade).then((res) => {
                this.gradeProportion.experiment = res.data.experiment;
                this.gradeProportion.sign = res.data.sign
            }).catch(err => {
                this.$message.error("更改失败")
            })
            for (let index = 0; index < this.experimentList.length; index++) {
                const element = this.experimentItem[index];
                changeExperimentProportion(element).then((res) => {
                    this.proportion[index] = res.data.proportion
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
}
</script>

<style  scoped>
.tabs-common{
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
}
.table-common{
    margin: 0 auto;
    margin-left: 5px;
}
.in-row-long-text{
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
}

.text-center{
    text-align: center;
    font-size: medium;
    color: #303133;
}
.student-tags{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around ;
    /* width: fit-content; */
}
.student-selfdesc{
    font-size: small;
    color: #606266;
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

.input-style{
    width: 700px;
    height: 25px;
}
.grade-proportion-slider{
    margin-left: 5px;
    margin-right: 5px;
}
.grade-proportion-slider el-slider{
    width: 600px;
}
</style>