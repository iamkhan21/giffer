<template>
  <Header />
  <el-main>
    <router-view />
  </el-main>
  <Footer />
</template>

<script>
import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";

export default {
  components: { Footer, Header },
};
</script>

<style lang="scss">
@font-face {
  font-family: Atkinson;
  src: url("assets/fonts/Atkinson-Hyperlegible-Regular-102a.woff2")
      format("woff2"),
    url("assets/fonts/Atkinson-Hyperlegible-Regular-102.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: Atkinson;
  src: url("assets/fonts/Atkinson-Hyperlegible-Bold-102a.woff2") format("woff2"),
    url("assets/fonts/Atkinson-Hyperlegible-Bold-102.woff") format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Atkinson", Helvetica, Arial, sans-serif;
  background-color: #fff;
}
</style>
