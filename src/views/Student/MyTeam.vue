<template>
  <div class="myTeam p-3" v-if="state">
    <div class="Links">
      <a @click="$router.push(`/home`)">
        <fa class="" icon="home"></fa>
        <!--Home-->
      </a>
      /
      <a @click="$router.push(`/course`)">
        <!-- <fa class="" icon="book"></fa> -->
        My Courses
      </a>
      /
      <a @click="$router.push(`/course/teams/${leader.courseID}`)">
        <!-- <fa class="" icon="laptop-code"></fa> -->
        {{ leader.course }}
      </a>
    </div>
    <div class="fs-2">
      <span>{{ leader.team }}</span>
      <button type="button"
        v-if="leader.studentID == this.$cookies.get('user').id && this.$cookies.get('user').role == 'student'" :class="complete ? 'btn btn-primary float-end' : 'btn btn-danger float-end'
          " @click="SetComplete()">
        {{ complete ? 'Team is Complete' : 'Team is not Complete' }}
      </button>
    </div>
    <form v-if="this.$cookies.get('user').role != 'student'" @submit.prevent="SetGrade()" class="input-group w-25  mb-3">
      <input type="text" required v-model="grade_of_project" class="form-control" placeholder="Grade of Project"
        aria-label="Recipient's username" aria-describedby="basic-addon2">
      <button class="input-group-text" type="submit" id="basic-addon2">Save</button>
    </form>
    <div v-else class="card">
      <div  class="card-body">
        <span v-if="grade_of_project!=null">This is the Grade is {{ grade_of_project }}.</span>
        <span v-else>The Grade is not Scored.</span>
      </div>
    </div>
    <table class="table table-striped table-bordered border-secondary my-3">
      <thead>
        <tr class="table-dark">
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ leader.name }} <fa class="text-warning fs-5" icon="star"></fa>
          </td>
          <td>{{ leader.email }}</td>
        </tr>
        <tr v-for="(member, index) in members" :key="index">
          <td>{{ member.name }}</td>
          <td>{{ member.email }}</td>
        </tr>
      </tbody>
    </table>
    <div class="float-end">
      <button class="btn btn-success mx-2" @click="$router.push(`/myteam/${leader.teamId}/chat`)">Open Chat</button>
      <button v-if="$store.getters.user.id != leader.studentID &&
        $store.getters.user.role == 'student'
        " class="btn btn-danger" @click="LeaveTeam()">Leave</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTeam",
  components: {},
  beforeCreate() {
    let data = new FormData();
    data.append("id", this.$route.params.id);
    this.$http.post("team/getMyTeam", (data = data)).then((res) => {
      if (res.data.state) {
        this.leader = res.data.data.leader[0];
        this.complete = this.leader.isComplete;
        this.members = res.data.data.members;
        this.state = res.data.state;
      } else {
        this.$router.push("/");
      }
    });
  },
  created() {
    this.GetGrade();
   },
  data: function () {
    return {
      leader: "",
      grade_of_project: null,
      members: "",
      state: false,
      complete: false,
    };
  },
  methods: {
    LeaveTeam() {
      let data = new FormData();
      data.append("t_id", this.leader.teamId);
      data.append("id", this.$store.getters.user.id);
      this.$http.post("Team/leaveTeam", (data = data)).then((res) => {
        if (res.data.state) {
          this.$router.push("/course");
        }
      });
    },
    SetComplete() {
      let data = new FormData();
      data.append("id", this.leader.teamId);
      data.append("complete", !this.complete);
      this.$http.post("Team/SetComplete", (data = data)).then((res) => {
        if (res.data.state) {
          this.complete = res.data.data;
        }
      });
    },
    SetGrade() {
      let data = new FormData();
      data.append("t_id", this.$route.params.id);
      data.append("grade", this.grade_of_project);
      this.$http.post("Team/SetGrade", (data = data)).then((res) => {
        if (res.data.state) {
          this.GetGrade();
        }
      });
    },
    GetGrade() {
      let data = new FormData();
      data.append("t_id", this.$route.params.id);
      this.$http.post("Team/GetGrade", (data = data)).then((res) => {
        if (res.data.state) {
          this.grade_of_project = res.data.data;
        }
      });
    },
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
  margin-left: -10px;
}

.myTeam {
  color: #888888;
}

@media (max-width: 768px) {
  thead {
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
