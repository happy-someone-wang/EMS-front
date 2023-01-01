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
            token:token
        }
    })
}

