import request from '@/utils/request'

export function getTopNoticeList() {
    return request({
        url: '/api/notice/courseNotices',
        method: 'get',
        params: {
            courseId: 30001
        }
    })
}