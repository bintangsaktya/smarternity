<template>

<!-- header -->
<div v-if="showHeaderMenu" class="row" >
  <nav class="navbar-fluid fixed-top navbar-expand-md navbar-new-bottom bg-white ">
    <div class="navbar-expand m-2 " id="navbar2" >
      <ul class="nav h-100 ">
        <li class="nav-item float-left active" > 
          <a class="navbar-brand text-dark " href="#" @click="eventGoback" >
            <i class="fa-solid fa-angle-left text-dark"></i>
            <small class="mx-3"><strong>{{ pathParam.replace('/', '') }}</strong></small>
          </a>                    
        </li>
      </ul>
    </div>
  </nav>	
</div>

<div class="container-fluid h-100 overflow-auto mt-2">
  <router-view/>
</div>
<div style="padding-top: 100px;"></div>
  
<!-- footer -->
<nav v-if="pathParam != '/OnBoarding' && pathParam != '/Register' 
  && pathParam != '/Login' && pathParam != '/Chating' && pathParam != '/KuesionerNyeri'
  && pathParam != '/PanduanOlahraga' && pathParam != '/HasilKuisioner'
  && pathParam != '/HitungDenyutDanGerak' && pathParam != '/StatistikGerakDanJantung' 
  && pathParam != '/'" class="navbar-fluid fixed-bottom navbar-expand-md navbar-new-top " style="z-index: 10000000;">
  <div class="navbar-expand" id="navbar2" >
    <div class="row d-flex justify-content-between w-100 mx-0 mt-1 p-0"> 
      <div v-if="dataUser.Position != 'Dokter'" class="col-3 w-100 m-0 p-0">
        <a class="navbar-brand w-100" href="/Dashboard">
          <div class="d-flex justify-content-center">
            <img v-if="pathParam == '/Dashboard'" src="@/assets/home.png" width="25" height="25" 
              class="align-middle" alt="">
            <img v-else src="@/assets/homeblack.png" width="25" height="25" 
              class="align-middle" alt="">
          </div>
          <p class="align-middle w-100 text-center" :class="pathParam == '/Dashboard' ? 'titleBottomBar' : 'titleBottomBarBlack'" >Beranda</p>
        </a>  
      </div> 
      <div v-if="dataUser.Position != 'Dokter'" class="col-3 w-100 m-0 p-0">
        <a class="navbar-brand w-100" href="/Riwayat">
          <div class="d-flex justify-content-center">
            <img v-if="pathParam == '/Riwayat'" src="@/assets/riwayatblue.png" width="25" height="25" 
              class="align-middle" alt="">
            <img v-else src="@/assets/riwayat.png" width="25" height="25" 
              class="align-middle" alt="">
          </div>
          <p class="align-middle w-100 text-center" :class="pathParam == '/Riwayat' ? 'titleBottomBar' : 'titleBottomBarBlack'" >Riwayat</p>
        </a>  
      </div> 
      <div :class="dataUser.Position == 'Dokter' ? 'col-6' : 'col-3'" class="w-100 m-0 p-0">
        <a class="navbar-brand w-100" href="/Chating">
          <div class="d-flex justify-content-center">
            <img src="@/assets/chat.png" width="25" height="25" 
              class="align-middle" alt="">
          </div>
          <p class="align-middle w-100 text-center" :class="pathParam == '/Konsultasi' ? 'titleBottomBar' : 'titleBottomBarBlack'" >Konsultasi</p>
        </a>  
      </div> 
      <div :class="dataUser.Position == 'Dokter' ? 'col-6' : 'col-3'" class="w-100 m-0 p-0">
        <a class="navbar-brand w-100" href="/Profile">
          <div class="d-flex justify-content-center">
            <img v-if="pathParam == '/Profile'" src="@/assets/profileblue.png" width="25" height="25" 
              class="align-middle" alt="">
            <img v-else src="@/assets/profile.png" width="25" height="25" 
              class="align-middle" alt="">
          </div>
          <p class="align-middle w-100 text-center" :class="pathParam == '/Profile' ? 'titleBottomBar' : 'titleBottomBarBlack'" >Profile</p>
        </a>  
      </div> 
    </div >
  </div>
</nav>	
</template>

<script>
export default {
    data()
    {
      return{
        showHeaderMenu : true,
      }
    },
    beforeMount(){
      if(this.pathParam.toLowerCase() == '/dashboard'){
        this.showHeaderMenu = false;
      }
    },
    methods:{
      async eventGoback(){
        
        if(this.pathParam == "/OnBoarding"){
          window.location.href = "/OnBoarding";
        }
        else if(this.pathParam.search("HitungDenyutDanGerak") > 0) {
          await this.updateData("Devices", "Device1", {"StartDJJ": false});
          const retData = await this.updateData("Devices", "Device1", {"StartGJ": false});
          if(retData){
            window.location.href='/PregnancyMonitoring';
          }
        } 
        else if(this.pathParam.search("TerapiTens") > 0) {
          const retData = await this.updateData("Devices", "Device1", {"StartTens": false});
          if(retData){
            window.location.href='/TherapyLowBackPain';
          }
        } 
        else {
          
          this.$router.go(-1);
        }
      }
        
    },
}
</script>