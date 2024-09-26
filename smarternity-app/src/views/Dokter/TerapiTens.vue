<template>
    <div class="row" style="margin-top: 75px;">
        <div class="col-12 mb-2 text-center">
            <img src="@/assets/terapitens.png" class="w-50"/>
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="deviceParam" >
                <label class="custom-control-label" for="customSwitch1">Alat Sudah Menyala</label>
            </div>
        </div>
        
        <div class="col-6 mb-2">
            <div class="card text-center">
                <div class="card-body rounded border-0 bg-blue4 ">
                    <p class="m-0 p-0" style="font-size: 12px;"><strong>Frekuensi</strong></p>
                    <h2 class="m-0 p-0"><strong>100</strong><span style="font-size: 12px;">Hz</span></h2>
                </div>
            </div>
        </div>
        <div class="col-6 mb-2">
            <div class="card text-center">
                <div class="card-body rounded border-0 bg-blue4 ">
                    <p class="m-0 p-0" style="font-size: 12px;"><strong>Waktu</strong></p>
                    <h2 class="m-0 p-0"><strong>{{this.dataParam}}</strong><span style="font-size: 12px;">Menit</span></h2>
                </div>
            </div>
        </div>
        
        <div class="col-12 mb-2">
            <button class="btn btn-block btn-md text-white bg-blue3" @click="updateStartTens(false)">Selesai</button>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
export default {  
    data()
    {
        return{
           dataParam: this.$route.params.param, 
           device: null,
        }
    },
    beforeMount(){
        this.GetDevice();
        this.updateStartTens(true);
    },
    methods:{
        async GetDevice(){
            const deviceData = await this.readData("Devices");
            this.device = deviceData[0];
            if(this.device.IsPairing == false){
                $("#deviceParam").prop("checked", false);
            } else {
                $("#deviceParam").prop("checked", true);
            }
            
        },
        async updateStartTens(data){
            
            await this.updateData("Devices", "Device1", {"StartTens": data});
            const retData = await this.updateData("Devices", "Device1", {"TimeTens": this.dataParam});
            if(data == false){
                const docData = this.generateId();
                await this.insertDataRandom("TerapiTens", {"TimeTens": this.dataParam, "IdCust" : this.dataUser.Id, "CreateDate" :  docData.replaceAll(this.dataUser.Id + "-", "")});
            }
            if(retData && data == false){
                window.location.href="/TherapyLowBackPain";
            } 

        },
        
    },
    updated(){
       
       
    },
    created(){
        setInterval(() =>
        { 
            this.GetDevice();
        }, 1000); 
       
    },
}
</script>