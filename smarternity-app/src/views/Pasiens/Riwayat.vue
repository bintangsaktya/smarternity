<template>
    <div class="row" style="margin-top: 75px;">
        <div class="col-12">
            <div class="form-group">
                <label for="selectDate" >Pilih Tanggal </label>
                <input type="date" class="form-control form-control-sm rounded" id="selectDate" v-model="changeDate" @change="searchByDate" />
            </div>
        </div>

        <div class="col-6 w-100 mb-3">
            <div class="card border-0 bg-transparent" >
                <img v-if="lastValSensor.categoryDjj == 'Normal'" class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundsamllblue.png" 
                    alt="Card image">
                <img v-else class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundsmallcream.png" 
                    alt="Card image">
                <div class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0">
                    <div class="row w-100 ">
                        <div class="col-12 m-0 p-0 w-100 justify-content-center align-self-center"
                            :class="lastValSensor.categoryDjj == 'Normal' ? 'text-white': 'text-cream'" >
                            <div class="card-header mx-2 my-0 p-0 bg-transparent border-0">
                                <p class="m-0 p-0" style="font-size: 14px;"><strong>Detak Jantung Janin</strong></p>
                            </div>
                            <div class="card-body mx-2 my-0 p-0 rounded  " >
                               <h1 class="m-0 p-0">{{ lastValSensor.jantung }} <i style="font-size: 25px;" class="fa-solid fa-heart"></i> </h1>
                               <p class="m-0 p-0" style="font-size: 12px;">x per menit</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="col-6 w-100 mb-3">
            <div class="card border-0 bg-transparent" >
                <img v-if="lastValSensor.categoryDjj == 'Normal'" class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundsamllblue.png" 
                    alt="Card image">
                <img v-else class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundsmallcream.png" 
                    alt="Card image">
                <div class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0">
                    <div class="row w-100 ">
                        <div class="col-12 m-0 p-0 w-100 justify-content-center align-self-center "
                            :class="lastValSensor.categoryDjj == 'Normal' ? 'text-white': 'text-cream'" >
                            <div class="card-header mx-2 my-0 p-0 bg-transparent border-0">
                                <p class="m-0 p-0" style="font-size: 14px;"><strong>Gerak Janin</strong></p>
                            </div>
                            <div class="card-body mx-2 my-0 p-0 rounded " >
                               <h1 class="m-0 p-0">{{ lastValSensor.gerak }} <i style="font-size: 25px;" class="fa-solid fa-wave-square"></i> </h1>
                               <p class="m-0 p-0" style="font-size: 12px;">x per jam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6 w-100 mb-3">
            <div class="card border-0 bg-transparent" >
                <img v-if="lastValSensor.categoryNyeri == 'Berat'" class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundsmallcream.png" 
                    alt="Card image">
                <img v-else class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundsamllblue.png" 
                    alt="Card image">
                <div class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0">
                    <div class="row w-100 ">
                        <div class="col-12 m-0 p-0 w-100 justify-content-center align-self-center "
                            :class="lastValSensor.categoryNyeri == 'Berat' ? 'text-cream': 'text-white'" >
                            <div class="card-header mx-2 my-0 p-0 bg-transparent border-0">
                                <p class="m-0 p-0" style="font-size: 14px;"><strong>Skala Nyeri</strong></p>
                            </div>
                            <div class="card-body mx-2 my-0 p-0 rounded  " >
                               <h1 class="m-0 p-0">{{ lastValSensor.nyeri }}  </h1>
                               <p class="m-0 p-0" style="font-size: 12px;">dari {{ lastValSensor.dariXnyeri }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6 w-100 mb-3">
            <div class="card border-0 bg-transparent" >
                <img v-if="lastValSensor.categoryDjj == 'Normal'" class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundsamllblue.png" 
                    alt="Card image">
                <img v-else class="card-img "
                    style="height: 100%; width: 100%;"  
                    src="@/assets/backgroundsmallcream.png" 
                    alt="Card image">
                <div class="card-img-overlay w-100 d-flex h-100 justify-content-center m-0 p-0">
                    <div class="row w-100 ">
                        <div class="col-12 m-0 p-0 w-100 justify-content-center align-self-center "
                            :class="lastValSensor.categoryDjj == 'Normal' ? 'text-white': 'text-cream'" >
                            <div class="card-header mx-2 my-0 p-0 bg-transparent border-0">
                                <p class="m-0 p-0" style="font-size: 14px;"><strong>Terapi TENS</strong></p>
                            </div>
                            <div class="card-body mx-2 my-0 p-0 rounded  " >
                                <p class="m-0 p-0 " style="font-size: 12px;">Durasi : <strong class="float-right">{{ lastValSensor.durasi }} Menit</strong></p>
                                <p class="m-0 p-0 " style="font-size: 12px;">Frekuensi : <strong class="float-right">1 Kali</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="row mb-3">
        <div class="col-12">
            <div class="card border-0" style="border-radius: 15px 15px 15px 15px; background-color: #EEEEEE;">
                <div class="card-header border-0 mx-2 my-0 p-0 bg-transparent">
                    <p class="m-0 p-0"><strong>Keterangan</strong></p>
                </div>
                <div class="card-body mx-2 my-0 p-0">
                    <div class="row">
                        <div class="col-6">
                            <p style="font-size: 13px;"><i class="fa-solid fa-square bg-green"></i> Normal</p>
                        </div>
                        <div class="col-6">
                            <p style="font-size: 13px;"><i class="fa-solid fa-square bg-cream"></i> Waspada</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-12">
            <div class="card border-0" style="border-radius: 15px 15px 15px 15px; background-color: #EEEEEE;">
                <div class="card-header border-0 mx-2 my-0 p-0 bg-transparent">
                    <p class="m-0 p-0"><strong>Saran Tindakan</strong></p>
                </div>
                <div class="card-body mx-2 my-0 p-0">
                     <p style="font-size: 13px;">{{ lastValSensor.saranDjj + ". Saran Untuk Nyeri : " + lastValSensor.saran }}</p>
                </div>
            </div>
        </div>
    </div>
    <div style="padding-bottom: 75px;"></div>

</template>

<script>

export default {  
    data()
    {
        return{
            lastValSensor: [],
            changeDate: null,
        }
    },
    beforeMount(){
        this.lastReadingSensor();
    },
    methods:{
        async searchByDate()
        {
            const retData = await this.readWhere("Sensors", "IdCust", this.dataUser.Id);
            const filterData = retData.filter(x => new Date(x.CreateDate.seconds * 1000).toISOString().slice(0, 10) == this.changeDate);
            if(filterData.length > 0){
                this.lastValSensor.jantung = filterData[filterData.length-1].Jantuk;
                this.lastValSensor.gerak = filterData[filterData.length-1].Gerak;
            }
            else {
                this.lastValSensor.jantung = 0;
                this.lastValSensor.gerak = 0;
            }
            const retNyeri = await this.readWhere("KuesionerNyeri", "UserId", this.dataUser.Id);
            const filterNyeri = retNyeri.filter(x => this.convertDate(x.CreateDate).toISOString().slice(0, 10) == this.changeDate);
            if(filterNyeri.length > 0){
                this.lastValSensor.nyeri = filterNyeri[filterNyeri.length-1].Answer.filter(x => x == true).length;
                this.lastValSensor.dariXnyeri = filterNyeri[filterNyeri.length-1].Answer.length;
            } else {
                this.lastValSensor.nyeri = 0;
                this.lastValSensor.dariXnyeri = 0;
            }
            const retDataBerat = await this.readDataDoc("Settings", "SkalaNyeri", "Berat");
            const retDataSedang = await this.readDataDoc("Settings", "SkalaNyeri", "Sedang");
            const retDataRingan = await this.readDataDoc("Settings", "SkalaNyeri", "Ringan");
            const retAll = retDataBerat.concat(retDataSedang).concat(retDataRingan);
            this.lastValSensor.saran = "-";
            this.lastValSensor.categoryNyeri = "-";
            for(var x = 0 ; x < retAll.length; x++){
                if(this.lastValSensor.nyeri >= retAll[x].Minimum && this.lastValSensor.nyeri <= retAll[x].Maximum){
                    this.lastValSensor.saran = retAll[x].Saran;
                    this.lastValSensor.categoryNyeri = retAll[x].Category;
                } 
            }

            const retDataNormal = await this.readDataDoc("Settings", "DjjGj", "Normal");
            const retDataWaspada = await this.readDataDoc("Settings", "DjjGj", "Waspada");
            const retAllDjjGj = retDataNormal.concat(retDataWaspada);
            for(var y = 0 ; y < retAllDjjGj.length; y++){
                if(this.lastValSensor.jantung >= retAllDjjGj[y].DjjMin && this.lastValSensor.jantung <= retAllDjjGj[y].DjjMax
                    && this.lastValSensor.gerak >= retAllDjjGj[y].GjMin && this.lastValSensor.gerak <= retAllDjjGj[y].GjMax){
                    this.lastValSensor.saranDjj = retAllDjjGj[y].Saran.toString();
                    this.lastValSensor.categoryDjj = retAllDjjGj[y].Category;
                }
                else {
                    this.lastValSensor.saranDjj = retAllDjjGj[retAllDjjGj.length-1].Saran.toString();
                    this.lastValSensor.categoryDjj = retAllDjjGj[retAllDjjGj.length-1].Category;
                }
            }
            const retTens = await this.readWhere("TerapiTens", "IdCust", this.dataUser.Id);
            const filterTens = retTens.filter(x => this.convertDate(x.CreateDate).toISOString().slice(0, 10) == this.changeDate);
            if(filterTens.length > 0){
                this.lastValSensor.durasi = filterTens[filterTens.length-1].TimeTens;
            } else {
                this.lastValSensor.durasi = 0;
            }
        },
        async lastReadingSensor(){
            const retData = await this.readWhere("Sensors", "IdCust", this.dataUser.Id);
            const retNyeri = await this.readWhere("KuesionerNyeri", "UserId", this.dataUser.Id);
            const retDataBerat = await this.readDataDoc("Settings", "SkalaNyeri", "Berat");
            const retDataSedang = await this.readDataDoc("Settings", "SkalaNyeri", "Sedang");
            const retDataRingan = await this.readDataDoc("Settings", "SkalaNyeri", "Ringan");
            const retAll = retDataBerat.concat(retDataSedang).concat(retDataRingan);
            const retDataNormal = await this.readDataDoc("Settings", "DjjGj", "Normal");
            const retDataWaspada = await this.readDataDoc("Settings", "DjjGj", "Waspada");
            const retAllDjjGj = retDataNormal.concat(retDataWaspada);
            const retTens = await this.readWhere("TerapiTens", "IdCust", this.dataUser.Id);
            if(retData.length > 0){
                this.lastValSensor.jantung = retData[retData.length-1].Jantuk;
                this.lastValSensor.gerak = retData[retData.length-1].Gerak;
            }
            else {
                this.lastValSensor.jantung = 0;
                this.lastValSensor.gerak = 0;
            }
            if(retNyeri.length > 0){
                this.lastValSensor.nyeri = retNyeri[retNyeri.length-1].Answer.filter(x => x == true).length;
                this.lastValSensor.dariXnyeri = retNyeri[retNyeri.length-1].Answer.length;
            } else {
                this.lastValSensor.nyeri = 0;
                this.lastValSensor.dariXnyeri = 0;
            }
            this.lastValSensor.saran = "-";
            this.lastValSensor.categoryNyeri = "-";
            for(var x = 0 ; x < retAll.length; x++){
                if(this.lastValSensor.nyeri >= retAll[x].Minimum && this.lastValSensor.nyeri <= retAll[x].Maximum){
                    this.lastValSensor.saran = retAll[x].Saran;
                    this.lastValSensor.categoryNyeri = retAll[x].Category;
                }
            }
            if(retTens.length > 0){
                this.lastValSensor.durasi = retTens[retTens.length-1].TimeTens;
            } else {
                this.lastValSensor.durasi = 0;
            }
            for(var y = 0 ; y < retAllDjjGj.length; y++){
                if(this.lastValSensor.jantung >= retAllDjjGj[y].DjjMin && this.lastValSensor.jantung <= retAllDjjGj[y].DjjMax
                    && this.lastValSensor.gerak >= retAllDjjGj[y].GjMin && this.lastValSensor.gerak <= retAllDjjGj[y].GjMax){
                    this.lastValSensor.saranDjj = retAllDjjGj[y].Saran.toString();
                    this.lastValSensor.categoryDjj = retAllDjjGj[y].Category;
                }
                else {
                    this.lastValSensor.saranDjj = retAllDjjGj[retAllDjjGj.length-1].Saran.toString();
                    this.lastValSensor.categoryDjj = retAllDjjGj[retAllDjjGj.length-1].Category;
                }
            }
       },
        
    },
}
</script>