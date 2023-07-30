<template>
  <div class="p-3" v-if="state">
    <div class="fs-2 d-flex justify-content-between">
      <div>
        <fa class="mx-3" icon="book"></fa>
        <span>{{ course }}</span>
      </div>
      <div class="">
        <button class="btn btn-primary" data-bs-target="#A0" data-bs-toggle="modal">
          Team Count
        </button>
      </div>
    </div>
    <div class="d-flex cards">
      <div class="card" v-for="(team, index) in teams" :key="index">
        <div class="card-body">
          <div class="table">
            <thead>
              <tr>
                <th>Name</th>
                <td>
                  <div class="desc">
                    {{ team.name }}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Leader</th>
                <td>
                  <div class="desc">
                    {{ team.leader }}
                  </div>
                </td>
              </tr>
            </thead>
          </div>
          <button class="btn btn-primary" @click="this.$router.push(`/myteam/${team.id}`)">
            Show
          </button>
        </div>
      </div>
    </div>
    <!-- modal available team -->
    <div class="modal fade" id="A0" tabindex="-1" aria-labelledby="A0" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="A0">Change Member Count</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Min</label>
                <div class="col-sm-9">
                  <input class="form-control" type="number" min="1" v-model="Course.min" required />
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Max</label>
                <div class="col-sm-9">
                  <input class="form-control" type="number" min="1" v-model="Course.max" required />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" data-bs-dismiss="modal" @click="editMinMax()" class="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal available team -->
  </div>
</template>

<script>
export default {
  name: "InsTeams",
  data: function () {
    return {
      teams: null,
      state: true,
      course: "",
      Course: { min: 1, max: 1 }
    };
  },

  beforeCreate() {
    let data = new FormData();
    data.append('id', this.$route.params.id);
    this.$http.post("Instructor/MyTeams", (data = data)).then((res) => {
      if (res.data.state) {
        this.state = res.data.state;
        this.teams = res.data.data.teams;
        this.course = res.data.data.courseName;
      }
      else
        this.$router.push('/');

    });
  },
  methods: {
    editMinMax() {
      if (this.Course.min > 0 && this.Course.min <= this.Course.max) {
        let data = new FormData();
        data.append('id', this.$route.params.id);
        data.append('min', this.Course.min);
        data.append('max', this.Course.max);
        this.$http.post("Course/InstructorEdit", (data = data)).then((res) => {
          if (res.data.state) {
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
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

