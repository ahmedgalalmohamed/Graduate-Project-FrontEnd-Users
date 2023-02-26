<template>
  <div class="profile-update">
    <div class="Top"></div>
    <router-view class="component"></router-view>
    <div class="Bottom"></div>
  </div>
</template>

<script>
export default {
  name: "ProfileUpdate",
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.profile-update {
  display: flex;
  height: 100%;
  flex-direction: column;
  // align-items: center;
  .Top {
    background: transparent linear-gradient(180deg, #1a73e8 0%, #0d3a74 100%) 0%
      0% no-repeat padding-box;
    height: 20rem;
  }
  .Bottom {
    background: #f5f5f5 0% 0% no-repeat padding-box;
  }
  .component {
    position: absolute;
    left: calc((100% - 70%) / 2);
    top: 20%;
  }
}
</style>
