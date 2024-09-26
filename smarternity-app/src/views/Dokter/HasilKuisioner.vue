<template>
    <div class="row" style="margin-top: 75px;">
        <div class="col-12 mb-2 text-center">
            <p class="text-blue m-1 p-1"><strong>Hasil Pemeriksaan</strong></p>
            <p style="font-size: 12px;"><strong>{{createDate}}</strong></p>
        </div>
        
        <div class="col-12 mb-2 d-flex justify-content-center ">
            <div class="card bg-blue3 " style="border-radius: 50% !important; height: 200px; width:200px;">
                <div class="card-body w-100 d-flex h-100 justify-content-center m-0 p-0">
                    <div class="row w-100 text-center">
                        <div class="col-12 justify-content-center align-self-center">
                            <h1 class="text-white">{{hasil}} <span style="font-size: 12px;">dari {{dari}} </span></h1>
                            <p style="font-size: 12px;" class="text-white"> Nyeri {{resultString}} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-12 mb-2">
            <div class="card text-center " style="border-color: #2CABD8 !important;">
                <div class="card-body">
                    <p class="m-0 p-0"><strong>Saran</strong></p>
                    <p class="m-0 p-0" style="font-size: 12px;">{{saran}}</p>
                </div>
            </div>
        </div>

        <div class="col-12 mb-2">
            <a :href="'/TerapiTens/' + resultMinute" class="btn btn-block btn-md text-white bg-blue3">Terapi TENS</a>
            <button class="btn btn-block btn-md bg-transparent btn-outline-info text-dark">Selesai</button>
        </div>
    </div>
</template>


<script>
import $ from 'jquery';
export default {  
    data()
    {
        return{
           hasil: 0,
           dari: 0,
           createDate: null,
           resultMinute: 0,
           resultString: "",
           saran: "",
        }
    },
    beforeMount(){
        this.GetHasil();
        this.getScalaNyeri();
    },
    methods:{
        async GetHasil()
        {
            const retData = await this.readData("KuesionerNyeri");
            const filterData = retData.filter(x => x.UserId == this.dataUser.Id);
            const dataSort = [];

            for(var ind = 0; ind < filterData.length; ind++){
                dataSort[ind] = {
                    CreateDate : this.convertDate(filterData[ind].CreateDate),
                    UserId : filterData[ind].UserId,
                    Answer : filterData[ind].Answer,
                    CreateDateStr : filterData[ind].CreateDate,

                }
            }
            
            const sortDesc = dataSort.sort((a, b) => b.CreateDate - a.CreateDate); 

            console.log(sortDesc);

            if(filterData.length > 0){
                this.hasil = sortDesc[0].Answer.filter(x => x == true).length;
                this.dari = sortDesc[0].Answer.length;
                const createD = sortDesc[0].CreateDateStr.split(".");
                this.createDate = createD[2] + "-"+ createD[1]  + "-"+  createD[0];
            }
        },
        async getScalaNyeri(){
            const retDataBerat = await this.readDataDoc("Settings", "SkalaNyeri", "Berat");
            const retDataSedang = await this.readDataDoc("Settings", "SkalaNyeri", "Sedang");
            const retDataRingan = await this.readDataDoc("Settings", "SkalaNyeri", "Ringan");
            const retAll = retDataBerat.concat(retDataSedang).concat(retDataRingan);
            for(var x = 0 ; x < retAll.length; x++){
                if(this.hasil >= retAll[x].Minimum && this.hasil <= retAll[x].Maximum){
                    this.resultMinute = retAll[x].Minute;
                    this.resultString = retAll[x].Category;
                    this.saran = retAll[x].Saran;
                }
            }
        },
        
    },
    updated(){
       
       
    },
}
</script>