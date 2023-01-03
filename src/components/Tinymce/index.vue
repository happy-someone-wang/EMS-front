<template>
    <div class="tinymce-box">
        <Editor v-model="myValue" :init="init" :disabled="disabled">
        </Editor>
    </div>
</template>

<script>

import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
// import 'tinymce/models/dom/model'
import 'tinymce/themes/silver'
// import 'tinymce/icons/default'
import axios from 'axios'

import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/plugins/advlist' // 自动列表
import 'tinymce/plugins/lists'
import 'tinymce/plugins/emoticons' // 表情
import 'tinymce/plugins/emoticons/js/emojis'
import {uploadFile} from '@/api/teacher'
export default {
    components: { Editor },
    // name: 'tinymce',
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        plugins: {
            type: [String, Array],
            default: () => ( 'lists advlist image media table wordcount emoticons ' )
        },
        toolbar: {
            type: String,
            default: () => ('undo redo | fontfamily  fontsize | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | emoticons image media table | removeformat | submit')
        }
    },
    data() {
        return {
            init: {
                selector: 'ID',
                height: 1000,
                language_url: '/static/tinymce/langs/zh-Hans.js',
                language: 'zh-Hans',
                skin: 'oxide',
                skin_url: '/static/tinymce/skins/ui/oxide',
                content_css: '/static/tinymce/skins/content/default/content.css',
                content_style: 'p {margin:8px }',
                font_size_formats: "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px",
                plugins: this.plugins,
                toolbar: this.toolbar,
                branding: false,
                menubar: false,
                // 自定义提交按钮
                setup: (editor) => {
                    editor.ui.registry.addButton('submit', {
                        // text: 'submit',
                        icon: 'upload',
                        onAction: () => { this.submit() }
                    })
                },
                // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
                images_upload_handler: (blobInfo,success,failure) => {
                    const p = new Promise((resolve, reject) => {
                        let formData = { 'file': blobInfo.base64(), 'fileName': blobInfo.filename() }
                        axios.post('http://localhost:7999/notice/image',formData)
                            .then((res) => {
                                // resolve(res.data.location)
                                success(res.data.location)
                                console.log("res.data = ",res.data)
                            }).catch(() => {
                                failure('Image upload failed due to a XHR Transport error. Code: ')
                                this.$message.error("上传图片出错")
                            })
                    })
                    return p
                }
            },
            myValue: this.value,
            imgList: [],
            imgUrlList: [],
        }
    },
    mounted() {
        tinymce.init({})
    },
    methods: {
        // 自定义事件，清空内容
        submit() {
            // console.log(this.myValue)
            this.$emit('submit', this.myValue)
        }
    },
    watch: {
        value(newValue) {
            this.myValue = newValue
        },
        myValue(newValue) {
            this.$emit('getInput', newValue)
        }
    }
}

</script>
<style scoped>

</style>