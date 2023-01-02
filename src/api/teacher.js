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