<template>
  <ul class="list-group ms-5">
    <li
      class="list-group-item"
      v-for="replymsg in replyList"
      :key="replymsg.id"
    >
      <!-- <h2>ID: {{ id }}</h2> -->
      <!-- <div>{{ replymsg.id }}</div> -->
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <h4 v-if="this.replyList[0].id">回覆人:</h4>
          <h4 class="ms-1">{{ replymsg.name }}</h4>
        </div>
        <div>
          <button
            v-if="this.replyList[0].id"
            @click="delMessage(replymsg.id)"
            class="btn my-1 danger-button"
          >
            刪除
          </button>
        </div>
      </div>
      <div class="replyBox p-1" v-if="this.replyList[0].id">
        {{ replymsg.message }}
      </div>
      <div v-if="!this.replyList[0].id">尚未有任何回覆，寫下你的想法!</div>
    </li>
    <button v-if="!this.messagebox" @click="openReplyBox" class="btn boardBtn">
      回覆
    </button>
    <div class="my-1">
      <div class="">
        <input
          v-if="this.messagebox"
          type="text"
          v-model="message"
          placeholder="message"
          style="width:60vw"
        />
   
          <button
          v-if="this.messagebox"
          @click="doMessage"
          class="btn conform-bottom my-1 mx-2"
        >
          留言!
        </button>

        
      </div>
    </div>
  </ul>
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

<style scoped>
h4 {
  font-size: 1rem;
  font-weight: 500;
}

.replyBox {
  border: 1px solid #266581;
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

.conform-bottom {
  background-color: #266581;
  padding-left: 5px;
  padding-right: 5px;
  color: #ffffff;
}

.boardBtn {
  width: auto;
  padding-left: 2rem;
  padding-right: 2rem;

  border-radius: 0px 0px 4px 4px;
  border: 1px solid #266581;
  background-color: #266581;
  color: #ffffff;
}

.boardBtn:hover {
  background-color: #1d4f64;
}
</style>