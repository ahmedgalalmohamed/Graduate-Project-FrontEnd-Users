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
      <div class="img">
        <div class="contain-img">
          <img :src="img" />
          <button id="custom-button" class="btn">
            <fa icon="camera"></fa>
          </button>
        </div>
        <input type="file" hidden="hidden" accept=".jpg" ref="file" id="formFile" />
      </div>
    </div>

    <div class="right">
      <form class="was-validated" @submit.prevent="Updateinfo()">
        <div class="row mb-3">
          <label class="col-12 col-form-label">Phone</label>
          <div class="col-12">
            <input class="form-control" v-model="user.phone" pattern="(01[0125][0-9]{8}){0,1}" />
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-12 col-form-label">Description</label>
          <div class="col-12">
            <textarea class="form-control" v-model="user.desc">
                                                                              </textarea>
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-12 col-form-label">Address</label>
          <div class="col-12">
            <input class="form-control" v-model="user.address" />
          </div>
        </div>

        <div v-if="$store.getters.user.role == 'proffessor'" class="row mb-3">
          <label class="col-12 col-form-label">Team Count</label>
          <div class="col-12">
            <input class="form-control" type="number" min="0" max="10" v-model="user.team_count" required />
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
import { compressImage } from "@/helpers/compressimg";
export default {
  name: "UpdateInfo",
  components: { CToaster, CToastBody, CToast, CToastClose },
  data() {
    return {
      msgs: { msg: [], state: true },
      user: { phone: "", desc: "", address: "", team_count: 0 },
      img:""
    };
  },
  beforeCreate() {
    this.$http.get("User/GetEditData").then((res) => {
      if (res.data.state) {
        this.user = res.data.data[0];
      }
    });
  },
  created(){
    let data = new FormData();
    data.append("id", this.$store.getters.user.id);
    data.append("role", this.$store.getters.user.role);
    this.$http.post("User/GetImage", (data = data)).then((res) => {
      if (res.data.state) {
        this.img = res.data.data;
      }
    });
  },
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
          const file = that.$refs.file.files[0];
          const blobURL = window.URL.createObjectURL(file);
          let img = new Image();
          img.src = blobURL;
          img.addEventListener("load", () => {
            formData.append("file", compressImage(img, 0.8));
            const headers = { "Content-Type": "multipart/form-data" };
            that.$http
              .post("User/ChangeImg", formData, { headers })
              .then((res) => {
                if (res.data.state) {
                  that.user.img = res.data.data;
                }
                that.msgs.state = res.data.state;
                that.msgs.msg.push({ msg: res.data.msg });
              });
          });

        }
      }
    });
  },
  methods: {
    Updateinfo() {
      let data = {
        Phone: this.user.phone == null ? "" : this.user.phone,
        Description: this.user.desc == null ? "" : this.user.desc,
        Address: this.user.address == null ? "" : this.user.address,
        TeamCount: this.user.team_count == null ? 0 : this.user.team_count,
      };
      this.$http.post("User/EditProfile", (data = data)).then((res) => {
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
  // padding: 3rem 2rem 1rem 2rem;
  background: #ffffff 0% 0% no-repeat padding-box;
  color: #707070;
  width: 70%;

  .left {
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 5px 0px 8px -6px;
    width: 45%;
    justify-content: center;
    align-items: center;

    .img {
      width: 200px;

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
  }

  #signupbtn {
    background: #1a73e8 0% 0% no-repeat padding-box;
    width: 100%;
  }

  .right {
    width: 50%;
    padding: 3rem 2rem 1rem 2rem;
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
