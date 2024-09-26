import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue, loadingController } from "@ionic/vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";

dom.watch();

library.add(fas);
library.add(far);
library.add(fab);

import firebase from "./firebaseInit";
const db = firebase.firestore();

const axios = require("axios");

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .mixin({
    data() {
      return {
        pathParam: null,
        isLogin: null,
        dataUser: [],
      };
    },
    methods: {
      generateId() {
        const thisDay = new Date();
        const thisTime = thisDay.toLocaleTimeString("id-ID", {
          hour12: false,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        const fullTime =
          thisTime.toString() + "." + thisDay.getMilliseconds().toString();
        const docData =
          this.dataUser.Id +
          "-" +
          thisDay.toLocaleDateString().toString().replaceAll("/", ".") +
          "." +
          fullTime;
        return docData;
      },
      async insertData(colllection: any, document: any, dataInput: any) {
        let retData = false;
        await db
          .collection(colllection)
          .doc(document)
          .set(dataInput)
          .then(() => {
            return (retData = true);
          })
          .catch((error: any) => {
            return "Failed";
          });
        return retData;
      },
      async insertDataRandom(colllection: any, dataInput: any) {
        return await db
          .collection(colllection)
          .add(dataInput)
          .then(() => {
            return true;
          })
          .catch((error: any) => {
            return false;
          });
      },

      async readData(collection: any) {
        const snapshotData = await db.collection(collection).get();
        const arrayData = snapshotData.docs.map((doc) => doc.data());
        return arrayData;
      },
      async readDataDoc(collection: any, document: any, collection2: any) {
        const snapshotData = await db.collection(collection).doc(document);
        const retData = new Array();
        await snapshotData
          .collection(collection2)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              retData.push({
                Id: doc.id,
                Minimum: doc.data().Minimum,
                DjjMin: doc.data().DjjMin,
                DjjMax: doc.data().DjjMax,
                GjMax: doc.data().GjMax,
                GjMin: doc.data().GjMin,
                Maximum: doc.data().Maximum,
                Minute: doc.data().Minute,
                Category: collection2,
                Saran: doc.data().Saran,
              });
            });
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });

        return retData;
      },

      async readDataByCollectDoc(collection: any, document: any) {
        const snapshotData = await db
          .collection(collection)
          .doc(document)
          .get()
          .then((snapShot) => {
            if (!snapShot.exists) return;
            const data = snapShot.data();
            return data;
          });

        return snapshotData;
      },
      async readDataTeraphyLowBack(collection: any, field: any) {
        const snapshotData = await db
          .collection(collection)
          .where(field, "==", this.dataUser.Id)
          .get();
        const arrayData = snapshotData.docs.map((doc) => doc.data());
        return arrayData;
      },
      async readListChat(collection: any, field: any, valField: any) {
        const snapshotData = await db
          .collection(collection)
          .where(field, "==", valField)
          .get();
        const arrayData = snapshotData.docs.map((doc) => doc.data());
        return arrayData;
      },
      async readWhere(collection: any, field: any, valField: any) {
        const snapshotData = await db
          .collection(collection)
          .where(field, "==", valField)
          .get();
        const arrayData = snapshotData.docs.map((doc) => doc.data());
        return arrayData;
      },
      async readDetailChat(collection: any, from: any, to: any) {
        const retData = new Array();
        await db
          .collection(collection)
          .where("From", "==", from)
          .where("To", "==", to)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              retData.push({
                Id: doc.id,
                CreateDate: this.convertDate(doc.data().CreateDate),
                CreateDateStr: doc.data().CreateDate,
                From: doc.data().From,
                To: doc.data().To,
                Message: doc.data().Message,
                Status: doc.data().Status,
              });
            });
            return retData;
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        return retData;
      },
      async readChatD(collection: any, from: any, to: any) {
        const retData = new Array();
        await db
          .collection(collection)
          .where("Status", "==", "D")
          .where("From", "==", from)
          .where("To", "==", to)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              retData.push({
                Id: doc.id,
                CreateDate: this.convertDate(doc.data().CreateDate),
                CreateDateStr: doc.data().CreateDate,
                From: doc.data().From,
                To: doc.data().To,
                Message: doc.data().Message,
                Status: doc.data().Status,
              });
            });
            return retData;
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        return retData;
      },
      convertDate(myTime: any) {
        const splitDate = myTime.split(".");
        return new Date(
          parseInt(splitDate[2]),
          parseInt(splitDate[0]) - 1,
          parseInt(splitDate[1]),
          parseInt(splitDate[3]),
          parseInt(splitDate[4]),
          parseInt(splitDate[5])
        );
      },
      async updateChat(dataUpdate: any) {
        Object.keys(dataUpdate).forEach(async function (key) {
          await db.collection("Chating").doc(dataUpdate[key].Id).update({
            Status: "R",
          });

          //console.log(key, dataUpdate[key]);
        });
        return true;
      },
      async newReadData(collection: any) {
        const retData = new Array();
        await db
          .collection(collection)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              retData.push({
                Id: doc.id,
                Email: doc.data().Email,
                Nama: doc.data().Nama,
                Position: doc.data().Position,
                Usia: doc.data().Usia,
                AgePregnancy: doc.data().AgePregnancy,
                Password: doc.data().Password,
              });
            });
            return retData;
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        return retData;
      },
      async updateData(collection: any, id: any, data: any) {
        let retUpdate = false;
        await db
          .collection(collection)
          .doc(id)
          .update(data)
          .then(() => {
            console.log("Document successfully updated!");
            return (retUpdate = true);
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
        return retUpdate;
      },

      isLogin() {
        const dataStorage = JSON.parse(localStorage.user);
        if (dataStorage.Email) {
          console.log("sudah login");
        } else {
          console.log("belum login");
        }
      },

      getLocalStorage() {
        if (localStorage.user) {
          this.dataUser = JSON.parse(localStorage.user);
        }
      },
      getStartAndEndDateOfWeek(weekNumber: any, curDate: any) {
        const currentDate = new Date(curDate);
        const firstDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        const firstDayOfFirstWeek = new Date(firstDayOfMonth);
        firstDayOfFirstWeek.setDate(
          firstDayOfFirstWeek.getDate() + (7 - firstDayOfMonth.getDay())
        );

        const startDate = new Date(firstDayOfFirstWeek);
        const endDate = new Date(firstDayOfFirstWeek);

        startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
        endDate.setDate(endDate.getDate() + weekNumber * 7 - 1);

        return { startDate, endDate };
      },
    },
    beforeMount() {
      this.pathParam = window.location.pathname;
      this.getLocalStorage();

      if (localStorage.user) {
        const dataStorage = JSON.parse(localStorage.user);
        if (
          dataStorage.Email &&
          (this.pathParam == "/Login" || this.pathParam == "/Register")
        ) {
          window.location.href = "/Dashboard";
        }
      }
    },
  });

router.isReady().then(() => {
  app.mount("#app");
});
