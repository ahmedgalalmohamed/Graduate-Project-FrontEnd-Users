<template>
  <div class="heade">
    <div class="img">
      <img class="log-root" src="@/assets/logo2.png" />
    </div>
    <div class="links">
      <nav class="navbar navbar-expand">
        <div class="right">
          <ul class="navbar-nav" :key="Notifications.count">
            <li class="nav-item dropstart">
              <a
                class="nav-link sub-router"
                aria-expanded="false"
                data-bs-toggle="dropdown">
                <div class="position-relative">
                  <fa class="fs-3" icon="bell"></fa>
                  <span
                    v-if="Notifications.count > 0"
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ Notifications.count }}
                  </span>
                </div>
              </a>
              <ul
                class="dropdown-menu notify drop-list"
                v-if="Notifications.count > 0">
                <li
                  v-for="(noifty, index) in Notifications.notification"
                  :key="index">
                  <a
                    class="nav-link p-0 text-black"
                    v-if="noifty.content.includes('Request')"
                    @click="
                      $router.push(
                        '/profile/' + noifty.senderId + '/' + noifty.senderRole
                      )
                    "
                    href="javascript:void(0)">
                    <span class="fw-bold">
                      {{ noifty.senderName }}
                    </span>
                    <span class="text-secondary">{{ noifty.senderEmail }}</span>
                    <div>
                      <button
                        class="btn btn-success mx-1"
                        @click="notificationRespond(noifty.id, true)">
                        Accept
                      </button>
                      <button
                        class="btn btn-danger"
                        @click="notificationRespond(noifty.id, false)">
                        Reject
                      </button>
                    </div>
                  </a>
                  <a
                    class="nav-link p-0 text-black"
                    v-else
                    href="javascript:void(0)"
                    @click="delete_notify(noifty.id)">
                    <span class="fw-bold">
                      {{ noifty.senderName }}
                    </span>
                    <span class="text-secondary">{{ noifty.senderEmail }}</span>
                    <span class="text-secondary">{{ noifty.content }}</span>
                  </a>
                  <hr />
                </li>
              </ul>
              <ul class="dropdown-menu notify" v-else>
                <li>
                  <span class="text-secondary">0 Notifications</span>
                </li>
              </ul>
            </li>

            <li class="nav-item dropstart">
              <a
                class="nav-link sub-router"
                aria-expanded="false"
                data-bs-toggle="dropdown">
                <fa class="fs-1" icon="circle-user"></fa>
              </a>
              <ul class="dropdown-menu">
                <li class="">
                  <a
                    class="nav-link text-black"
                    @click="
                      $router.push(
                        '/profile/' +
                          $store.getters.user.id +
                          '/' +
                          $store.getters.user.role
                      )
                    ">
                    <fa icon="circle-user"></fa>
                    My Profile
                  </a>
                </li>
                <li class="">
                  <a
                    class="nav-link text-black"
                    @click="$router.push('/profileupdate/info')">
                    <fa icon="pen"></fa>
                    Edit Profile
                  </a>
                </li>
                <li class="">
                  <a
                    class="nav-link text-black"
                    @click="$router.push('/profileupdate/password')">
                    <fa icon="key"></fa>
                    Edit Password
                  </a>
                </li>
                <li class="" v-if="$store.getters.user.role == 'student'">
                  <a
                    class="nav-link text-black"
                    href="javascript:void(0)"
                    @click="$router.push('/course')">
                    <fa icon="book"></fa>
                    My Courses
                  </a>
                </li>
                <li class="" v-if="$store.getters.user.role == 'proffessor'">
                  <a
                    class="nav-link text-black"
                    href="javascript:void(0)"
                    @click="$router.push('/proffessor/myteams')">
                    <fa icon="book"></fa>
                    My Teams
                  </a>
                </li>
                <li class="">
                  <a
                    class="nav-link text-black"
                    href="javascript:void(0)"
                    @click="logout()">
                    <fa icon="right-from-bracket"></fa>
                    logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js";
export default {
  name: "App",
  components: {},
  beforeCreate() {
    this.$http.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      this.$http.post("Notification/getNotification").then((res) => {
        this.rand = Math.random();
        if (res.data.state) {
          this.Notifications.count = res.data.data.count;
          this.Notifications.notification = res.data.data.senders;
        }
      });
    }
  },
  created() {
    var pusher = new Pusher("6b02096c815db94e569b", {
      cluster: "eu",
    });
    let that = this;
    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (res) {
      that.$http.post("Notification/getNotification").then((res) => {
        if (res.data.state) {
          that.Notifications.count = res.data.data.count;
          that.Notifications.notification = res.data.data.senders;
        }
      });
    });
  },
  data: function () {
    return {
      Notifications: { count: 0, notification: [] },
      rand: 0,
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$store.dispatch("user", "");
      window.location = "/login";
    },
    notificationRespond(noifty_id, accept) {
      let data = new FormData();
      data.append("n_id", noifty_id);
      data.append("accept", accept);
      if (this.$store.getters.user.role.toLowerCase() == "proffessor") {
        this.$http
          .post("Proffessor/notificationRespond", (data = data))
          .then((res) => {
            if (res.data.state) {
              this.Notifications.count = res.data.data.count;
              this.Notifications.notification = res.data.data.notification;
            }
            this.$http.get("Notification/Pusher_notifiy");
          });
      } else {
        this.$http
          .post("Notification/notificationRespond", (data = data))
          .then((res) => {
            if (res.data.state) {
              this.Notifications.count = res.data.data.count;
              this.Notifications.notification = res.data.data.notification;
            }
            this.$http.get("Notification/Pusher_notifiy");
          });
      }
    },
    delete_notify(noifty_id) {
      let data = new FormData();
      data.append("id", noifty_id);
      this.$http.post("Notification/delete", (data = data)).then((res) => {
        if (res.data.state) {
          this.Notifications.count = res.data.data.count;
          this.Notifications.notification = res.data.data.notification;
        }
        this.$http.get("Notification/Pusher_notifiy");
        this.rand = Math.random();
      });
    },
    sss() {
      console.log(this.Notifications);
    },
  },
};
</script>

<style lang="scss" scoped>
.heade {
  background-color: #1a73e8;
  display: flex;
  justify-content: space-around;
  min-height: 3rem;
  max-height: 4rem;
  color: var(--light);
  .img {
    width: 85%;
    img {
      min-height: 3rem;
      max-height: 4rem;
    }
  }
  .links {
    width: 10%;
    .right {
      display: flex;
      ul {
        li {
          align-self: center;
        }
      }
      .drop-list {
        height: 16rem;
        overflow: hidden;
        overflow-y: auto;
        li {
          margin: 10px;
        }
      }
      .notify {
        margin-top: 2rem;
        width: 15rem;
        li {
          padding: 10px;
          span {
            display: block;
          }
        }
      }
    }
  }
}
</style>
