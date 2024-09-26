<template>
    <div class="row align-items-center mb-4" style="margin-top: 75px;">
        <div class="col-12">
            <HeaderLogReg />
            <p class="text-left"><small>Silahkan daftar menggunakan Email dan Password.</small></p>
            <div class="row text-center">
                <div class="col-12 text-left">
                    <div class="form-group">
                        <label for="username">Nama</label>
                        <div class="input-group input-group-md mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-transparent" ><i class="fa-regular fa-envelope"></i></span>
                            </div>
                            <input type="text" class="form-control " placeholder="Masukkan Nama" v-model="dataUser.Nama" >
                        </div>
                    </div>
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
                            <input type="password" class="form-control " placeholder="Masukan Password" v-model="dataUser.Password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="RePassword">Konrimasi Password</label>
                        <div class="input-group input-group-md mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-transparent" ><i class="fa-solid fa-lock"></i></span>
                            </div>
                            <input type="password" class="form-control " placeholder="Masukan Kembali Password" v-model="dataUser.RePassword" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="Usia">Usia</label>
                        <div class="input-group input-group-md mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-transparent" ><i class="fa-solid fa-person-cane"></i></span>
                            </div>
                            <input type="number" class="form-control " placeholder="0" v-model="dataUser.Usia" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="sebagai">Sebagai</label>
                        <select class="form-control form-control-md" id="sebagai" v-model="dataUser.Position">
                            <option v-for="(Pos, index) in Positions" :key="index">{{ Pos }}</option>
                        </select>
                    </div>
                    <button class="btn btn-md btn-blue btn-block" @click="registerUser"> Isi Biodata </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <small > Sudah memiliki account?
                <a href="/Login" class="link-dark"> <strong> <span >Masuk</span> </strong> </a>
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
           dataUser : {
            Nama : null,
            Email : null,
            Password : null,
            RePassword : null,
            Position: null,
           },
           Positions: [],
        }
    },
    beforeMount(){
        this.readDat();
    },
    methods:{
        async readDat(){
            const pos = await this.readDataByCollectDoc("Settings", "Positions");
            this.Positions = pos.Positions;
            this.dataUser.Position = this.Positions[0];
        },
        async registerUser()
        {
            if(this.dataUser.Password != this.dataUser.RePassword){
                alert("Re Password tidak sama");
            } else {
                const dataUsers = await this.readData("users");
                const filterRegistered = dataUsers.filter(x => x.Email == this.dataUser.Email);
                if(filterRegistered.length > 0){
                    alert("Email is Registered");
                } else {
                    const retData = await this.insertDataRandom("users", this.dataUser);
                    if(retData){
                        window.location.href="/Login";
                    } else {
                        alert("Ada Kesalahan Konektifitas");
                    }
                }
                
            }

            
        }
    },
}
</script>
