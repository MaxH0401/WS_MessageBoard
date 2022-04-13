<template>
  <div class="messageboard">
    <div class="container d-flex flex-column align-items-center">
      <h1 class="p-1">Message Board</h1>
      <div class="box">
        <div class="d-flex justify-content-center">
          <form>
            <div class="row d-flex">
              <div class="m-2 col-2 fieldName">用戶名</div>
              <div class="m-2 col-6">
                {{ username }}
              </div>
            </div>
            <div class="row">
              <div class="m-2 col-2 fieldName">留言</div>
              <textarea class="m-2 textbox col-9" v-model="message" />
            </div>
            <div class="d-flex justify-content-center">
              <button @click="doMessage" class="boardBtn my-1">發表</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <hr />

  <ul class="list-group msgList">
    <li
      class=".list-group-item msgcard m-2 p-3"
      v-for="msg in list"
      :key="msg.id"
    >
      <!-- <h2>ID:{{ msg.id }}</h2> -->
      <div class="d-flex justify-content-between mb-2">
        <h3 style="margin-bottom: 0px">發言人：{{ msg.name }}</h3>
        <button @click="delMessage(msg.id)" class=" btn danger-button">
          刪除留言
        </button>
      </div>
      <div class="messageContent p-1">
        <div>{{ msg.message }}</div>
      </div>
      <hr />
      <replyMessage :id="msg.id"> </replyMessage>
    </li>
    <div class="d-flex justify-content-center">
      <div v-if="!this.list[0]" class="error">
        沒有留言，或Server斷線可能要重開
      </div>
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
    if (localStorage.getItem("userName") == null) {
      alert("先登入吧!");
      this.$router.push("/login");
    } else {
      axios
        .get(this.$store.state.dbapi + "messageboard")
        .then((response) => (this.list = response.data));
    }
  },
};
</script>

<style scoped>
.messageboard {
  text-align: start;
}

.msgList {
  text-align: start;
}

h1 {
  color: #266581;
  margin-bottom: 2rem;
}

h3 {
  font-size: 1.5rem;
  font-weight: 900;
}

.box {
  width: 90vw;

  background-color: #e4eff5;
  border-radius: 8px;
  border: 2px solid #266581;
  padding: 2rem;
}

form {
  width: 80vw;
}

.boardBtn {
  width: auto;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 8px;
  border: 1px solid #266581;
  background-color: #266581;
  color: #ffffff;
}

.boardBtn:hover {
  background-color: #1d4f64;
}

.textbox {
  /* width: 15rem; */
  height: 20vh;
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

.fieldName {
  font-weight: 900;
  border: 1px solid;
  border-top: none;
  border-bottom: none;
  border-left: none;
}

.messageContent {
  background: #ffffff;
  border-radius: 4px;
}

.btn {
  margin: 0;
  padding: 0;
}

.danger-button {
  background-color: #ff0000;
  padding-left: 5px;
  padding-right: 5px;
  color: #ffffff;
}
</style>

