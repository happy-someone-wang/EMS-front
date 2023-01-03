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

/**
 * 获取课程所有实验
 */

export function getCourseAllExperiment(courseId) {
    return request({
        url: '/experiment/getExperimentList',
        method: 'get',
        params: {
            courseId: courseId
        }
    })
}

/**
 * 删除实验项目
 */

export function deleteExperiment(experimentId) {
    return request({
        url: '/experiment/deleteExperiment',
        method: 'delete',
        params: {
            experimentId: experimentId
        }
    })
}

export function getCourseAllStudent(courseId) {
    return request({
        url: '/course/courseStudent',
        method: 'get',
        params: {
            courseId:courseId
        }
    })
}

export function getDetailPersonInfo(Id, role) {
    return request({
        url: '/person',
        method: 'get',
        params: {
            id: Id,
            role: role
        }
    })
}

/**
 * 获取课程的所有通知
 */

export function getCourseAllNotice(courseId) {
    return request({
        url: '/notice/courseNoticeList',
        method: 'get',
        params: {
            courseId: courseId
        }
    })
}

/**
 * 取消课程通知置顶
 */

export function cancelCourseNoticeTop(noticeId) {
    return request({
        url: '/notice/courseNotice/utop',
        method: 'get',
        params: {
            noticeId: noticeId
        }
    })
}

/**
 * 删除课程通知
 */

export function deleteCourseNotice(noticeId) {
    return request({
        url: '/notice/courseNotice',
        method: 'delete',
        params: {
            noticeId: noticeId
        }
    })
}

/**
 * 发布课程通知
 */
export function publishCourseNotice(notice) {
    return request({
        url: '/notice/courseNotice',
        method: 'post',
        data:notice
    })
}

/**
 * 获取课程的签到列表
 */

export function getCourseSignList(courseId) {
    return request({
        url: '/grade/courseSignList',
        method: 'get',
        params: {
            courseId: courseId,
        }
    })
}

/**
 * 发起课程签到
 */

export function postCourseSignIn(courseSign) {
    return request({
        url: '/grade/publishsign',
        method: 'post',
        data: courseSign,
        headers:{"Content-Type":"application/json"}
    })
}

/**
 * 获取课程成绩组成
 */

export function getCourseGradeProportion(courseId) {
    return request({
        url: '/grade/proportion',
        method: 'get',
        params: {
            courseId: courseId,
        }
    })
}

/**
 * 更改课程成绩组成
 */
export function changeSignExperimentProportion(data) {
    return request({
        url: '/grade/proportion',
        method: 'post',
        data: data
    })
}

/**
 * 更改实验项目占比
 */

export function changeExperimentProportion(data) {
    return request({
        url: '/grade/proportion/experiment',
        method: 'post',
        data: data,
    })
}

/**
 * 获取学生课程成绩
 */

export function getStudentGrade(courseId, studentId) {
    return request({
        url: '/grade/studentGrade',
        method: 'get',
        params: {
            studentId: studentId,
            courseId:courseId
        }
    })
}