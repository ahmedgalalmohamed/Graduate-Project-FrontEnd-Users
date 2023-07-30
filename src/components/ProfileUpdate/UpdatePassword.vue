<template>
  <div class="container">
    <CToaster placement="top-end">
      <CToast :color="msgs.state ? 'success' : 'danger'" :key="index" v-for="(msg, index) in msgs.msg">
        <div class="d-flex">
          <CToastBody class="text-light">{{ msg.msg }}</CToastBody>
          <CToastClose class="me-2 m-auto" />
        </div>
      </CToast>
    </CToaster>
    <div class="left">
      <h3>Change Password</h3>
      <p class="my-3">Password must contain:</p>
      <span>
        <fa class="text-primary fs-5" icon="check"></fa>
        At least 8 characters (letters , numbers,special characters)
      </span>
      <!-- <span>
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
      </span> -->
    </div>

    <div class="right">
      <form class="was-validated" id="form_update_pass" @submit.prevent="UpdatePass()">
        <div class="row mb-3">
          <label class="col-12 col-form-label">Current Password</label>
          <div class="col-12">
            <input class="form-control" v-model="user.oldpass" type="password" required
              pattern="[A-Za-z0-9!\/@#$%^&*\\]{8,}" />
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-12 col-form-label">New Password</label>
          <div class="col-12">
            <input class="form-control" v-model="user.newpass" type="password" required
              pattern="[A-Za-z0-9!\/@#$%^&*\\]{8,}" />
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-12 col-form-label">Confirm New Password</label>
          <div class="col-12">
            <input class="form-control" v-model="user.confirmpass" type="password" required
              pattern="[A-Za-z0-9!\/@#$%^&*\\]{8,}" />
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
import { CToaster, CToastBody, CToast, CToastClose } from "@coreui/vue";
export default {
  name: "UpdatePassword",
  components: { CToaster, CToastBody, CToast, CToastClose },
  data() {
    return {
      msgs: { msg: [], state: true },
      user: { newpass: "", oldpass: "", confirmpass: "" },
    };
  },
  methods: {
    UpdatePass() {
      if (this.user.newpass !== this.user.confirmpass) {
        this.msgs.state = false;
        this.msgs.msg.push({ msg: "Not Matched" });
        return;
      }
      let data = new FormData();
      data.append("oldPass", this.user.oldpass);
      data.append("newPass", this.user.newpass);
      this.$http.post("User/EditPassword", (data = data)).then((res) => {
        this.user = {};
        this.msgs.state = res.data.state;
        this.msgs.msg.push({ msg: res.data.msg });
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
