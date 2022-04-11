<template>
  <nav
    class="shadow d-flex justify-content-between align-items-center sticky-top"
  >
    <router-link to="/" class="logo">後端功能演示</router-link>
    <div>
      <a class="mx-5" @click="toMsgBoard">留言板</a>
      <router-link to="/login">Hi! {{ username }}</router-link> |
      <a href="" v-if="notLogin">Login</a>
      <a href="" v-if="!notLogin" @click="doLogout">Logout</a>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("userName"),
      notLogin: true,
    };
  },
  methods: {
    toMsgBoard: function () {
      console.log("username:", this.username);
      if (this.username == null) {
        alert("先登入吧!");
        this.$router.push("/login");
      } else {
        this.$router.push("/messageboard");
      }
    },
    doLogout: function () {
      localStorage.removeItem("userName");
      this.notLogin =  true;
      this.$router.push("/");
    },
  },
  mounted() {
    var username = localStorage.getItem("userName");
    // console.log(username)
    this.username = username ? username : "未登入";
    this.notLogin = username ? false : true;
    //username是否存在，是則notLogin = false，反之則true
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 15px;
  background-color: #93b7c7;
  margin-bottom: 2rem;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.2rem;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

.logo {
  font-size: 1.8rem;
}
</style>
