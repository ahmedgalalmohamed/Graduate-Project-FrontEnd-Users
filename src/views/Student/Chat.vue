<template>
  <div class="chat">
    <div class="left scroll-side">
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
            <img :src="member.img" />
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
        <div class="middel scroll-side">
          <div v-for="(msg, index) in messages" :key="index">
            <div
              class="msgs"
              :style="
                msg.senderId == this.$store.getters.user.id
                  ? 'justify-content:end;'
                  : ''
              ">
              <span
                class="sendername"
                v-if="msg.senderId != this.$store.getters.user.id">
                <div class="left-img">
                  <img :src="mesmberDic.get(msg.senderId)" />
                </div>
              </span>
              <p
                :class="
                  msg.senderId == this.$store.getters.user.id
                    ? 'ownmsg'
                    : 'othersmsg'
                ">
                {{ msg.message }}
              </p>
            </div>
          </div>
        </div>
        <div class="bottom input-group">
          <input
            type="text"
            v-model="msg"
            class="msg-input form-control shadow-none"
            placeholder="Type your message here..." />
          <button
            class="input-group-text"
            @click="SendMsg()"
            :disabled="msg.trim() == '' || msg == null">
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
    let person = new Map();
    let data = new FormData();
    data.append("team_id", this.$route.params.id);
    data.append("id", this.$route.params.id);
    console.log(this.$route.params.id);
    this.$http.post("Chat/Display", (data = data)).then((res) => {
      console.log(res.data);
      if (res.data.state) {
        this.messages = res.data.data;
      }
    });
    this.$http.post("team/getMyTeam", (data = data)).then((res) => {
      console.log(res.data);
      if (res.data.state) {
        this.leader = res.data.data.leader[0];
        person.set(this.leader.studentID, this.leader.img);
        this.members = res.data.data.members;
        this.members.forEach((element) => {
          person.set(element.studentID, element.img);
        });
        this.mesmberDic = person;
      } else {
        this.$router.push("/");
      }
    });
  },
  created() {
    var pusher = new Pusher("6b02096c815db94e569b", {
      cluster: "eu",
    });
    let that = this;
    let data = new FormData();
    data.append("team_id", that.$route.params.id);
    var channel1 = pusher.subscribe("chat-channel");
    channel1.bind("chat-ev", function (res) {
      that.$http.post("Chat/Display", (data = data)).then((res) => {
        if (res.data.state) {
          that.messages = res.data.data;
        }
      });
    });
  },
  data: function () {
    return {
      messages: "",
      msg: "",
      leader: "",
      members: "",
      mesmberDic: new Map(),
    };
  },
  methods: {
    SendMsg() {
      let data = {
        Message: this.msg.trim(),
        SenderId: this.$store.getters.user.id,
        TeamID: this.$route.params.id,
        Role: this.$store.getters.user.role,
      };
      this.$http.post("Chat/Add", (data = data)).then((res) => {
        if (res.data.state) {
          this.msg = "";
          this.$http.get("Chat/Pusher_notifiy");
        }
      });
    },
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
  background-color: #007aff;
  color: #fff;
  border-radius: 10px 10px 0px 10px;
}

.othersmsg {
  background-color: #eaeaea;
  border-radius: 10px 10px 10px 0px;
}
</style>
