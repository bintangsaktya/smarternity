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
                        <select class="form-control form-control-sm rounded" id="minggu" @change="getSkalaNyeri" v-model="selectWeek">
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
            <h6>Untuk mengurangi nyeri punggung</h6>
        </div>
        <div class="col-12 w-100 mb-2 ">
            <div class="card border-0 bg-blue2" style="border-radius: 15px 15px 15px 15px;">
                <div class="card-body " >
                    <div class="row w-100 m-0 p-0 text-center">
                        <div class="col-2 m-0 p-0 w-100 justify-content-center align-self-center">
                            <img src="@/assets/lowback.png" style="height: 50px;" />
                        </div>
                        <div class="col-8 m-0 p-0 w-100 justify-content-center align-self-center text-left">
                            <p style="font-size: 12px;">Ketahui tingkat nyeri punggung anda sebelum melakukan olahraga atau terapi tens</p>
                        </div>
                        <div class="col-2 m-0 p-0 w-100 justify-content-center align-self-center">
                            <a href="/KuesionerNyeri">
                                <img src="@/assets/next.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 w-100 mb-2 ">
            <div class="card border-0 bg-blue2" style="border-radius: 15px 15px 15px 15px;">
                <div class="card-body " >
                    <div class="row w-100 m-0 p-0 text-center">
                        <div class="col-2 m-0 p-0 w-100 justify-content-center align-self-center">
                            <img src="@/assets/olahraga.png" style="height: 40px;" />
                        </div>
                        <div class="col-8 m-0 p-0 w-100 justify-content-center align-self-center text-left">
                            <p style="font-size: 12px;">Olahraga adalah cara terbaik untuk mengurangi nyeri punggung bawah</p>
                        </div>
                        <div class="col-2 m-0 p-0 w-100 justify-content-center align-self-center">
                            <a href="/PanduanOlahraga">
                                <img src="@/assets/next.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 w-100 mb-2 ">
            <div class="card border-0 bg-blue2" style="border-radius: 15px 15px 15px 15px;">
                <div class="card-body " >
                    <div class="row w-100 m-0 p-0 text-center">
                        <div class="col-2 m-0 p-0 w-100 justify-content-center align-self-center">
                            <img src="@/assets/tens.png" style="height: 40px;" />
                        </div>
                        <div class="col-8 m-0 p-0 w-100 justify-content-center align-self-center text-left">
                            <p style="font-size: 12px;">Tekan untuk melakukan terapi TENS</p>
                        </div>
                        <div class="col-2 m-0 p-0 w-100 justify-content-center align-self-center">
                            <a href="/TerapiTens/15">
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
            listChat: false,
            data: {
                labels: [],
                datasets: [
                        { 
                            data: [],
                            label: 'Skala Nyeri Harian',
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
        async getSkalaNyeri(){
            const dataLabel = [];
            const dataSheet = [];
            const retData = await this.readDataTeraphyLowBack("KuesionerNyeri", "UserId");
            var numberMonth = new Date(this.valMonth + ' 1, ' + this.valYear).getMonth() + 1;
            for(var i=0; i < retData.length; i++){
                const splitDate = retData[i].CreateDate.split(".");
                const curDate = new Date(splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]);

                this.selectWeek -= 1;
                const { startDate, endDate } = this.getStartAndEndDateOfWeek(this.selectWeek, this.valYear + '-' + this.valMonth +'-1');

                if(splitDate[1] == numberMonth && splitDate[2] == this.valYear && (curDate >= startDate && curDate <= endDate) ){
                    //console.log("sesuai bulan", retData[i].CreateDate, retData[i].Answer);
                    const countTrue = retData[i].Answer.filter(x => x == true);
                    dataLabel.push(splitDate[0] + ' ' + this.monthNames[splitDate[1]]);
                    dataSheet.push(countTrue.length);
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
                            label: 'Skala Nyeri Harian',
                            backgroundColor: '#f87979',
                        }
                    ],
                
            };
        },
        
            
    },
}
</script>