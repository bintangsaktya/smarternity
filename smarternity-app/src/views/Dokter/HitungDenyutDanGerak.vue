<template>
    <div class="row" style="margin-top: 75px;">
       
        <div class="col-12 mb-2 text-center">
            <p v-if="dataParam == 1" style="font-size: 10px;">Pemeriksaan DJJ sedang berlangsung...</p>
            <p v-else style="font-size: 10px;">Pemeriksaan Gerak Janin Sedang Berlangsung...</p>
            <div class="card border-0 " >
                <img class="card-img mx-auto"
                    style="height: 50%; width: 50%;"  
                    src="@/assets/framecircle.png" 
                    alt="Card image">
                <div class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0 ">
                    <div class="row w-100 ">
                        <div class="col-12 w-100 justify-content-center align-self-center" >
                            <div class="card-body">
                                <div v-if="dataParam == 1" class="row">
                                    <div class="col-12">
                                        <i class="fa-solid fa-heart text-white"></i>
                                    </div>
                                    <div class="col-12 text-white">
                                        <h1><strong>{{lastValSensor.jantung}}</strong></h1>
                                        <p style="font-size: 12px;">Per Menit</p>
                                    </div>
                                </div>
                                <div v-else class="row">
                                    <div class="col-12">
                                        <i class="fa-solid fa-wave-square text-white"></i>
                                    </div>
                                    <div class="col-12 text-white">
                                        <h1><strong>{{lastValSensor.gerak}}</strong></h1>
                                        <p style="font-size: 12px;">Per Jam</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <p class="text-danger" style="font-size: 12px;"><strong>Mohon Kurangi Pergerakan</strong></p>
        </div>

        <div class="col-12 mb-2">
            <div class="row">
                <div class="col-6">
                    <div class="card bg-blue4 border-0" style="min-height: 100px;">
                        <div class="card-header border-0 m-1 p-1 bg-transparent">
                            <p class="m-0 p-0 text-center" style="font-size: 12px;"><strong>Waktu Pemeriksaan</strong></p>
                        </div>
                        <div class="card-body  w-100 d-flex h-100 justify-content-center m-1 p-1">
                            <div class="row w-100 text-center">
                                <div class="col-12 justify-content-center align-self-center">
                                    <h1 class="m-0 p-0 text-left" ><strong>{{this.countTime.minute.toString().padStart(2, '0')}}:{{this.countTime.second.toString().padStart(2, '0')}}</strong></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card bg-blue4 border-0" style="min-height: 100px;">
                        <div class="card-header border-0 m-1 p-1 bg-transparent">
                            <p class="m-0 p-0 text-center" style="font-size: 12px;"><strong>Tanggal Pemeriksaan</strong></p>
                        </div>
                        <div class="card-body  w-100 d-flex h-100 justify-content-center m-1 p-1">
                            <div class="row w-100 text-center">
                                <div class="col-12 justify-content-center align-self-center">
                                    <h5 class="m-0 p-0 text-left" ><strong>{{new Date().toISOString().slice(0, 10)}}</strong></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderPasien from "@/components/HeaderPasien.vue";

export default {
    components: { HeaderPasien },
    data()
    {
        return{
            dataParam: this.$route.params.param,    
            countTime : {
                minute: 0,
                second: 0,
            },
            lastValSensor: {
                jantung: null,
                gerak: null
            },
            minGerakFake: 0,
            flagGerakFake: false,
        }
    },
    beforeMount(){
        this.getSettingFake();
        
        this.updateDjjOrGj();
        
    },
    methods:{
        async lastReadingSensor(){
            const retData = await this.readWhere("Sensors", "IdCust", this.dataUser.Id);
            if(retData.length > 0){
                const sortData = retData.sort((a, b) => new Date(a.CreateDate.seconds * 1000) - new Date(b.CreateDate.seconds * 1000));
                this.lastValSensor.jantung = sortData[sortData.length-1].Jantuk;
                this.lastValSensor.gerak = sortData[sortData.length-1].Gerak;
                //console.log(this.lastValSensor);
            }
       },
       async updateDjjOrGj(){
            if(this.dataParam == 1){
                const retData = await this.updateData("Devices", "Device1", {"StartDJJ": true});
            }
            else {
                const retData = await this.updateData("Devices", "Device1", {"StartGJ": true});
            }
            
       },
       async getSettingFake(){
            const retData = await this.readDataByCollectDoc("Settings", "IsFake");
            console.log("isfake", retData);
            if(retData.IsActive == true){
                this.minGerakFake = retData.MinGj;
                this.lastValSensor.jantung = this.randomInteger(parseInt(retData.MaxDjj), parseInt(retData.MinDjj));
                if(this.flagGerakFake){
                    this.lastValSensor.gerak = this.randomInteger(parseInt(retData.MaxGj), parseInt(retData.MinGj));
                }
            } else {
                this.lastReadingSensor();
            }
       },
       randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
    },
    created(){
        setInterval(() =>
        { 
            if(this.countTime.minute >= 60){ this.countTime.minute = 0; }
            if(this.countTime.second >= 60) { 
                this.countTime.minute++; 
                if(this.flagGerakFake == false){
                    this.lastValSensor.gerak = this.countTime.minute;
                } 
                if(this.countTime.minute >= this.minGerakFake){
                    this.flagGerakFake = true;
                    if(this.dataParam == '2'){
                        this.getSettingFake();
                    }
                }
                this.countTime.second = 0 
            }
            this.countTime.second = this.countTime.second + 1;
            if(this.dataParam == '1'){
                this.getSettingFake();
            }
        }, 1000); 
       
    },
}
</script>
