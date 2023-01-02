import request from '@/utils/request'

export function uploadFile(file) {
    return request({
        url: '/notice/image',
        method:'post',
        data: file,
    })
}

export function getTeacherCourseList(teacherId) {
    return request({
        url: '/course/getTeacherCourseList',
        method:'get',
        params: {
            teacherId: teacherId
        }
    })
}

export function postExperiment(name,courseId,createTime,deadline,introduction) {
    return request({
        url: '/experiment/postExperiment',
        method:'post',
        params: {
            name: name,
            courseId: courseId,
            createTime: createTime,
            deadline: deadline,
            introduction: introduction,
        }
    })
}
