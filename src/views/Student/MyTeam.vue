<template>
  <div class="myTeam p-3" v-if="state">
    <div class="fs-2">

      <a @click="$router.push('/course/teams/1')">
        <fa class="" icon="book"></fa>
        {{ leader.course }}
      </a>
      <span> / {{ leader.team }}</span>
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
    <div class="float-end" v-if="
      $store.getters.user.id != leader.studentID &&
      $store.getters.user.role == 'student'
    ">
      <button class="btn btn-danger" @click="LeaveTeam()">Leave</button>
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
      console.log(res.data);
      if (res.data.state) {
        this.leader = res.data.data.leader[0];
        this.members = res.data.data.members;
        this.state = res.data.state;
      } else {
        this.$router.push("/");
      }
    });
  },
  created() { },
  data: function () {
    return {
      leader: "",
      members: "",
      state: false
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
  },
};
</script>

<style lang="scss" scoped>
a:hover {
  color: var(--main-color) !important;
  border-bottom: 2px solid var(--main-color);
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
