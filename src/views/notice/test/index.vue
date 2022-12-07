
<template>
    <div>
        test
    </div>
</template>

<script>
import { getList } from "@/api/table"
export default {
    name: 'EMSIndex',

    data() {
        return {
            
        };
    },

    mounted() {
        getList();
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>