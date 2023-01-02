import request from '@/utils/request'

export function adduser(data) {
    return request({
        url: '/admin/add',
        method: 'post',
        data
    })
}

export function getusers() {
    return request({
        url: '/admin/check?id=0&type=all',
        method: 'get',
    })
}

export function getuser(id,type) {
    return request({
        url: '/admin/check',
        method: 'get',
        params: {
            id: id,
            type: type,
        }
    })
}
