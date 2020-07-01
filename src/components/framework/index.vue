<!--  -->
<template>
  <div class='qiankun'>
    <div ref='subview' id='subview'></div>
  </div>
</template>

<script>
import { registerMicroApps, setDefaultMountApp, start } from "qiankun";
export default {
  data() {
    return {};
  },
  components: {},

  computed: {},

  mounted() {
    registerMicroApps(
      [
        {
          name: "vue-app1",
          entry: "//localhost:8091",
          activeRule: "/app1",
          container: "#subview"
        },
        {
          name: "vue-app2",
          entry: "//localhost:8092",
          activeRule: "/app2",
          container: "#subview"
        }
      ],
      {
        beforeMount: [
          app => {
            console.log("beforeMount", app);
          }
        ]
      }
    );
    start({
      sandbox: { strictStyleIsolation: true }
    });
  },
  methods: {}
};
</script>
<style lang='less' scoped>
.qiankun {
  height: 100%;
}
</style>