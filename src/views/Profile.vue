<template>
  <div class="Links">
          <span><a @click="$router.push(`/home`)"><fa class="mx-2" icon="home"></fa>Home /</a></span>
  </div>
  <div class="profile p-3">
    <div class="user-info">
      <CToaster placement="top-end">
        <CToast :color="msgs.state ? 'success' : 'danger'" :key="index" v-for="(msg, index) in msgs.msg">
          <div class="d-flex">
            <CToastBody class="text-light">{{ msg.msg }}</CToastBody>
            <CToastClose class="me-2 m-auto" />
          </div>
        </CToast>
      </CToaster>
      <div class="img">
        <div class="contain-img">
          <img :src="img" />
          <button v-if="myprofile == 'own'" id="custom-button" class="btn">
            <fa icon="camera"></fa>
          </button>
        </div>
        <input type="file" hidden="hidden" accept=".jpg" ref="file" id="formFile" />
      </div>
      <div class="info">
        <span class="fs-2 text-secondary fw-bold">{{ student.name }}</span>
        <div class="g-info">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 col-12">
                <span>ID: </span>
                <span>{{ student.id }}</span>
              </div>
              <div class="col-md-6 col-12">
                <span>Phone Number: </span>
                <span>{{ student.phone }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-12">
                <span>Department: </span>
                <span>{{ "CS" }}</span>
              </div>
              <div v-if="$store.getters.user.role == 'student'" class="col-md-6 col-12">
                <span>Semester: </span>
                <span>{{ student.semester }}</span>
              </div>
              <div v-if="$store.getters.user.role == 'proffessor'" class="col-md-6 col-12">
                <span>Team Count: </span>
                <span>{{ student.teamCount }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-12">
                <span>Email: </span>
                <span>{{ student.email }}</span>
              </div>
              <div class="col-md-6 col-12">
                <span>Address: </span>
                <span>{{ student.address }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-info">
      <div class="user-desc">
        <div>
          <span>About Me</span>
        </div>
        <div>
          {{ student.desciption }}
        </div>
      </div>
      <div v-if="$route.path.includes('/student')" class="user-skils">
        <div class="d-flex justify-content-between">
          <div>
            <fa class="fs-4" icon="medal"></fa> <span>My skills</span>
          </div>
          <button v-if="myprofile == 'own'" class="btn" data-bs-toggle="modal" data-bs-target="#A2">
            <fa class="fs-4 text-primary" icon="plus"></fa>
          </button>
        </div>
        <div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between" v-for="(skill, index) in skils" :key="index">
              <div>
                {{ skill.skil }}
              </div>
              <button class="btn" v-if="myprofile == 'own'" @click="deleteSkill(skill.id)">
                <fa class="fs-4 text-danger" icon="trash"></fa>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="modal fade" id="A2" tabindex="-1" aria-labelledby="A2" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="was-validated">
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Your Skill</label>
                <div class="col-sm-9">
                  <input class="form-control" v-model="skillname"
                    pattern="(([a-zA-Z0-9!#&*\\/)(+._-]{1,16})([ ]{0,1})){0,4}([a-zA-Z0-9!#&*\\/)(+._-]{1,16})" required
                    placeholder="Your Skill" />
                </div>
                <div class="col-3"></div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" data-bs-dismiss="modal" @click="addSkill()" class="btn btn-primary">
              Add Skill
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CToaster, CToastBody, CToast, CToastClose } from "@coreui/vue";
export default {
  name: "Profile",
  components: { CToaster, CToastBody, CToast, CToastClose },
  mounted() {
    let that = this;
    const realFileBtn = document.getElementById("formFile");
    const customBtn = document.getElementById("custom-button");

    customBtn.addEventListener("click", function () {
      realFileBtn.click();
    });
    realFileBtn.addEventListener("change", function () {
      if (that.$refs.file.files[0] != null) {
        if (that.$refs.file.files[0].name.endsWith(".jpg")) {
          const formData = new FormData();
          formData.append("file", that.$refs.file.files[0]);
          const headers = { "Content-Type": "multipart/form-data" };
          that.$http
            .post("User/ChangeImg", formData, { headers })
            .then((res) => {
              if (res.data.state) {
                that.img = res.data.data;
              }
              that.msgs.state = res.data.state;
              that.msgs.msg.push({ msg: res.data.msg });
            });
        }
      }
    });
  },
  data() {
    return {
      student: "",
      skils: "",
      img: "",
      skillname: "",
      myprofile: "own",
      msgs: { msg: [], state: true },
    };
  },
  beforeCreate() {
    let data = new FormData();
    data.append("id", this.$route.params.id);
    data.append("role", this.$route.params.role);
    this.$http.post("User/Profile", (data = data)).then((res) => {
      // this.msgs.state = res.data.state;
      // this.msgs.msg.push({ msg: res.data.msg });
      if (res.data.state) {
        this.student = res.data.data.user[0];
        this.img = this.student.img;
        if (res.data.data.skills) this.skils = res.data.data.skills;
        this.skillname = "";
        this.myprofile = res.data.msg;
      }
      else
        this.$router.push('/');
    });
  },
  computed: {},
  methods: {
    addSkill() {
      let data = new FormData();
      data.append("skill", this.skillname);
      this.$http.post("Student/AddSkill", (data = data)).then((res) => {
        this.msgs.state = res.data.state;
        this.msgs.msg.push({ msg: res.data.msg });
        if (res.data.state) {
          this.skils = res.data.data;
        }
      });
    },
    deleteSkill(id_skill) {
      let data = new FormData();
      data.append("skill", id_skill);
      this.$http.post("Student/DeleteSkill", (data = data)).then((res) => {
        this.msgs.state = res.data.state;
        this.msgs.msg.push({ msg: res.data.msg });
        if (res.data.state) {
          this.skils = res.data.data;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">

.Links {
  color: #000;
  background-color: #f5f5f5;
  font-size: 1.2rem;
}

a:hover {
  color: var(--main-color) !important;
  border-bottom: 2px solid var(--main-color);
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;


  .user-info {
    display: flex;
    width: 85vw;
    padding: 20px;
    /* UI Properties */
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 20px 20px 25px #8fb8ef2b;
    opacity: 1;

    .img {
      width: 180px;

      .contain-img {
        position: relative;
      }

      button {
        position: absolute;
        top: 80%;
        right: 75%;
        border-radius: 50%;
        background-color: #ddd;
      }

      img {
        width: 100%;
        max-height: 250px;
        padding: 2px;
        box-shadow: 0px 0px 15px 0px #aaa;
        border-radius: 50%;
      }
    }

    .info {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
  }

  .s-info {
    display: flex;
    margin-top: 20px;
    width: 85vw;
    justify-content: space-between;
    color: #707070;

    .user-desc {
      width: 40%;
    }

    .user-skils {
      width: 40%;

      svg {
        margin-right: 10px;
      }
    }

    span {
      font: normal normal bold 25px/35px Arial;
      letter-spacing: 0px;
      color: #707070;
    }
  }
}

@media (max-width: 768px) {
  .s-info {
    flex-direction: column;

    .user-desc,
    .user-skils {
      margin-top: 10px;
      width: 100% !important;
    }
  }

  .user-info {
    flex-direction: column;
    align-items: center;

    .img {
      display: flex;
    }

    .info {
      span {
        text-align: center;
      }
    }
  }
}
</style>
