<template>
  <div class="heade">
    <div class="img">
      <a><img class="log-root" src="@/assets/logo2.png" @click="$router.push('/')" /></a>
    </div>
    <div class="links">
      <nav class="navbar navbar-expand">
        <div class="right">
          <ul class="navbar-nav" :key="Notifications.count">
            <li class="nav-item dropstart" v-if="$store.getters.user.role != 'instructor'">
              <a class="nav-link sub-router" aria-expanded="false" data-bs-toggle="dropdown">
                <div class="position-relative">
                  <fa class="fs-3" icon="bell"></fa>
                  <span v-if="Notifications.count > 0"
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ Notifications.count }}
                  </span>
                </div>
              </a>
              <ul class="dropdown-menu notify drop-list" v-if="Notifications.count > 0">
                <li v-for="(noifty, index) in Notifications.notification" :key="index">
                  <a class="nav-link p-0 text-black" v-if="noifty.content.includes('Request')" @click="
                    $router.push(
                      '/profile/' + noifty.senderId + '/' + noifty.senderRole
                    )
                  " href="javascript:void(0)">
                    <span class="fw-bold">
                      {{ noifty.senderName }}
                    </span>
                    <span class="text-secondary">{{ noifty.senderEmail }}</span>
                  </a>
                  <a class="nav-link p-0 text-black" v-else href="javascript:void(0)" @click="delete_notify(noifty.id)">
                    <span class="fw-bold">
                      {{ noifty.senderName }}
                    </span>
                    <span class="text-secondary">{{ noifty.senderEmail }}</span>
                    <span class="text-secondary">{{ noifty.content }}</span>
                  </a>
                  <div v-if="noifty.content.includes('Request')">
                    <button class="btn btn-success mx-1" @click="notificationRespond(noifty.id, true)">
                      Accept
                    </button>
                    <button class="btn btn-danger" @click="notificationRespond(noifty.id, false)">
                      Reject
                    </button>
                  </div>
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
              <a class="nav-link sub-router" aria-expanded="false" data-bs-toggle="dropdown">
                <fa class="fs-1" icon="circle-user"></fa>
              </a>
              <ul class="dropdown-menu">
                <li class="">
                  <a class="nav-link text-black" @click="
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
                  <a class="nav-link text-black" @click="$router.push('/profileupdate/info')">
                    <fa icon="pen"></fa>
                    Edit Profile
                  </a>
                </li>
                <li class="">
                  <a class="nav-link text-black" @click="$router.push('/profileupdate/password')">
                    <fa icon="key"></fa>
                    Edit Password
                  </a>
                </li>
                <li class="" v-if="$store.getters.user.role != 'proffessor'">
                  <a class="nav-link text-black" href="javascript:void(0)" @click="$router.push('/course')">
                    <fa icon="book"></fa>
                    My Courses
                  </a>
                </li>
                <li class="" v-if="$store.getters.user.role == 'proffessor'">
                  <a class="nav-link text-black" href="javascript:void(0)" @click="$router.push('/proffessor/myteams')">
                    <fa icon="book"></fa>
                    My Teams
                  </a>
                </li>
                <li class="">
                  <a class="nav-link text-black" href="javascript:void(0)" @click="logout()">
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
    if (this.$cookies.get('user').role != 'instructor') {
      this.$http.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get('token');
      if (this.$cookies.get('token')) {
        this.$http.post("Notification/getNotification").then((res) => {
          this.rand = Math.random();
          if (res.data.state) {
            this.Notifications.count = res.data.data.count;
            this.Notifications.notification = res.data.data.senders;
          }
        });
      }
    }
  },
  created() {
    var pusher = new Pusher("6b02096c815db94e569b", {
      cluster: "eu",
    });
    let that = this;
    var channel1 = pusher.subscribe("notify-user-sub");
    var channel2 = pusher.subscribe("notify-prof-sub");
    channel1.bind("notify-user-ev", function (res) {
      that.$http.post("Notification/getNotification").then((res) => {
        if (res.data.state) {
          that.Notifications.count = res.data.data.count;
          that.Notifications.notification = res.data.data.senders;
        }
      });
    });
    channel2.bind("notify-prof-ev", function (res) {
      that.$http.get("Proffessor/getNotification").then((res) => {
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
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.heade {
  background-color: var(--main-color);
  display: flex;
  justify-content: space-around;
  min-height: 3rem;
  max-height: 4rem;
  color: var(--light);

  .img {
    width: 50%;

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

@media (max-width: 768px) {
  .links {
    width: 20% !important;
  }
}
</style>
