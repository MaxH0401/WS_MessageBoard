<template>
  <div class="register">
    <div class="container d-flex flex-column align-items-center">
      <div class="box">
        <h1 class="p-1">Register</h1>
        <div class="d-flex justify-content-center">
          <form>
            <div>
              <div class="my-2">Username</div>
              <input
                class="textbox"
                v-model="username"
                placeholder="請輸入帳號"
              />
            </div>
            <div>
              <div class="my-2">Password</div>
              <input
                class="textbox"
                v-model="password"
                placeholder="輸入密碼，5字以上"
                type="password"
              />
            </div>
            <div class="d-flex justify-content-end">
              <router-link :to="'/login'">sign in</router-link>
            </div>
            <div class="error">{{ errorMsg }}</div>
            <button @click="doRegister" class="button my-5">註冊</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMsg: "",
    };
  },
  methods: {
    doRegister: function () {
      console.log("Register");
      console.log(this.$store.state.dbapi + "create_accounts");
      axios
        .post(this.$store.state.dbapi + "create_accounts", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data === "Create Account!") {
            alert("已註冊");
            this.$router.push('/login');
          } else {
            this.errorMsg = "意料外錯誤";
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
h1 {
  background-color: #266581;
  color: #ffffff;
  margin-bottom: 2rem;
}

.box {
  width: 90vw;
  height: 80vh;
  background-color: #e4eff5;
  border-radius: 8px;
  border: 2px solid #266581;
}

form {
  width: 15rem;
}

.button {
  width: 10rem;
  border-radius: 50px;
  border: 1px solid #266581;
  background-color: #266581;
  padding-left: 8px;
  color: #ffffff;
}

.button:hover {
  background-color: #1d4f64;
}

.textbox {
  width: 15rem;
  border-radius: 50px;
  border: 1px solid #266581;
  padding-left: 8px;
}

.error {
  color: red;
}
</style>