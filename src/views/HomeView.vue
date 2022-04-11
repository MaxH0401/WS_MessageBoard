<template>
  <div class="login">
    <div
      class="
        mainbox
        d-flex
        flex-column
        align-items-center
        justify-content-center
      "
    >
      <h1>Login / Message board</h1>
      <h2>後端功能演示</h2>
      <button @click="toMsgBoard" class="button">進入留言板</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      notLogin: true,
    };
  },
  methods: {
    toMsgBoard: function () {
      var username = localStorage.getItem("userName");
      console.log("username:",username);
      if (username == null) {
        alert("先登入吧!");
        this.$router.push("/login");
      } else {
        this.$router.push("/messageboard");
      }
    },
  },
};
</script>


<style scoped>
.mainbox {
  background: linear-gradient(to top, #b5e6f0 0%, #ffffff00 100%);
  height: calc(100vh - 110px);
  color: #266581;
}

.button {
  text-decoration: none;
  font-size: 1.5rem;
  width: 10rem;
  border-radius: 50px;
  border: 1px solid #266581;
  background-color: #266581;
  color: #ffffff;
  margin-top: 20px;
}
</style>