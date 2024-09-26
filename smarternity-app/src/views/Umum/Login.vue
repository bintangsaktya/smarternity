<template>
    <div class="row align-items-center " style="height: 95vh;">
        <div class="col-12">
            <HeaderLogReg />
            <p class="text-left"><small>Silahkan masuk menggunakan Email dan Password.</small></p>
            <div class="row text-center">
                <div class="col-12 text-left">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <div class="input-group input-group-md mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-transparent" ><i class="fa-regular fa-envelope"></i></span>
                                </div>
                                <input type="email" class="form-control " placeholder="Masukan Email" v-model="dataUser.Email" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Password">Password</label>
                            <div class="input-group input-group-md mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-transparent" ><i class="fa-solid fa-lock"></i></span>
                                </div>
                                <input type="password" class="form-control " placeholder="Masukan Password" v-model="dataUser.Password" >
                            </div>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                <small>Ingat Akun</small>
                            </label>
                            <a href="#" class="float-right"><small>Lupa Password ?</small></a>
                        </div>
                        <button class="btn btn-md btn-blue btn-block" @click="Login"> Masuk </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <small > Belum memiliki account?
                <a href="/Register" class="link-dark"> <strong> <span >Buat Account</span> </strong>
                    
                </a>
            </small>
        </div>
    </div>
</template>
<script>

import HeaderLogReg from "@/components/HeaderLogReg.vue";
export default {
    components: { HeaderLogReg },
    
    data()
    {
        return{
           dataUser: {
            Email: null,
            Password: null,
           }
        }
    },
    beforeMount(){
        if(this.dataUser.Id != undefined && this.dataUser.Position == "Dokter" ){
            window.location.href="/Profile";
        } 
        if(this.dataUser.Id != undefined && this.dataUser.Position != "Dokter" 
                && (this.dataUser.AgePregnancy == undefined || this.dataUser.AgePregnancy == 0)){
            window.location.href="/OnBoarding";
        } 
    },
    methods:{
        async Login(){
            const dataUsers = await this.newReadData("users");
            const filterD = dataUsers.filter(x => x.Email == this.dataUser.Email).filter(y => y.Password == this.dataUser.Password);
            if(filterD.length > 0){
                localStorage.user = JSON.stringify(filterD[0]);
                
                if(filterD[0].Position != "Dokter"){
                    const retData = await this.updateData("Devices", "Device1", {"IdCustActive": filterD[0].Id});
                    if(filterD[0].AgePregnancy == undefined || filterD[0].AgePregnancy == 0){
                        window.location.href="/OnBoarding";
                    } else {
                        window.location.href="/Dashboard";
                    }
                } else {
                    window.location.href="/Profile";
                }
            } else {
                alert("Account tidak ditemukan");
            }
        }
    },
}
</script>
