<template>
  <div class="myTeam p-3">
    <table class="table table-striped table-bordered border-secondary">
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
      <button class="btn btn-danger">Leave</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTeam",
  components: {},
  beforeCreate() {},
  created() {
    this.GetMyTeam();
  },
  data: function () {
    return {
      leader: "",
      members: "",
    };
  },
  methods: {
    GetMyTeam() {
      let data = new FormData();
      data.append("id", this.$route.params.id);
      this.$http.post("team/getMyTeam", (data = data)).then((res) => {
        if (res.data.state) {
          this.leader = res.data.data.leader[0];
          this.members = res.data.data.members;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
