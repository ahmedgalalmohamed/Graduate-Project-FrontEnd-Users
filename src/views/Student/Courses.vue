<template>
  <div class="p-3">
    <div class="fs-2">
      <fa class="mx-3" icon="book"></fa>
      <span>My Courses</span>
    </div>
    <div class="d-flex cards">
      <div class="card" v-for="(cour, index) in courses" :key="index">
        <div class="card-body">
          <div class="table">
            <thead>
              <tr>
                <th>Name</th>
                <td>
                  <div class="desc">
                    {{ cour.name }}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Description</th>
                <td>
                  <div class="desc">
                    {{ cour.desciption }}
                  </div>
                </td>
              </tr>
            </thead>
          </div>
          <button
            class="btn btn-primary"
            @click="this.$router.push(`/course/teams/${cour.id}`)">
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Courses",
  data: function () {
    return {
      courses: null,
    };
  },
  created() {
    let data = new FormData();
    data.append("email", this.$store.getters.user.email);
    this.$http.post("Course/Display", (data = data)).then((res) => {
      this.courses = res.data.data;
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 10rem;
}

.card {
  border: none;
  margin: 10px;
  
}
.cards {
  flex-wrap: wrap;
}
.card-body {
  background-color: var(--light);
  box-shadow: 1px 1px 5px 2px #888888;
  border-radius: 10px;
  width: 20rem;
}

</style>
