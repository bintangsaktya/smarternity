<template>
     <div class="row" style="margin-top: 75px;">
        <div class="col-12">
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="bulan" style="font-size: 12px;">Bulan</label>
                        <select class="form-control form-control-sm rounded" id="bulan" @change="getTotalWeek" v-model="valMonth">
                            <option v-for="(month, index) in monthNames" :key="index" :value="month">{{ month }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="tahun" style="font-size: 12px;">Tahun</label>
                        <select class="form-control form-control-sm rounded" id="tahun" v-model="valYear">
                            <option v-for="(year, index) in 100" :key="index" :value="2020+year">{{ 2020+year }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="minggu" style="font-size: 12px;">Minggu</label>
                        <select class="form-control form-control-sm rounded" id="minggu" @change="getData" v-model="selectWeek">
                            <option v-for="i in weekNumber" :key="i">{{ i }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 mb-2">
            <div class="card">
                <div class="card-body border-0">
                    <Line :data="data" :options="options" />
                </div>
            </div>
                    
        </div>

        <div class="col-12 mb-2">
            <p class="m-0 p-0"><strong>Lakukan monitoring berikut</strong></p>
            <div class="card bg-blue4 border-0">
                <div class="card-body  w-100 d-flex h-100 justify-content-center m-1 p-1">
                    <div class="row w-100 text-center">
                        <div class="col-9 justify-content-center align-self-center">
                            <p class="m-0 p-0 text-left" style="font-size: 14px;">Hitung Denyut Jantung Janin</p>
                        </div>
                        <div class="col-3 justify-content-center align-self-center">
                            <a href="/HitungDenyutDanGerak/1">
                                <img src="@/assets/next.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 mb-2">
            <div class="card bg-blue4 border-0">
                <div class="card-body  w-100 d-flex h-100 justify-content-center m-1 p-1">
                    <div class="row w-100 text-center">
                        <div class="col-9 justify-content-center align-self-center">
                            <p class="m-0 p-0 text-left" style="font-size: 14px;">Hitung Gerak Janin</p>
                        </div>
                        <div class="col-3 justify-content-center align-self-center">
                            <a href="/HitungDenyutDanGerak/2">
                                <img src="@/assets/next.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

     </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)


export default {  
    components: { Line },   
    data()
    {
        return{
            dataParam: this.$route.params.param, 
            listChat: false,
            data: {
                labels: [],
                datasets: [
                        { 
                            data: [],
                            label: '',
                            backgroundColor: '#f87979',
                        }
                    ],
                
            },
            options: {
                responsive: true
            },
            monthNames : ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December" ],
            valMonth : "January",
            valYear: new Date().getFullYear(),
            weekNumber : 1,
            selectWeek: 1,
            newLabel: "Detak Jantung Janin",
        }
    },
    beforeMount(){
    },
    methods:{
        getTotalWeek(){
            var year = new Date().getFullYear();
            var numberMonth = new Date(this.valMonth + ' 1, ' + year).getMonth() + 1;
            this.weekNumber = this.weeksinMonth(numberMonth,year);
        },
        weeksinMonth(m, y){
            y= y || new Date().getFullYear();
            var d= new Date(y, m, 0);
            return Math.floor((d.getDate()- 1)/7)+ 1;     
        },
        async getData(){
            const dataLabel = [];
            const dataSheet = [];
            const retData = await this.readDatafTeraphyLowBack("Sensors", "IdCust");
            var numberMonth = new Date(this.valMonth + ' 1, ' + this.valYear).getMonth() + 1;

            for(var i=0; i < retData.length; i++){
                var createDate = retData[i].CreateDate.toDate().toISOString().slice(0, 10);
                var curDate = new Date(createDate);

                this.selectWeek -= 1;
                const { startDate, endDate } = this.getStartAndEndDateOfWeek(this.selectWeek, this.valYear + '-' + this.valMonth +'-1');
                
                if( curDate >= startDate && curDate <= endDate) {
                    dataLabel.push(createDate);
                    if(this.dataParam == "1") {
                        dataSheet.push(retData[i].Jantuk);
                        this.newLabel = "Detak Jantung Janin";
                    } else {
                        dataSheet.push(retData[i].Gerak);
                        this.newLabel = "Gerak Janin";
                    }
                } 

                //reset week
                this.selectWeek += 1;
            }

            if(dataSheet.length == 0){
                alert("Data Masih Kosong");
            }
            this.data = {
                labels: dataLabel,
                datasets: [
                        { 
                            data: dataSheet,
                            label: this.newLabel,
                            backgroundColor: '#f87979',
                        }
                    ],
                
            };
        }
    },
}
</script>