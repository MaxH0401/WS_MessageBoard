<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="replymsg in replyList"
      :key="replymsg.id"
    >
      <!-- <h2>ID: {{ id }}</h2> -->
      <!-- <div>{{ replymsg.id }}</div> -->
      <h2>{{ replymsg.name }}</h2>
      <div>{{ replymsg.message }}</div>
      <div v-if="!this.replyList[0].id">尚未回覆，立即回覆!</div>
      <div>
        <button v-if="this.replyList[0].id" @click="delMessage(replymsg.id)" class="button my-1">刪除回覆</button>
      </div>
    </li>
  </ul>
  <button v-if="!this.messagebox" @click="openReplyBox" class="button my-1">
    回覆
  </button>
  <input
    v-if="this.messagebox"
    type="text"
    v-model="message"
    placeholder="message"
  />
  <button v-if="this.messagebox" @click="doMessage" class="button my-1">
    留言!
  </button>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      replyList: [],
      messagebox: false,
      username: localStorage.getItem("userName"),
      message: "",
    };
  },
  props: ["id"],
  methods: {
    openReplyBox: function () {
      this.messagebox = true;
      console.log(this.id);
    },
    doMessage: function () {
      console.log("doMessage");
      axios
        .post(this.$store.state.dbapi + "reply", {
          name: this.username,
          message: this.message,
          rid: this.id,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data === "Create Message") {
            alert("已回覆留言!");
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
        .delete(this.$store.state.dbapi + "reply/" + replyId)
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
      .post(this.$store.state.dbapi + "messageboard/reply", {
        messageBoardId: this.id,
      })
      .then((response) => (this.replyList = response.data));
    // .then((response) => {
    //   console.log(response.data);
    //   this.replyList = response.data;
    //   console.log(this.replyList[0].id);
    // });
    this.messagebox = false;
  },
};
</script>