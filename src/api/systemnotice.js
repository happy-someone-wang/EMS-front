import request from '@/utils/request'

export function getnoticelist() {
    return request({
        url: '/notice/systemNoticeList',
        method: 'get',
    })
}

export function getnotice(noticeId) {
    return request({
        url: '/notice/systemNotice',
        method: 'get',
        params:{
            noticeId: noticeId,
        }
    })
}

export function postnotice(data) {
    return request({
        url: '/notice/systemNotice',
        method: 'post',
        data
    })
}
