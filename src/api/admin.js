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
        url: '/admin/check',
        method: 'get',
        param:{
            id:0,
            type:"all"
        }
    })
}

export function getuser(id,type) {
    return request({
        url: '/admin/check',
        method: 'get',
        param:{
            id:id,
            type:type
        }
    })
}
