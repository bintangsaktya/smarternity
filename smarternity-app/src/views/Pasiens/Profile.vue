<template>
  <div class="row" style="margin-top: 75px">
    <div class="col-12 mb-2 text-center">
      <img src="@/assets/iconpasien.png" class="w-25" />
    </div>
    <div class="col-12 mb-2 text-center">
      <p class="m-0 p-0">
        <strong>{{ dataUser.Nama }}</strong>
      </p>
    </div>

    <div class="col-6 w-100 mb-2">
      <div class="card border-0 bg-transparent">
        <img
          class="card-img"
          style="height: 100%; width: 100%"
          src="@/assets/backgroundsmallcream.png"
          alt="Card image"
        />
        <div
          class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0"
        >
          <div class="row w-100">
            <div
              class="col-12 m-0 p-0 w-100 justify-content-center align-self-center text-cream"
            >
              <div class="card-header mx-2 my-0 p-0 bg-transparent border-0">
                <p class="m-0 p-0" style="font-size: 14px">
                  <strong>Usia</strong>
                </p>
              </div>
              <div class="card-body mx-2 my-0 p-0 rounded">
                <h1 class="m-0 p-0">{{ dataUser.Usia }}</h1>
                <p class="m-0 p-0" style="font-size: 12px">Tahun</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="dataUser.Position != 'Dokter'" class="col-6 w-100 mb-2">
      <div class="card border-0 bg-transparent">
        <img
          class="card-img"
          style="height: 100%; width: 100%"
          src="@/assets/backgroundsamllblue.png"
          alt="Card image"
        />
        <div
          class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0"
        >
          <div class="row w-100">
            <div
              class="col-12 m-0 p-0 w-100 justify-content-center align-self-center text-white"
            >
              <div class="card-header mx-2 my-0 p-0 bg-transparent border-0">
                <p class="m-0 p-0" style="font-size: 14px">
                  <strong>Usia Kehamilan</strong>
                </p>
              </div>
              <div class="card-body mx-2 my-0 p-0 rounded">
                <h1 class="m-0 p-0">{{ minggu }}</h1>
                <p class="m-0 p-0" style="font-size: 12px">Minggu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 w-100 mb-2">
      <p class="m-0 p-0"><strong>Akses Cepat</strong></p>
    </div>
    <div class="col-12 w-100 mb-2">
      <div
        class="card bg-transparent shadow-lg py-1"
        style="border-radius: 10px 10px 10px 10px"
      >
        <div class="card-body mx-2 my-0 p-0 rounded">
          <div class="row align-items-center text-center">
            <div class="col-3">
              <img src="@/assets/iconbook.png" />
            </div>
            <div class="col-6 text-left mt-1">
              <h6>Tentang dan Panduan</h6>
            </div>
            <div class="col-3">
              <a href="/TentangDanPanduan">
                <img src="@/assets/next.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 w-100 mb-2">
      <a href="/Logout" class="btn btn-md btn-block btn-danger text-white"
        >Log Out</a
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      minggu: 0,
      percentMinggu: 0,
    };
  },
  beforeMount() {
    this.weekDiff();
  },
  methods: {
    async weekDiff() {
      const retData = await this.readDataByCollectDoc(
        "users",
        this.dataUser.Id
      );
      if (retData.Position != "Dokter") {
        const retDatePreg = this.convertDate(retData.CreateDateAgePregnancy)
          .toISOString()
          .slice(0, 10);

        var differenceMs = Math.abs(
          new Date(new Date()) - new Date(retDatePreg)
        );
        const differenceWeeks =
          Math.ceil(differenceMs / (1000 * 60 * 60 * 24 * 7)) -
          1 +
          parseInt(retData.AgePregnancy);
        this.minggu = differenceWeeks;
        this.percentMinggu = (differenceWeeks / 40) * 100;
      }
    },
  },
};
</script>
