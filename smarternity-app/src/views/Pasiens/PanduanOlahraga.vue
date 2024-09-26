<template>
    <div class="row" style="margin-top: 55px;">
        <div v-for="(quest, index) in questions" :key="index" class="col-12 mb-2">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row">
                        <div class="col-3">
                        </div>
                        <div class="col-9">
                            <p class="m-0 p-0" style="font-size:12px;"><strong>{{ (parseInt(index)+1).toString() + ". " + quest[0] }}</strong></p>
                            <p class="m-0 p-0" style="font-size:12px;">{{quest[1]}}</p>
                            <button class="btn btn-block btn-sm bg-blue3 text-white rounded" 
                                @click="setFinish(index)" :disabled="isFinish[index]">
                                Tekan jika sudah dilakukan
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <div class="col-12 mb-2">
            <button class="btn btn-block btn-md text-white bg-blue3" @click="saveData">Selesai</button>
        </div>
    </div>
</template>


<script>
import $ from 'jquery';
export default {  
    data()
    {
        return{
            questions : [],
            isFinish: [],
        }
    },
    beforeMount(){
        this.getKuesioner();
    },
    methods:{
        async getKuesioner(){
            this.questions = await this.readDataByCollectDoc("Settings", "MasterOlahraga");
            Object.keys(this.questions).forEach(key => {
                //console.log(key, this.questions[key]);
                this.isFinish[key] = false;
            });
        },
        setFinish(idx){
            this.isFinish[idx] = true;
        },
        async saveData(){
            const docData = this.generateId();
            var objAnswer = {}
            objAnswer = {
                "UserId": this.dataUser.Id,
                "Answer" : this.isFinish,
                "CreateDate" : docData.replaceAll(this.dataUser.Id + "-", ""),
            };
            const retInsert = await this.insertData("PanduanOlahraga", docData, objAnswer);
            if(retInsert){
                alert("Sukses Menyimpan");
            } else {
                alert("Periksa Koneksi Anda");
            }
        }
        
    },
    updated(){
        
       
    },
}
</script>