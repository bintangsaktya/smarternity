<template>
  <div class="row" style="margin-top: 75px">
    <div v-if="listChat == true" class="col-12 mb-2 text-center">
      <div class="row w-100 m-0 p-0 h-100 justify-content-center">
        <div
          class="col-12 my-1 py-1 bg-secondary2 rounded-lg shadow-sm"
          v-for="(list, index) in dataListChat"
          :key="index"
          @click="gotoChat(list.Email)"
        >
          <div class="row">
            <div class="col-2 m-0 p-0 align-self-center">
              <img src="@/assets/iconpasien.png" class="w-75" />
            </div>
            <div class="col-8 text-left m-0 p-0 align-self-center">
              <p class="m-0 p-0" style="font-size: 14px">{{ list.Nama }}</p>
              <p class="m-0 p-0" style="font-size: 12px">Last Chat</p>
            </div>
            <!--
            <div class="col-2 m-0 p-0 align-self-center">
              <p class="m-0 p-0" style="font-size: 12px">2h ago</p>
              <div class="m-0 p-0 d-flex justify-content-center">
                <p
                  class="m-0 p-0"
                  style="
                    font-size: 12px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    line-height: 20px;
                    background: #b80f09;
                    color: #fff;
                  "
                >
                  2
                </p>
              </div>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>

    <!-- detail chating -->
    <div v-if="listChat == false" class="col-12 mb-5 text-left">
      <div class="row w-100 m-0 p-0 h-100 m-0 p-0">
        <div
          v-for="(chat, index) in allChat"
          :key="index"
          class="col-12 mx-0 my-2 p-0"
        >
          <div
            v-if="chat.From == dataUser.Email"
            class="card w-100 border-0 shadow-sm bg-blue text-white"
            style="border-radius: 20px 20px 0px 20px"
          >
            <div class="card-body m-1 p-2">
              <p class="m-0 p-0" style="font-size: 12px">{{ chat.Message }}</p>
              <p class="float-right m-0 p-0" style="font-size: 10px">
                {{ chat.CreateDateStr + " " + chat.Status }}
              </p>
            </div>
          </div>
          <div
            v-else
            class="card w-100 border-0 shadow-sm bg-white text-dark"
            style="border-radius: 20px 20px 20px 0px"
          >
            <div class="card-body m-1 p-2">
              <p class="m-0 p-0" style="font-size: 12px">{{ chat.Message }}</p>
              <p class="float-right m-0 p-0" style="font-size: 10px">
                {{ chat.CreateDateStr + " " + chat.Status }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- footer -->
  <nav
    v-if="listChat == false"
    class="navbar-fluid fixed-bottom navbar-expand-md border bg-white"
  >
    <div class="navbar-expand" id="navbar2">
      <div class="row w-100 m-0 p-0" style="height: 50px">
        <div class="col-10 my-0 py-0 justify-content-center align-self-center">
          <input
            type="text"
            class="form-control form-control-md border-0 bg-secondary2"
            placeholder="Tulis Pesan"
            style="font-size: 12px"
            v-model="valueChat"
          />
        </div>
        <div
          class="col-2 text-center justify-content-center align-self-center"
          @click="sendChat"
        >
          <i class="fa-solid fa-paper-plane"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      listChat: true,
      dataListChat: [],
      valueChat: null,
      sendTo: null,
      allChat: [],
    };
  },
  beforeMount() {
    this.getListChat();
  },
  methods: {
    async getListChat() {
      var valField = "Dokter";
      if (this.dataUser.Position == "Dokter") {
        valField = "Customer";
      }
      this.dataListChat = await this.readListChat(
        "users",
        "Position",
        valField
      );
    },
    async gotoChat(email) {
      this.listChat = false;
      this.sendTo = email;
      var retChat = await this.readDetailChat(
        "Chating",
        this.dataUser.Email,
        email
      );
      var retChatOpposite = await this.readDetailChat(
        "Chating",
        email,
        this.dataUser.Email
      );
      const retAll = retChat.concat(retChatOpposite);
      this.allChat = retAll.sort((a, b) => a.CreateDate - b.CreateDate);

      this.updateChat(this.allChat);
    },
    async sendChat() {
      const varSend = {
        From: this.dataUser.Email,
        To: this.sendTo,
        Message: this.valueChat,
        CreateDate: this.generateId().replaceAll(this.dataUser.Id + "-", ""),
        Status: "D",
      };
      const retData = await this.insertDataRandom("Chating", varSend);
      if (retData) {
        this.valueChat = "";
      } else {
        alert("Data tidak terkirim, periksa koneksi anda");
      }
    },
    async readRealTimeChat() {
      const retChat = await this.readChatD(
        "Chating",
        this.dataUser.Email,
        this.sendTo
      );
      const retChatOpposite = await this.readChatD(
        "Chating",
        this.sendTo,
        this.dataUser.Email
      );
      const retAll = retChat.concat(retChatOpposite);
      this.updateChat(retAll);
      this.allChat = this.allChat.concat(
        retAll.sort((a, b) => a.CreateDate - b.CreateDate)
      );
    },
  },
  created() {
    setInterval(() => {
      this.readRealTimeChat();
    }, 1000);
  },
};
</script>
