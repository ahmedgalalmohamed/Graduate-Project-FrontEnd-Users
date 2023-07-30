<template>
  <div class="p-3">
    <div class="Links">
      <span><a @click="$router.push(`/home`)"><fa class="mx-2" icon="home"></fa>Home /</a></span>
    </div>
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
          <button class="btn btn-primary" @click="SwitchTeam(cour.id)">
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
  methods: {
    SwitchTeam(id) {
      if (this.$store.getters.user.role == 'instructor')
        this.$router.push(`/instructor/myteams/${id}`)
      else
        this.$router.push(`/course/teams/${id}`);
    }
  },
};
</script>

<style lang="scss" scoped>

a:hover {
  color: var(--main-color) !important;
  border-bottom: 2px solid var(--main-color);
}

.Links {
  color: #000;
  background-color: #f5f5f5;
  font-size: 1.2rem;
  margin-top: -14px;
  margin-left: -15px;

}

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
