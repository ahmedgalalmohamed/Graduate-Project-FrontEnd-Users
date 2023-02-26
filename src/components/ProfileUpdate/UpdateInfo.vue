<template>
  <div class="container">
    <div class="left">
      <h3>Change Info</h3>
      <p class="my-3">Info must contain:</p>
      <span>
        <fa class="text-primary fs-5" icon="check"></fa>
        At least 6 characters
      </span>
      <span>
        <fa class="text-primary fs-5" icon="check"></fa>
        At least 1 upper case letter (AZ)
      </span>
      <span>
        <fa class="text-primary fs-5" icon="check"></fa>
        At least 1-lower case letter (a..z)
      </span>
      <span>
        <fa class="text-primary fs-5" icon="check"></fa>
        At least-1-number (0.9)
      </span>
    </div>

    <div class="right">
      <form class="was-validated" @submit.prevent="Updateinfo()">
        <div class="row mb-3">
          <label class="col-12 col-form-label">Phone</label>
          <div class="col-12">
            <input
              class="form-control"
              v-model="user.phone"
              required
              pattern="01[0125][0-9]{8}" />
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-12 col-form-label">Description</label>
          <div class="col-12">
            <textarea class="form-control" v-model="user.desc" required>
            </textarea>
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-12 col-form-label">Address</label>
          <div class="col-12">
            <input class="form-control" v-model="user.address" required />
          </div>
        </div>

        <div v-if="$store.getters.user.role == 'proffessor'" class="row mb-3">
          <label class="col-12 col-form-label">Team Count</label>
          <div class="col-12">
            <input
              class="form-control"
              type="number"
              min="0"
              max="10"
              v-model="user.team_count"
              required />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12">
            <button type="submit" id="signupbtn" class="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateInfo",
  components: {},
  data() {
    return {
      user: { phone: "", desc: "", address: "", team_count: 0 },
    };
  },
  methods: {
    Updateinfo() {
      let data = {
        Phone: this.user.phone,
        Description: this.user.desc,
        Address: this.user.address,
        TeamCount: this.user.team_count,
      };
      axios.post("User/EditProfile", (data = data)).then((res) => {
        this.user = {};
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  padding: 3rem 2rem 1rem 2rem;
  background: #ffffff 0% 0% no-repeat padding-box;
  color: #707070;
  width: 70%;

  .left {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 45%;
  }
  #signupbtn {
    background: #1a73e8 0% 0% no-repeat padding-box;
    width: 100%;
  }
  .right {
    width: 50%;
  }
}
@media (max-width: 750px) {
  .left {
    display: none !important;
  }
  .right {
    flex: 1;
  }
}
</style>
