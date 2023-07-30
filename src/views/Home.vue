<template>
  <div class="home">
    <div class="intro-container">
      <div class="intro">
        <h1 class="intro-header">Welcome to FCI</h1>
        <h2 class="intro-sub">
          Where there is Faith, Community and Excellence
        </h2>
      </div>
    </div>
    <div class="vision">
      <div class="message">
        <h2 class="message-header">Our message</h2>
        <p>
          The study at the Faculty of Computers and Information at Menoufia
          University aims to produce a generation of young people who keep pace
          with the times and its challenges, as it provides students with
          knowledge and basic sciences in the field of computers and information
          that enable them to go into the midst of work at the local and
          international levels, as well as enable them to complete his knowledge
          after graduation.
        </p>
      </div>
      <div class="objectives">
        <h2>Our objectives are</h2>
        <ul type="none">
          <li>
            Preparing qualified computer science and information technology
            specialists with theoretical and practical foundations, in order to
            enable them to compete locally and internationally in this
            specialization and its various branches.
          </li>
          <li>
            Conducting innovative studies and research in the field of computer
            science and information technology.
          </li>
          <li>
            Providing scientific and applied advice and assistance to bodies and
            authorities that use computers, information technology and software
            and are interested in decision-making, making and supporting it.
          </li>
          <li>
            Contributing to the training of technical personnel in the various
            sectors of the state on computers and information technology.
          </li>
          <li>
            Supervising the computer and information curricula in the faculties
            of the university, preparing them and developing them on a permanent
            basis in line with the times, and qualifying and training university
            students in various faculties and majors on computer science,
            information systems and technology.
          </li>
        </ul>
      </div>
    </div>
    <footer class="footbase">
      <footer class="foot">
        <div class="foot-left">
          <img src="@/assets/FCI.png" alt="FCI Menofia Logo" />
          <div>
            <p>
              Address : Qism Shebeen El-Kom, Shibin el Kom, Menofia Governorate
              6131614
            </p>
            <p>
              <a href="https://goo.gl/maps/ebHb7aMPy6yHSAvd9" target="_blank"
                >Directions &gt</a
              >
            </p>
            <hr>
            <p>Student Affairs : <b>0482220263</b> </p>
          </div>
        </div>
        <hr>
      </footer>
    </footer>
  </div>

  <!-- <div class="home">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
      <div class="carousel-inner">
        <div v-for="(img, index) in imgs" class="carousel-item" :class="index == 0 ? 'active' : ''" :key="index">
          <img :src="require(@/assets/${img.name})" class="d-block w-100" :alt="img.header">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ img.header }}</h5>
            <p>{{ img.parag }}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div> -->
</template>
<script>
export default {
  name: "home",
  data: function () {
    return {
      imgs: [
        { name: "fci1.jpg", header: "Welcome Alex", parag: "I Love Egypt" },
        { name: "fci2.jpg", header: "Welcome Alex", parag: "I Love Egypt" },
        { name: "fci3.jpg", header: "Welcome Alex", parag: "I Love Egypt" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 4rem);
  line-height: 1.6;
  .intro-container {
    background-image: url("/src/assets/IntroP1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 70%;
    color: white;
    border-bottom: 5px solid black;
  }
  .intro {
    background-color: rgb(0, 0, 0, 0.7);
    height: 100%;
    width: 100%;
  }
  .intro-header {
    padding-top: 10%;
    padding-bottom: 2%;
    font-size: 63px;
    text-overflow: clip;
    width: 100%;
    text-align: center;
  }
  .intro-sub {
    text-overflow: clip;
    width: 100%;
    text-align: center;
  }
  .vision {
    display: flex;
    padding: 15px;
  }
  .objectives {
    width: calc(100% - 40%);
    h2 {
      text-align: center;
      position: relative;
    }
    h2::before {
      content: "";
      position: relative;
      width: 45px;
      height: 45px;
      background-image: url("/src/assets/goal.png");
      background-size: 45px;
      background-repeat: no-repeat;
      display: inline-block;
      left: -16px;
      top: 9px;
    }
    ul {
      position: relative;
      li::before {
        content: "";
        position: relative;
        width: 30px;
        height: 30px;
        background-image: url("/src/assets/medal.png");
        background-size: 30px;
        background-repeat: no-repeat;
        display: inline-block;
        left: 0px;
        top: 10px;
      }
    }
  }
  .message-header {
    position: relative;
    text-align: center;
  }
  .message-header::before {
    content: "";
    position: relative;
    width: 45px;
    height: 45px;
    background-image: url("/src/assets/env1.png");
    background-size: 45px;
    background-repeat: no-repeat;
    display: inline-block;
    left: -16px;
    top: 9px;
  }
  .message {
    width: 40%;
  }

  .footbase {
    background-image: url("/src/assets/fci4.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    hr {
      border-top: 10px solid white;
      opacity: 1;
      border-radius: 10px;
    }
    .foot {
      padding: 21px;
      width: 100%;
      height: 100%;
      background: rgb(26, 115, 232, 0.9);
      display: flex;
      .foot-left {
        display: flex;
        color: white;
        margin-top: auto;
        margin-bottom: auto;
        img {
          height: 200px;
          width: 200px;
          margin-top: auto;
          margin-bottom: auto;
        }
        a {
          text-decoration: none;
          color: white;
          
        }
        a:hover{
            color: rgb(255, 255, 255, 0.7);
          }
      }
    }
  }
}
.carousel {
  height: 100% !important;

  .carousel-inner {
    height: 100% !important;

    .carousel-item {
      height: 100% !important;

      img {
        height: 100%;
      }
    }
  }
}
@media (max-width: 768px) {
  .vision , .foot-left {
    flex-direction: column;
  }
  .message {
    border-bottom: 2px solid black;
    margin-bottom: 15px;
  }
  .message,
  .objectives {
    width: 100% !important;
  }
}
</style>
