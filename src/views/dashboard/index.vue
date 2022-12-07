<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import admin from "./admin";
import student from "./student";
import teacher from "./teacher";
export default {
  name: "Dashboard",
  components: { admin, student, teacher },
  data() {
    return {
      currentRole: null,
    };
  },
  computed: {
    ...mapGetters(["roles"]),
  },
  created() {
    if (this.roles.includes("admin")) {
      this.currentRole = "admin";
    } else if (this.roles.includes("student")) {
      this.currentRole = "student";
    } else if (this.roles.includes("teacher")) {
      this.currentRole = "teacher";
    }
    console.log("当前的用户为", this.currentRole);
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
