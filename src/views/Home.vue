<template>
  <div class="home">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
      <div class="carousel-inner">
        <div v-for="(img, index) in imgs" class="carousel-item" :class="index == 0 ? 'active' : ''" :key="index">
          <img :src="require(`@/assets/${img.name}`)" class="d-block w-100" :alt="img.header">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ img.header }}</h5>
            <p>{{ img.parag }}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
<script>


export default {
  name: "home",
  data: function () {
    return {
      imgs: [
        { name: 'fci1.jpg', header: "Welcome Alex", parag: "I Love Egypt" },
        { name: 'fci2.jpg', header: "Welcome Alex", parag: "I Love Egypt" },
        { name: 'fci3.jpg', header: "Welcome Alex", parag: "I Love Egypt" }
      ],
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 4rem);

  .carousel {
    height: 100% !important;

    .carousel-inner {
      height: 100% !important;

      .carousel-item {
        height: 100% !important;

        img {
          height: 100%;
        }
      }
    }
  }
}
</style>
