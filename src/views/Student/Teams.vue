<template>
  <div class="p-3" v-if="msgs.state">
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <CToaster placement="top-end">
          <CToast :color="msgs.state ? 'success' : 'danger'" :key="index" v-for="(msg, index) in msgs.msg">
            <div class="d-flex">
              <CToastBody class="text-light">{{ msg.msg }}</CToastBody>
              <CToastClose class="me-2 m-auto" />
            </div>
          </CToast>
        </CToaster>
        <div class="Links">
          <span><a @click="$router.push(`/home`)">
              <fa class="mx-2" icon="home"></fa>/
            </a></span>
          <span><a @click="$router.push(`/course`)"> My Courses /</a></span>
        </div>
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            <div style="font-size: calc(1.325rem + .9vw)!important; margin-bottom: 15px">

              <fa class="mx-3" icon="laptop-code"></fa>
              <span>{{ nameCourse }}</span>
            </div>
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            {{ description }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-around cards">
      <div class="card text-center" :style="team.state ? '' : 'display:none'" v-for="(team, index) in teams" :key="index">
        <div class="card-body" v-if="team.state">
          <div>
            <p>{{ team.name }}</p>
            <hr />

            <p v-if="team.count != null">
              <b>{{ team.count }} Left</b>
            </p>
            <hr v-if="team.count != null" />
          </div>
          <button class="btn btn-primary" data-bs-toggle="modal" @click="getMyTeam(team.name, teams.id)"
            :data-bs-target="'#' + 'A' + index">
            More
          </button>
        </div>
      </div>
    </div>

    <!-- modal available team -->
    <div class="modal fade" id="A0" tabindex="-1" aria-labelledby="A0" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="A0">Available Teams</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="">
              <div class="d-flex py-1 justify-content-end my-1" role="search">
                <div class="input-group mb-3">
                  <input class="form-control w-75" type="search" v-model="searchteam" placeholder="Search"
                    aria-label="Search" />
                  <select class="form-control" v-model="searchteamfilter">
                    <option value="1" selected>Team Name</option>
                    <option value="2">Leader Name</option>
                  </select>
                </div>
              </div>
            </div>
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Team Name</th>
                  <th scope="col">Leader</th>
                  <th scope="col" v-if="team_id == null">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(availableteam, index) in filteredTeamsList" :key="index">
                  <td>{{ availableteam.name }}</td>
                  <td>{{ availableteam.leader }}</td>
                  <td v-if="team_id == null">
                    <button class="btn btn-primary" @click="
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
    <div class="modal fade" id="A1" tabindex="-1" aria-labelledby="A1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="A1">Available Student</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="">
              <div class="d-flex py-1 justify-content-end my-1" role="search">
                <div class="input-group mb-3">
                  <input class="form-control w-75" type="search" v-model="searchstd" placeholder="Search"
                    aria-label="Search" />
                  <select class="form-control" v-model="searchstdfilter">
                    <option value="1" selected>Name</option>
                    <option value="2">Email</option>
                  </select>
                </div>
              </div>
            </div>
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col" v-if="$store.getters.user.id == team_leader">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(availablestd, index) in filteredStudentList" :key="index">
                  <td>{{ availablestd.name }}</td>
                  <td>{{ availablestd.email }}</td>
                  <td v-if="$store.getters.user.id == team_leader">
                    <button class="btn btn-primary" @click="
                      sendJoinRequest(
                        availablestd.studentID,
                        team_id,
                        'student'
                      )
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
    <div class="modal fade" id="A2" tabindex="-1" aria-labelledby="A2" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="A2">Create Team</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="was-validated">
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Team Name<span class="text-danger">*</span></label>
                <div class="col-sm-9">
                  <input class="form-control" v-model="CreateTeam.teamName"
                    pattern="(([a-zA-Z0-9!#&*\\/)(+._-]{1,16})([ ]{0,1})){0,4}([a-zA-Z0-9!#&*\\/)(+._-]{1,16})" required
                    placeholder="Team Name" />
                </div>
                <div class="col-3"></div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Project Name<span class="text-danger">*</span></label>
                <div class="col-sm-9">
                  <input class="form-control" v-model="CreateTeam.proName"
                    pattern="(([a-zA-Z0-9!#&*\\/)(+._-]{1,16})([ ]{0,1})){0,4}([a-zA-Z0-9!#&*\\/)(+._-]{1,16})" required
                    placeholder="Project Name" />
                </div>
                <div class="col-3"></div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">desciption<span class="text-danger">*</span></label>
                <div class="col-sm-9">
                  <textarea class="form-control" v-model="CreateTeam.proDesc" required
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
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" data-bs-dismiss="modal" @click="addTeam()" class="btn btn-primary">
              Add Team
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal create team -->

    <!-- modal available profs -->
    <div class="modal fade" id="A4" tabindex="-1" aria-labelledby="A4" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="A4">Available Professors</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="">
              <div class="d-flex py-1 justify-content-end my-1" role="search">
                <div class="input-group mb-3">
                  <input class="form-control w-75" type="search" v-model="searchprof" placeholder="Search"
                    aria-label="Search" />
                  <select class="form-control" v-model="searchproffilter">
                    <option value="1" selected>Name</option>
                    <option value="2">Email</option>
                  </select>
                </div>
              </div>
            </div>
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col" v-if="
                    $store.getters.user.id == team_leader && prof_id == null
                  ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(availablepro, index) in filteredProfList" :key="index">
                  <td>{{ availablepro.name }}</td>
                  <td>{{ availablepro.email }}</td>
                  <td v-if="
                    $store.getters.user.id == team_leader && prof_id == null
                  ">
                    <button class="btn btn-primary" @click="sendProfRequest(availablepro.id, team_id)">
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
import { CToaster, CToastBody, CToast, CToastClose } from "@coreui/vue";
export default {
  name: "teams",
  components: { CToaster, CToastBody, CToast, CToastClose },
  beforeCreate() {
    let data = new FormData();
    data.append("email", this.$store.getters.user.email);
    data.append("id", this.$route.params.id);
    this.$http.post("Course/getCourse", (data = data)).then((res) => {
      this.msgs.state = res.data.state;
      if (res.data.state) {
        this.description = res.data.data.description;
        this.nameCourse = res.data.data.name;
        this.teams[0].count = res.data.data.availableTeams;
        this.teams[4].count = res.data.data.availableProffessors;
        this.team_leader = res.data.data.teamLeader;
        this.teams[1].count = res.data.data.availableStudents;
        this.team_id = res.data.data.myTeam;
        this.team_leader = res.data.data.teamLeader;
        this.prof_id = res.data.data.proId;
        this.teams[4].state = res.data.data.isGraduate;
        if (res.data.data.myTeam != null) {
          this.teams[2].state = false;
        } else this.teams[3].state = false;
      }
      else
        this.$router.push('/');
    });
  },
  created() {
    let data = new FormData();
    data.append("email", this.$store.getters.user.email);
    data.append("id", this.$route.params.id);
    this.$http.post("Team/GetAvailableTeams", (data = data)).then((res) => {
      console.log(res.data);
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
      msgs: { msg: [], state: false },
      nameCourse: "",
      description: "",
      searchstd: "",
      searchteam: "",
      searchprof: "",
      searchstdfilter: "1",
      searchteamfilter: "1",
      searchproffilter: "1",
      team_leader: null,
      team_id: null,
      prof_id: null,
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
        this.msgs.state = res.data.state;
        this.msgs.msg.push({ msg: res.data.msg });
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
          // console.log(res.data);
          this.msgs.state = res.data.state;
          this.msgs.msg.push({ msg: res.data.msg });
          this.$http.get("Notification/Pusher_notifiy");
        });
    },
    sendProfRequest(prof_id, team_id) {
      let data = {
        TeamId: team_id,
        SenderId: this.$store.getters.user.id,
        ProfId: prof_id,
      };
      this.$http
        .post("Proffessor/sendJoinRequest", (data = data))
        .then((res) => {
          this.msgs.state = res.data.state;
          this.msgs.msg.push({ msg: res.data.msg });
          this.$http.get("Proffessor/Pusher_notifiy");
        });
    },
  },
  computed: {
    filteredStudentList() {
      switch (this.searchstdfilter) {
        case "1":
          return this.AvailableStudents.filter((student) => {
            return student.name.toLowerCase().includes(this.searchstd.toLowerCase());
          });
          break;
        case "2":
          return this.AvailableStudents.filter((student) => {
            return student.email.toLowerCase().includes(this.searchstd.toLowerCase());
          });
      }
    },

    filteredTeamsList() {
      switch (this.searchteamfilter) {
        case "1":
          return this.AvailableTeams.filter((team) => {
            return team.name.toLowerCase().includes(this.searchteam.toLowerCase());
          });
          break;
        case "2":
          return this.AvailableTeams.filter((team) => {
            return team.leader.toLowerCase().includes(this.searchteam.toLowerCase());
          });
      }
    },

    filteredProfList() {
      switch (this.searchproffilter) {
        case "1":
          return this.AvailableProfs.filter((prof) => {
            return prof.name.toLowerCase().includes(this.searchprof.toLowerCase());
          });
          break;
        case "2":
          return this.AvailableProfs.filter((prof) => {
            return prof.email.toLowerCase().includes(this.searchprof.toLowerCase());
          });
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.accordion-button,
.accordion-body {
  color: #000;
  background-color: #f5f5f5;
}

.Links {
  color: #000;
  background-color: #f5f5f5;
  font-size: 1.2rem;
  margin-top: -14px;
  margin-left: -10px;
}

a:hover {
  color: var(--main-color) !important;
  border-bottom: 2px solid var(--main-color);
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
}</style>
