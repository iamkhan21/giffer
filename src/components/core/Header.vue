<template>
  <el-header class="header" height="auto">
    <div>
      <img src="../../assets/giffer.svg" alt="giffer logo" height="50" />
    </div>
    <nav role="navigation">
      <router-link class="link" to="/">Main</router-link>
      <router-link class="link" to="/editor">Editor</router-link>
    </nav>
  </el-header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
  border-bottom: 1px solid #dcdfe6;
}

.brand {
  margin: 0 0 5px;
}

.link {
  font-size: 1.1em;
  font-weight: 700;
  color: #303133;
  text-decoration: none;

  &.router-link-exact-active {
    color: #409eff;
  }

  & + .link {
    margin-left: 15px;
  }
}
</style>
