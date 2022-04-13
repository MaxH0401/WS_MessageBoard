<template>
  <div class="messageboard">
    <div class="container d-flex flex-column align-items-center">
      <div class="box">
        <h1 class="p-1">Message Board</h1>
        <div class="d-flex justify-content-center">
          <form>
            <div class="row d-flex">
              <div class="my-2 col-2">留言人</div>
              <div class="my-2 col-6">{{ username }}</div>
            </div>
            <div class="row">
              <div class="my-2 col-12">留言</div>
              <input class="textbox col-12" v-model="message" type="text" />
            </div>

            <button @click="doMessage" class="button my-5">發表</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <hr />

  <ul class="list-group">
    <li class="list-group-item msgcard m-2" v-for="msg in list" :key="msg.id">
      
      <!-- <h2>ID:{{ msg.id }}</h2> -->
      <h2>{{ msg.name }}</h2>
      <div>{{ msg.message }}</div>

      <replyMessage :id="msg.id"> </replyMessage>
      <button @click="delMessage(msg.id)" class="my-5">刪除留言</button>
    </li>
    <div v-if="!this.list[0]" class="error">
      沒有留言，或Server斷線可能要重開
    </div>
  </ul>
</template>

<script>
import axios from "axios";
import replyMessage from "@/components/ReplyMessage.vue";

export default {
  components: {
    replyMessage,
  },
  data() {
    return {
      username: localStorage.getItem("userName"),
      message: "",
      list: [],
    };
  },
  methods: {
    doMessage: function () {
      console.log("doMessage");
      axios
        .post(this.$store.state.dbapi + "messageboard", {
          name: this.username,
          message: this.message,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data === "Create Message") {
            alert("已留言!");
            this.$router.go(0);
          } else {
            this.errorMsg = "意料外的錯誤";
          }
        })
        .catch((error) => console.log(error));
    },
    delMessage: function (replyId) {
      console.log("delMessage");
      axios
        .delete(this.$store.state.dbapi + "messageboard/" + replyId)
        .then((response) => {
          if (response.data === "delete") {
            alert("刪除");
            this.$router.go(0);
          } else {
            this.errorMsg = "意料外的錯誤";
          }
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get(this.$store.state.dbapi + "messageboard")
      .then((response) => (this.list = response.data));
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

  background-color: #e4eff5;
  border-radius: 8px;
  border: 2px solid #266581;
}

form {
  width: 80vw;
}

.button {
  width: 10rem;
  border-radius: 50px;
  border: 1px solid #266581;
  background-color: #266581;
  color: #ffffff;
}

.button:hover {
  background-color: #1d4f64;
}

.textbox {
  /* width: 15rem; */
  height: 5rem;
  border-radius: 8px;
  border: 1px solid #266581;
  padding-left: 8px;
}

.error {
  color: red;
}

.msgcard {
  background-color: #7ba7ba;
  border-radius: 8px;
}
</style>

