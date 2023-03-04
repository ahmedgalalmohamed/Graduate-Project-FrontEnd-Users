<template>
  <div class="login p-3">
    <div class="row row-login">
      <div class="form-create col-12">
        <div class="">
          <CToaster placement="top-end">
            <CToast :color="msgs.state ? 'success' : 'danger'" :key="index" v-for="(msg, index) in msgs.msg">
              <div class="d-flex">
                <CToastBody class="text-light">{{ msg.msg }}</CToastBody>
                <CToastClose class="me-2 m-auto" />
              </div>
            </CToast>
          </CToaster>

          <div class="container">
            <div class="left">
              <div class="logo">
                <img class="log" src="@/assets/logo.png" />
              </div>
            </div>
            <div class="right">
              <h1 class="text-center">Login</h1>
              <hr />
              <form class="was-validated">
                <div class="row mb-3">
                  <label class="col-sm-3 col-form-label">Email</label>
                  <div class="col-sm-9">
                    <input class="form-control" v-model="user.email" type="email" pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
                      required placeholder="Email" />
                  </div>
                  <div class="col-3"></div>
                </div>

                <div class="row mb-3">
                  <label class="col-sm-3 col-form-label">Password</label>
                  <div class="col-sm-9">
                    <input class="form-control" v-model="user.pass" type="password" required
                      pattern="[a-zA-Z0-9!@#$%^&*\\/)(+=._-]{8,}" placeholder="Password" />
                  </div>
                  <div class="col-3"></div>
                </div>

                <div class="row mb-3">
                  <label class="col-sm-3 col-form-label">User Type</label>
                  <div class="col-sm-9">
                    <select v-model="user.role" class="form-select">
                      <option value="Student">Student</option>
                      <option value="Proffessor">Proffessor</option>
                      <option value="Instructor">Instructor</option>
                    </select>
                  </div>
                  <div class="col-3"></div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-5 col-4"></div>
                  <div class="col-sm-7 col-8">
                    <input type="button" id="signupbtn" class="btn btn-primary mx-1" @click="submit()" value="Login" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CToaster, CToastBody, CToast, CToastClose } from "@coreui/vue";
export default {
  name: "Add",
  components: { CToaster, CToastBody, CToast, CToastClose },
  computed: {
    emailIsValid() {
      var regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g;
      const re = new RegExp(regex);
      if (re.test(this.user.email)) return true;
      return false;
    },
    passIsValid() {
      var regex = /^[a-zA-Z0-9!@#$%^&*\\/)(+=._-]{8,}$/g;
      const re = new RegExp(regex);
      if (re.test(this.user.pass)) return true;
      return false;
    },
  },
  data: function () {
    return {
      user: { email: "", pass: "", role: "Student" },
      msgs: { msg: [], state: true },
    };
  },

  methods: {
    submit() {
      if (!(this.emailIsValid && this.passIsValid)) {
        this.msgs.state = false;
        this.msgs.msg.push({ msg: "Email or password is Incorrect" });
        return;
      }
      let data = {
        Email: this.user.email,
        Password: this.user.pass,
        Role: this.user.role,
      };
      this.$http.post("User/Login", (data = data)).then((res) => {
        if (res.data) {
          this.msgs.msg.push({ msg: res.data.msg });
          this.msgs.state = res.data.state;
        }
        if (res.data.state) {
          localStorage.setItem("token", res.data.token);
          this.$store.commit("login");
          this.$cookies.set("user", res.data.data);
          this.$store.dispatch("user", res.data.data);
          window.location = "/";
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login {
  height: 100%;

  .row-login {
    height: 100%;

    .form-create {
      margin-top: auto;
      margin-bottom: auto;

      .container {
        display: flex;
        width: 70%;
        padding: 0px;

        .left {
          display: flex;
          background-color: white;
          width: 40%;
          justify-content: center;
          box-shadow: 1px 1px 5px 2px #888888;
          border-radius: 10px 0px 0px 10px;

          .logo {
            align-self: center;

            .log {
              width: 12rem;
            }
          }
        }

        #signupbtn {
          border: 2px solid #eee;
        }

        .right {
          width: 60%;
          background-color: #1a73e8;
          color: white;
          padding: 3rem 2rem 1rem 2rem;
          border-radius: 0px 10px 10px 0px;
          box-shadow: 1px 1px 5px 2px #888888;
        }
      }
    }
  }
}

@media (max-width: 850px) {
  .container {
    width: 100% !important;
  }

  .left {
    display: none !important;
  }

  .right {
    flex: 1;
    border-radius: 10px !important;
    padding: 1.5rem !important;
  }
}
</style>
