<template>
  <div class="p-3">
    <div class="fs-2">
      <fa class="mx-3" icon="book"></fa>
      <span>My Teams</span>
    </div>
    <div class="d-flex cards">
      <div class="card" v-for="(team, index) in teams" :key="index">
        <div class="card-body">
          <div class="table">
            <thead>
              <tr>
                <th>Id</th>
                <td>
                  <div class="desc">
                    {{ team.id }}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Name</th>
                <td>
                  <div class="desc">
                    {{ team.name }}
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
  name: "Teams",
  data: function () {
    return {
      teams: null,
    };
  },

  beforeCreate() {
    this.$http.get("Proffessor/MyTeams").then((res) => {
      if (res.data.state) {
        this.teams = res.data.data;
      }
    });
  },
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
