<template>
  <nav
    class="nav shadow d-flex justify-content-between align-items-center sticky-top"
  >
    <router-link to="/" class="logo">後端功能演示</router-link>
    <div>
      <a class="mx-5" @click="toMsgBoard">Message Board</a>
      <!-- <div v-if="!this.$store.state.notLogin" class="">Hi! {{ username }}</div>  -->
      <router-link v-if="this.$store.state.notLogin" to="/login">Login</router-link>
 
      <a href="" v-if="!this.$store.state.notLogin" @click="doLogout">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("userName"),
    };
  },
  methods: {
    toMsgBoard: function () {
      console.log("username:", this.username);
      if (this.$store.state.notLogin == true) {
        alert("先登入吧!");
        this.$router.push("/login");
      } else {
        this.$router.push("/messageboard");
      }
    },
    doLogout: function () {
      localStorage.removeItem("userName");
      this.$store.state.notLogin = true;
      alert("已成功登出!");
      this.$router.path("/");
    },
  },
  mounted() {
    var username = localStorage.getItem("userName");
    console.log("mounted:",username);
    this.$store.state.notLogin = username ? false : true;
    //username是否存在，是則notLogin = false，反之則true
  },
};
</script>

<style scoped>


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