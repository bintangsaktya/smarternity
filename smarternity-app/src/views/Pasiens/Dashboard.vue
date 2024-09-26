<template>
    <div class="row mt-2">
        <HeaderPasien />
    </div>
    <div class="row mb-3">
        <div class="col-12 w-100 ">
            <div class="card border-0 bg-transparent" >
                <img class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundcardblue.png" 
                    alt="Card image">
                <div class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0">
                    <div class="row w-100 ">
                        <div class="col-6 m-0 p-0 w-100 justify-content-center align-self-center" >
                            <div class="card-body m-2 rounded text-white" style="background-color: rgba(0,0,0,.5); ">
                                <img src="@/assets/battery.png" />
                                <h6 class="mt-2">Power Status</h6>
                                <h4>{{device.Battery}}%</h4>
                            </div>
                        </div>
                        <div class="col-6 m-0 p-0 w-100 justify-content-center align-self-center">
                            <div class="card-body m-2 rounded text-white" style="background-color: rgba(0,0,0,.5); ">
                                <img src="@/assets/vector.png" />
                                <h6 class="mt-3 mb-0">Device Pairing</h6>
                                <p style="font-size: 10px; margin: 0 0 0 0; padding: 0 0 0 0;">Penyandingan perangkat</p>
                                <button class="btn btn-sm btn-block rounded" :class="device.IsPairing == true ? 'btn-danger' : 'btn-secondary readonly'" @click="SetPairing"><i class="fa-solid fa-power-off text-white"></i></button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-12 w-100 ">
            <div class="card border-0 bg-transparent" >
                <img class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundcardblue2.png" 
                    alt="Card image">
                <div class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0 ">
                    <div class="row w-100 ">
                        <div class="col-4 w-100 justify-content-center align-self-center" >
                            <div class="card-body">
                                <img src="@/assets/kehamilan.png" style="width: 90px;" />
                            </div>
                        </div>
                        <div class="col-8 w-100 text-white justify-content-center align-self-center" >
                            <h6 class="m-0 p-0">Pregnancy Monitoring</h6>
                            <p class="m-0 p-0" style="font-size: 10px;">Second Trimester</p>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar progress-bar-success rounded" role="progressbar" 
                                    aria-valuemin="0" aria-valuemax="100" :style="{'width': device.percentMinggu+'%'}">
                                    {{percentMinggu}}%
                                </div>
                            </div>
                            <p class="m-0 p-0" style="font-size: 10px;">{{ minggu }} Weeks</p>
                            <a href="/PregnancyMonitoring" class="btn btn-sm btn-block btn-purple">Detail ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-12 w-100 ">
            <div class="card border-0 bg-transparent" >
                <img class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundcardcream.png" 
                    alt="Card image">
                <div class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0 ">
                    <div class="row w-100 ">
                        <div class="col-4 w-100 justify-content-center align-self-center" >
                            <div class="card-body">
                                <img src="@/assets/lowback.png" style="width: 90px;" />
                            </div>
                        </div>
                        <div class="col-8 w-100 text-cream justify-content-center align-self-center">
                            <h6 class="m-0 p-0">Low Back Pain Therapy</h6>
                            <p class="m-0 p-0" style="font-size: 10px;">Terapi nyeri punggung untuk ibu hamil.</p>
                            <a href="/TherapyLowBackPain" class="btn btn-sm btn-block btn-purple">Detail ></a>
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
            device : [],
            minggu: 0,
            percentMinggu: 0
        }
    },
    beforeMount(){
        this.GetDevice();
        this.weekDiff();
    },
    methods:{
        async GetDevice(){
            const deviceData = await this.readData("Devices");
            this.device = deviceData[0];
        },
        async SetPairing(){
            if(this.device.IsPairing == false){
                this.device.IsPairing = true;
                await this.updateData("Devices", "Device1", {"IsPairing": true});
                await this.updateData("Devices", "Device1", {"IdCustActive": this.dataUser.Id});
            }
            else{
                this.device.IsPairing = false;
                await this.updateData("Devices", "Device1", {"IsPairing": false});
                await this.updateData("Devices", "Device1", {"IdCustActive": ""});

            }
        },
        async weekDiff(date1, date2){
            const retData = await this.readDataByCollectDoc("users", this.dataUser.Id);
            const retDatePreg = this.convertDate(retData.CreateDateAgePregnancy).toISOString().slice(0, 10);

            var differenceMs = Math.abs(new Date(new Date()) - new Date(retDatePreg));
            const differenceWeeks = (Math.ceil(differenceMs / (1000 * 60 * 60 * 24 * 7)) - 1) + parseInt(retData.AgePregnancy) ;
            this.minggu = differenceWeeks;
            this.percentMinggu = (differenceWeeks / 40) * 100;
        }
        
    },
}
</script>
