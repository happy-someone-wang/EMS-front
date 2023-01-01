<template>
    <div>
        <el-card class="card-personalinfo">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="personal-col">
                        <div><el-avatar :size="size" src="https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640"></el-avatar></div>
                        <span>刘一飞</span>
                        <p class="personal-desc">海纳百川，有容纳大</p>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="personal-phone-site">
                        <p><i class="el-icon-phone"></i>15987453658</p>
                        <p><i class="el-icon-message">2051698@tongji.edu.cn</i></p>
                        <p><i class="el-icon-s-home">湖南省广元市</i></p>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style  scoped>
.card-personalinfo{
    margin: 15px;
}
.personal-col{
    text-align: center;
}
.personal-desc{
    font-size: small;
    color: #909399;
}
.personal-phone-site{
    font-size: medium;
    color: #606266;
}
.personal-phone-site p{
    margin: 0;
    line-height: 30px;
}
</style>