<template>
     <div class="row" style="margin-top: 75px;">
        <div class="col-12 mb-2" >
            <div class="card ">
                <div class="card-body ">
                    <ul style="font-size: 12px;" class="m-0 p-0 w-100" >
                        <li >Berilah tanda ✔ pada kotak yang sesuai dengan  tingkat nyeri yang anda rasakan saat ini</li>
                        <li>Jika anda tidak merasakan nyeri, pilih kotak “O”</li>
                        <li>Jika anda merasakan nyeri yang paling parah, pilih kotak “IO”</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-12">
            <table class="table text-center" id="tblNyeri" style="font-size: 12px;">
                <thead>
                     <tr>
                        <th>Tingkat Nyeri</th>
                        <th>Deskripsi</th>
                        <th>Checklist</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(quest, index) in questions" :key="index">
                        <td>{{ index }}</td>
                        <td>{{ quest }}</td>
                        <td><div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" 
                                    id="flexCheckChecked" v-model="answer[index]" >
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-12 pb-5">
            <button class="btn btn-block btn-md text-white bg-blue3 " @click="saveData">Selesai</button>
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
            answer: [],
        }
    },
    beforeMount(){
        this.getKuesioner();
    },
    methods:{
        async getKuesioner(){
            this.questions = await this.readDataByCollectDoc("Settings", "MasterPertanyaan");
            Object.keys(this.questions).forEach(key => {
                //console.log(key, this.questions[key]);
                this.answer[key] = false;
            });
        },
        async saveData(){
            const docData = this.generateId();
            var objAnswer = {}
            objAnswer = {
                "UserId": this.dataUser.Id,
                "Answer" : this.answer,
                "CreateDate" : docData.replaceAll(this.dataUser.Id + "-", ""),
            };
            const retInsert = await this.insertData("KuesionerNyeri", docData, objAnswer);
            if(retInsert){
                window.location.href="/HasilKuisioner";
            } else {
                alert("Periksa Koneksi Anda");
            }
        }
    },
    updated(){
        setTimeout(function() 
        { 
            $("#tblNyeri").DataTable({
                "scrollX": true,
                "autoWidth": false,
                "retrieve": true,
                "searching": false,
                "pageLength": 20,
                "dom": "rtip",
                "bPaginate": false,
                "bInfo": false,
            });
            
        }, 1000); //harus ada ini untuk datatable
        console.log("masuk update");
       
    },
}
</script>