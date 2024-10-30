<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <!--<Footer />-->
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
//import Footer from "@/components/Footer.vue";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

export default {
  name: "App",
  components: { AppHeader /*Footer*/ },
  async created() {
    await tf.setBackend("webgl");
  },
};
</script>
<style>
html {
  background: url("./assets/background.jpg");
  background-repeat: repeat;
  height: 100%;
}
</style>
