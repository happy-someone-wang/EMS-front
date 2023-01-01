
const topNoticeList = [
    { id: 001, title: '2023年元旦法定节假日放假通知', createTime: '2022-12-29 16:55:56', content: '内容为空' },
    { id: 002, title: '关于实验教学系统维护的通知', createTime: '2022-12-30 16:55:56', content: '内容为空' },
]


const NoticeList = [
    { id: 101, title: '关于启用实验教学系统的通知', createTime: '2022-12-26 16:55:56', content: '内容为空' },
    { id: 102, title: '关于启用实验教学系统的通知', createTime: '2022-12-26 16:55:56', content: '内容为空' },
    { id: 103, title: '关于启用实验教学系统的通知', createTime: '2022-12-26 16:55:56', content: '内容为空' },
    { id: 104, title: '关于启用实验教学系统的通知', createTime: '2022-12-26 16:55:56', content: '内容为空' },
    { id: 105, title: '关于启用实验教学系统的通知', createTime: '2022-12-26 16:55:56', content: '内容为空' },
    { id: 106, title: '关于启用实验教学系统的通知', createTime: '2022-12-26 16:55:56', content: '内容为空' },
]

module.exports = [

    {
        url: '/vue-admin-template/notice/topnotice',
        type: 'get',
        response: _ => {
            return {
                code: 200,
                data: topNoticeList
            }
        }
    },
]