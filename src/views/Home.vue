<template>
  <article>
    <section class="intro">
      <h1 class="intro-header">Your easy way to create gifs</h1>
      <el-button class="intro-btn" type="primary" plain
        >Try giffer right now
      </el-button>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<style>
.intro .intro-btn {
  font-size: 24px;
  font-weight: 700;
}
</style>

<style lang="scss" scoped>
$color_1: #409eff;
$color_2: #ec2f4b;
$direction: to right;

.intro {
  &-header {
    font-size: 64px;
    font-weight: 900;
    line-height: 1.05;
    margin: 0 0 30px;
    background: -webkit-linear-gradient(
      $direction,
      $color_1,
      $color_2
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient($direction, $color_1, $color_2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;
}
</style>
