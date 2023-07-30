<template>
  <div class="chat">
    <div class="left scroll-side">
      <div v-if="professor != null">
        <div class="d-flex">
          <div class="left-img">
            <img v-if="professor != null" :src="professor.img" />
          </div>
          <div class="right-img desc">
            <p class="name">Dr.{{ professor.name }}</p>
            <p class="email">
              {{ professor.email }}
            </p>
          </div>
        </div>
        <hr />
      </div>
      <div>
        <div class="d-flex">
          <div class="left-img">
            <img :src="instructor.img" />
          </div>
          <div class="right-img desc">
            <p class="name">Ins.{{ instructor.name }}</p>
            <p class="email">
              {{ instructor.email }}
            </p>
          </div>
        </div>
        <hr />
      </div>

      <div class="d-flex">
        <div class="left-img">
          <img :src="leader.img" />
        </div>
        <div class="right-img desc">
          <p class="name">
            {{ leader.name }}
          </p>
          <p class="email">
            {{ leader.email }}
          </p>
        </div>
      </div>
      <hr />
      <div v-for="(member, index) in members" :key="index">
        <div class="d-flex">
          <div class="left-img">
            <img :src="mesmberDic.get(member.studentID)" />
          </div>
          <div class="right-img desc">
            <p class="name">{{ member.name }}</p>
            <p class="email">{{ member.email }}</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div class="right">
      <div class="right-contain">
        <div class="top">
          <h4>{{ leader.team }}</h4>
        </div>
        <div id="chatScroll" class="middel scroll-side">
          <div class="d-flex justify-content-center">
            <button class="btn" @click="DisplayNumberOfColumnMsg()">
              <fa class="fa" style="color: #1a73e8" icon="circle-plus"></fa>
            </button>
          </div>
          <div v-for="(msg, index) in messages" :key="index">
            <div class="msgs" :style="msg.senderId == this.$store.getters.user.id &&
              msg.role == this.$store.getters.user.role
              ? 'justify-content:end;'
              : ''
              ">
              <span class="sendername" v-if="msg.senderId != this.$store.getters.user.id ||
                msg.role != this.$store.getters.user.role
                ">
                <div class="left-img">
                  <img v-if="msg.role == 'instructor'" :src="instructor.img" />
                  <img v-else :src="msg.role == 'student'
                    ? mesmberDic.get(msg.senderId)
                    : professor.img
                    " />
                </div>
              </span>
              <p v-if="msg.type == 'msg'" :class="msg.senderId == this.$store.getters.user.id &&
                msg.role == this.$store.getters.user.role
                ? 'ownmsg'
                : 'othersmsg'
                ">
                {{ msg.message }}
              </p>
              <p v-else style="display: flex" :class="msg.senderId == this.$store.getters.user.id &&
                msg.role == this.$store.getters.user.role
                ? 'ownmsg'
                : 'othersmsg'
                ">
                <button class="btn rounded-circle" @click="DownloadFile(msg.fileName, msg.message)">
                  <fa v-if="msg.senderId == this.$store.getters.user.id &&
                    msg.role == this.$store.getters.user.role
                    " class="fa fs-2" style="color: #fff" icon="circle-down"></fa>
                  <fa v-else class="fa fs-2" style="color: #1a73e8" icon="circle-down"></fa>
                </button>
                <span class="pdf">{{
                  msg.fileName.substring(0, msg.fileName.indexOf("."))
                }}</span>
                <span class="pdf">{{
                  msg.fileName.substring(
                    msg.fileName.indexOf("."),
                    msg.fileName.length
                  )
                }}</span>
              </p>
            </div>
          </div>
          <div class="float-end m-2 d-flex flex-column" id="spin" role="status" aria-hidden="true"></div>
        </div>
        <div class="bottom input-group">
          <button class="input-group-text" @click="UploadFile()">
            <fa class="mx-2 fa" style="color: #1a73e8" icon="paperclip"></fa>
          </button>
          <input type="text" v-model="msg" @keyup.enter="SendMsg('msg', '', '')"
            class="msg-input form-control shadow-none" placeholder="Type your message here..." />

          <button class="input-group-text" @click="SendMsg('msg', '', '')" :disabled="msg.trim() == '' || msg == null">
            <fa class="mx-2 fa" style="color: #1a73e8" icon="paper-plane"></fa>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chat",
  components: {},
  beforeCreate() {
    // let person = new Map();
    let data = new FormData();
    data.append("team_id", this.$route.params.id);
    this.$http.post("Chat/Display/pusher", (data)).then((res) => {
      if (res.data.state) {
        this.messages = Array.from(res.data.data);
      }
    });

    let data2 = new FormData();
    data2.append("id", this.$route.params.id);
    this.$http.post("team/getMyTeam", data2).then((res) => {
      if (res.data.state) {
        this.leader = res.data.data.leader[0];
        this.professor = res.data.data.professor;
        this.members = res.data.data.members;
        this.instructor = res.data.data.instructor;
      } else {
        this.$router.push("/");
      }
    });
  },
  created() {
    let person = new Map();
    let data = new FormData();
    data.append("id", this.$route.params.id);
    data.append("team_id", this.$route.params.id);
    var pusher = new Pusher("6b02096c815db94e569b", {
      cluster: "eu",
    });
    let that = this;
    var channel1 = pusher.subscribe("chat-channel");
    channel1.bind("chat-ev", function (res) {
      that.$http.post("Chat/Display/pusher", (data = data)).then((res) => {
        if (res.data.state) {
          that.messages = Array.from(res.data.data);
          that.number_of_row = 10;
        }
        that.ScrollDown(500);
      });
    });

    this.$http.post("Chat/GetImg", (data = data)).then((res) => {
      if (res.data.state) {
        // this.leader = res.data.data.leader[0];
        if(this.professor) this.professor.img = res.data.data.professor.img;
        if(this.leader) this.leader.img = res.data.data.leader[0].img;
        if(this.instructor)  this.instructor.img = res.data.data.instructor.img;
        person.set(res.data.data.leader[0].id, res.data.data.leader[0].img);
        // this.members = res.data.data.members;
        res.data.data.members.forEach((element) => {
          person.set(element.id, element.img);
        });
        this.mesmberDic = person;
      }
    });
  },
  data: function () {
    return {
      messages: new Array(),
      msg: "",
      leader: "",
      members: "",
      professor: "",
      instructor: "",
      number_of_row: 10,
      mesmberDic: new Map(),
    };
  },
  methods: {
    async ScrollDown(time) {
      const element = document.getElementById("chatScroll");
      await this.sleep(time);
      element.scrollTop = element.scrollHeight;
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    SendMsg(type, msg, filename) {
      let div = document.getElementById("spin");
      let div1 = document.createElement("div");
      let data = {
        Message: this.msg.trim(),
        SenderId: this.$store.getters.user.id,
        TeamID: this.$route.params.id,
        Role: this.$store.getters.user.role,
        Type: type,
        FileName: "",
      };
      this.msg = "";
      if (type == "file") {
        data.Message = msg;
        data.FileName = filename;
        div1.setAttribute("id", filename);
        div1.setAttribute("class", "my-3");
        div1.classList.add("spinner-border");
        div.appendChild(div1);
        this.ScrollDown(0);
      }
      if (data.Message == "") return;
      this.$http.post("Chat/Add", (data = data)).then((res) => {
        if (res.data.state) {
          this.msg = "";
          let dic = document.getElementById(res.data.data);
          this.$http.get("Chat/Pusher_notifiy").then((res) => {
            if (type == "file")
              dic.remove();
          });
        }
      });
    },
    DisplayNumberOfColumnMsg() {
      let data = new FormData();
      data.append("team_id", this.$route.params.id);
      data.append("number_of_row", this.number_of_row);
      this.$http.post("Chat/DisplayWithFixRow", (data = data)).then((res) => {
        if (res.data.state) {
          this.messages = Array.from(res.data.data).concat(this.messages);
          this.number_of_row = res.data.numberOfRow;
        }
      });
    },
    UploadFile() {
      let input = document.createElement("input");
      input.type = "file";
      input.onchange = (_) => {
        let file = Array.from(input.files)[0];
        if (file.size / (1024 * 1024) <= 5) {
          this.getBase64(file).then((data) => {
            this.SendMsg("file", data, file.name);
          });
        } else alert("Size of File must less than or equal 5 MB.");
      };
      input.click();
    },

    DownloadFile(filename, id) {
      // GetDataFile
      let data = new FormData();
      data.append("id", id);
      this.$http.post("Chat/GetDataFile", (data = data)).then((res) => {
        if (res.data.state) {
          this.DownloadFilePDF(filename, res.data.data.data);
        }
      });
    },
    DownloadFilePDF(filename, data) {
      const downloadlink = document.createElement("a");
      downloadlink.href = data;
      downloadlink.download = filename;
      downloadlink.click();
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    },
  },
  mounted() {
    this.ScrollDown(2000);
  },
};
</script>

<style lang="scss">
.scroll-side {
  position: sticky;
  top: 3rem;
  display: block;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

button[disabled] {
  .fa {
    color: #666666 !important;
  }
}

p {
  margin: 0;
}

.fa {
  font-size: 25px;
}

.sendername {
  font-size: 13px;
}

.left-img {
  margin-right: 10px;

  img {
    border-radius: 50%;
    width: 50px;
  }
}

.desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 12rem;
}

.chat {
  display: flex;
  flex-direction: row;
  height: 100%;

  .left {
    width: 25%;
    background-color: var(--main-color);
    color: white;
    padding: 10px;

    .name {
      font-weight: bold;
    }

    .email {
      font-size: 13px;
      margin-left: 7px;
    }
  }

  .right {
    width: 75%;
    background-color: white;
    // margin-left: 5px;

    .right-contain {
      display: flex;
      flex-direction: column;
      height: 100%;

      .top {
        height: 12%;
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #ccc;

        h4 {
          align-self: center;
        }
      }

      .middel {
        height: 78%;
        padding: 10px;
        background-color: #f8f9fb;

        .msgs {
          display: flex;
          margin-top: 10px;

          p {
            padding: 10px;
            word-wrap: break-word;
            width: 30%;
            margin: 0;
          }
        }
      }

      .bottom {
        height: 10%;
        background-color: #ebebeb;
        border-top: 1px solid #ccc;

        button {
          border-radius: 0;
        }

        .msg-input {
          height: 100%;
          border: none;
          border-radius: 0;
        }
      }
    }
  }

  .pdf {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 10rem;
    font-size: 12px;
    align-self: center;
  }
}

@media (max-width: 768px) {
  .left {
    display: none;
  }

  .right {
    flex: 1;

    .middel {
      .msgs {
        p {
          width: 50% !important;
        }
      }
    }
  }
}

@media (max-width: 450px) {
  .right {
    .middel {
      .msgs {
        p {
          width: 70% !important;
        }
      }
    }
  }
}

@media (max-height: 450px) {
  .fa {
    font-size: 17px;
  }
}

.ownmsg {
  background-color: #1a73e8;
  color: #fff;
  border-radius: 10px 10px 0px 10px;
}

.othersmsg {
  background-color: #eaeaea;
  border-radius: 10px 10px 10px 0px;
}
</style>
