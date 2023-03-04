<template>
  <div class="root">
    <Header v-if="$store.state.userlogin"></Header>
    <div class="main">
      <div class="contain">
        <router-view :key="$route.path" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: { Header },
  beforeCreate() {
    this.$http.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      this.$http.get("User/myProfile").then((res) => {
        if (res.data.state) this.$store.dispatch("user", res.data.data);
      });
    }
  },
  created() {
    if (!this.$store.state.userlogin) {
      document.body.classList.add("imglogin");
    } else {
      document.body.classList.add("imghome");
    }
  },
  data: function () {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Merienda&display=swap");

:root {
  --dark: #111;
  --dark-light: rgb(146, 145, 145);
  --primary: #28a745;
  --light: #fff;

  --font-family-page: "Merienda";
  --bs-link-hover-color: #fff !important;
}
.active {
  background-color: #f5f5f5;
  color: var(--dark) !important;
}
.sub-router {
  color: var(--light) !important;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-family-page);
}
.Invalid {
  color: red;
}
button,
.bt,
a {
  cursor: pointer;
  appearance: none;
  outline: none;
  background: none;
}

.imglogin {
  background-image: url("@/assets/bg.png");
  background-size: cover;
}
.imghome {
  background-color: #f5f5f5;
}
.root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .main {
    display: flex;
    height: calc(100vh - 4rem);
    .contain {
      width: 100%;
      // padding: 20px;
    }
  }
  .log-root {
    width: 72px;
  }

  @media (max-width: 768px) {
    .contain {
      overflow: auto;
    }
  }
  @media (min-width: 769px) {
    .contain {
      overflow-x: hidden;
    }
    .side {
      min-width: 250px;
    }
  }
}
</style>
