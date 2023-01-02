<template>
    <div>
        课程ID{{ courseId }}
    </div>
</template>

<script>

export default {
    data() {
        return {
            courseId:null,
        }
    },
    mounted() {
       this.courseId = this.$route.params.courseId
    },
    methods: {

    }
}
</script>

<style  scoped>

</style>