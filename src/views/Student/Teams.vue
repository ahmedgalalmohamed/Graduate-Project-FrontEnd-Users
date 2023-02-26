<template>
  <div class="p-3">
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne">
            <div style="font-size: 42px; margin-bottom: 15px">
              <fa class="mx-3" icon="laptop-code"></fa>
              <span>{{ nameCourse }}</span>
            </div>
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            {{ description }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-around cards">
      <div
        class="card text-center"
        :style="team.state ? '' : 'display:none'"
        v-for="(team, index) in teams"
        :key="index">
        <div class="card-body" v-if="team.state">
          <div>
            <p>{{ team.name }}</p>
            <hr />

            <p v-if="team.count != null">
              <b>{{ team.count }} Left</b>
            </p>
            <hr v-if="team.count != null" />
          </div>
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            @click="getMyTeam(team.name, teams.id)"
            :data-bs-target="'#' + 'A' + index">
            More
          </button>
        </div>
      </div>
    </div>

    <!-- modal available team -->
    <div
      class="modal fade"
      id="A0"
      tabindex="-1"
      aria-labelledby="A0"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="A0">Available Teams</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Team Name</th>
                  <th scope="col">Leader</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(availableteam, index) in AvailableTeams"
                  :key="index">
                  <td>{{ availableteam.name }}</td>
                  <td>{{ availableteam.leader }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="
                        sendJoinRequest(null, availableteam.teamID, 'team')
                      ">
                      Request
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- modal available team -->

    <!-- modal available student -->
    <div
      class="modal fade"
      id="A1"
      tabindex="-1"
      aria-labelledby="A1"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="A1">Available Student</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(availablestd, index) in AvailableStudents"
                  :key="index">
                  <td>{{ availablestd.name }}</td>
                  <td>{{ availablestd.email }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="
                        sendJoinRequest(availablestd.studentID, team_id, 'student')
                      ">
                      Request
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- modal available student -->

    <!-- modal create team -->
    <div
      class="modal fade"
      id="A2"
      tabindex="-1"
      aria-labelledby="A2"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="A2">Create Team</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="was-validated">
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label"
                  >Team Name<span class="text-danger">*</span></label
                >
                <div class="col-sm-9">
                  <input
                    class="form-control"
                    v-model="CreateTeam.teamName"
                    pattern="(([a-zA-Z0-9!#&*\\/)(+._-]{1,16})([ ]{0,1})){0,4}([a-zA-Z0-9!#&*\\/)(+._-]{1,16})"
                    required
                    placeholder="Team Name" />
                </div>
                <div class="col-3"></div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-3 col-form-label"
                  >Project Name<span class="text-danger">*</span></label
                >
                <div class="col-sm-9">
                  <input
                    class="form-control"
                    v-model="CreateTeam.proName"
                    pattern="(([a-zA-Z0-9!#&*\\/)(+._-]{1,16})([ ]{0,1})){0,4}([a-zA-Z0-9!#&*\\/)(+._-]{1,16})"
                    required
                    placeholder="Project Name" />
                </div>
                <div class="col-3"></div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-3 col-form-label"
                  >desciption<span class="text-danger">*</span></label
                >
                <div class="col-sm-9">
                  <textarea
                    class="form-control"
                    v-model="CreateTeam.proDesc"
                    required
                    placeholder="Desciption"></textarea>
                </div>
                <div class="col-3"></div>
                <div class="col-9">
                  <span class="text-danger"></span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              @click="addTeam()"
              class="btn btn-primary">
              Add Team
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal create team -->

    <!-- modal available profs -->
    <div
      class="modal fade"
      id="A4"
      tabindex="-1"
      aria-labelledby="A4"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="A4">Available Professors</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(availablepro, index) in AvailableProfs"
                  :key="index">
                  <td>{{ availablepro.name }}</td>
                  <td>{{ availablepro.email }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="sendJoinRequest(availablepro.id)">
                      Request
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- modal available profs -->
  </div>
</template>
<script>
export default {
  name: "teams",
  components: {},
  beforeCreate() {
    let data = new FormData();
    data.append("email", this.$store.getters.user.email);
    data.append("id", this.$route.params.id);
    this.$http.post("Course/getCourse", (data = data)).then((res) => {
      if (res.data.state) {
        this.description = res.data.data.description;
        this.nameCourse = res.data.data.name;
        this.teams[0].count = res.data.data.availableTeams;
        this.teams[4].count = res.data.data.availableProffessors;

        this.teams[1].count = res.data.data.availableStudents;
        this.team_id = res.data.data.myTeam;
        this.teams[4].state = res.data.data.isGraduate;
        if (res.data.data.myTeam != null) {
          this.teams[2].state = false;
        } else this.teams[3].state = false;
      }
    });
  },
  created() {
    let data = new FormData();
    data.append("email", this.$store.getters.user.email);
    data.append("id", this.$route.params.id);
    this.$http.post("Team/GetAvailableTeams", (data = data)).then((res) => {
      if (res.data.state) {
        this.AvailableTeams = res.data.data;
      }
    });

    this.$http
      .post("Student/GetAvailableStudents", (data = data))
      .then((res) => {
        console.log(res.data);
        if (res.data.state) {
          this.AvailableStudents = res.data.data;
        }
      });
    this.$http.post("Proffessor/GetAvailableProfs").then((res) => {
      console.log(res.data);
      if (res.data.state) {
        this.AvailableProfs = res.data.data;
      }
    });
  },
  data: function () {
    return {
      nameCourse: "",
      description: "",
      team_id: null,
      AvailableTeams: [],
      AvailableStudents: [],
      AvailableProfs: [],
      CreateTeam: {
        courseId: this.$route.params.id,
        email: this.$store.getters.user.email,
        teamName: "",
        proName: "",
        proDesc: "",
      },
      teams: [
        { name: "Available Teams", count: null, state: true },
        { name: "Available Students", count: null, state: true },
        { name: "Create a Team", count: null, state: true },
        { name: "My Team", count: null, state: true },
        { name: "Available Professors", count: null, state: true },
      ],
    };
  },
  methods: {
    getMyTeam(name) {
      if (name == this.teams[3].name)
        this.$router.push("/myteam/" + this.team_id);
    },
    addTeam() {
      let data = {
        LeaderEmail: this.CreateTeam.email,
        CourseId: this.CreateTeam.courseId,
        TeamName: this.CreateTeam.teamName,
        ProName: this.CreateTeam.proName,
        ProDescription: this.CreateTeam.proDesc,
      };
      this.$http.post("Team/AddTeam", (data = data)).then((res) => {
        window.location = "/course/teams/" + data.CourseId;
      });
    },
    sendJoinRequest(student_id, team_id, content) {
      let data = {
        TeamId: team_id,
        CourseId: this.CreateTeam.courseId,
        SenderId: this.$store.getters.user.id,
        Content: content,
        StudentId: student_id,
      };
      console.log(data);
      this.$http
        .post("Notification/sendJoinRequest", (data = data))
        .then((res) => {
          console.log(res.data);
          this.$http.get("Notification/Pusher_notifiy");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion-button,
.accordion-body {
  color: #000;
  background-color: #f5f5f5;
}

.card {
  border: none;
  margin: 10px;
  width: 20rem;
}

.cards {
  flex-wrap: wrap;
}

.card-body {
  box-shadow: 1px 1px 5px 2px #888888;
  border-radius: 10px;
}

@media (max-width: 768px) {
  th {
    display: none;
  }

  tr {
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 5px 2px #888888;
    margin-bottom: 5px;
  }
}
</style>
