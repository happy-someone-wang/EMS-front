<template>
    <div>
        <el-row class="tac">
          <el-col :span="4">
            <el-menu
              style="height: 100vh"
              :default-active="current_exp"
              class="el-menu-vertical-demo"
              @select="selectCourse"
            >
              <el-menu-item
                v-for="course in courseTable"
                :key="course.courseId"
                :index="course.courseId"
              >
                <i class="el-icon-setting"></i>
                <span slot="title">{{ course.name }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="20">
            
          </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getStudentCourseList } from "@/api/student"
export default {
    name: 'EMSIndex',
    computed: {
      ...mapGetters(["userId", "roles"]),
    },
    data() {
        return {
            courseTable: [],
            current_exp: "",
        };
    },

    mounted() {
        console.log("当前我的ID和身份为", this.userId, this.roles);
        getStudentCourseList(this.userId).then((res) => {
          console.log("当前的课程信息为", res.data);
          this.courseTable = res.data;
          console.log("当前的课程信息为", this.courseTable);
        });
    },

    methods: {
        selectCourse(index){
            console.log(index);
        }
    },
};
</script>

<style lang="scss" scoped>

</style>