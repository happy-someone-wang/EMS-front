import request from '@/utils/request'

export function getresources(courseId) {
    return request({
        url: '/resource/getall',
        method: 'get',
        params: {
            courseId: courseId
        }
    })
}
export function deleteresources(resourceId) {
    return request({
        url: '/resource/delete',
        method: 'get',
        params: {
            resourceId: resourceId
        }
    })
}
export function uploadresources (form){
    return request({
        url: '/resource/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:form,
    })
}