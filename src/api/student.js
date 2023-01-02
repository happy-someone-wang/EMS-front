import request from '@/utils/request'

export function login(userId, password, role) {
    return request({
        url: '/login/userLogin',
        method: 'get',
        params: {
            userId: userId,
            password: password,
            role: role
        }
    })
}


export function logout() {
    return request({
        url: '/login/userLogout',
        method: 'get',
    })
}

export function getInfo(token) {
    return request({
        url: '/login/getUserInfo',
        method: 'get',
        params: {
            token: token
        }
    })
}

export function activateAccount(form) {
    return request({
        url: '/login/activateAccount',
        method: 'get',
        params: {
            userId: form.username,
            password: form.password,
            email: form.email,
            role: form.role
        }
    })
}

export function getStudentCourseList(studentId) {
    return request({
        url: '/course/getStudentCourseList',
        method: 'get',
        params: {
            studentId: studentId,
        }
    })
}

export function sendForgetEmail(userId, role) {
    return request({
        url: '/login/sendForgetEmail',
        method: 'get',
        params: {
            userId: userId,
            role: role
        }
    })
}

export function resetPassword(userId, role, password) {
    return request({
        url: '/login/resetPassword',
        method: 'get',
        params: {
            userId: userId,
            role: role,
            password: password
        }
    })
}



