<template>
    <div class="row align-items-center bg-blue" style="height: 100vh;">
        <div v-if="slideOnBoarding == 1" class="col-12 text-center">
            <HeaderLogReg />
            <p>Selamat datang di SMARTernity!</p>
            <h7 class="text-white">Mari kita hitung usia kehamilan anda!</h7>
            <div class="row mx-1 my-2" @click="goingTo(2)">
                 <div class="col-12">
                    <div class="card py-2">
                        <div class="row align-items-center">
                            <div class="col-3">
                                <img src="@/assets/water.png" />
                            </div>
                            <div class="col-6 text-left mt-1">
                                <h6>Haid Terakhir</h6>
                            </div>
                            <div class="col-3">
                                <img src="@/assets/next.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mx-1 my-2" @click="goingTo(3)">
                 <div class="col-12">
                    <div class="card py-2">
                        <div class="row align-items-center">
                            <div class="col-3">
                                <img src="@/assets/mask.png" />
                            </div>
                            <div class="col-6 text-left mt-1">
                                <h6>Data Ultrasonografi (USG)</h6>
                            </div>
                            <div class="col-3">
                                <img src="@/assets/next.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="slideOnBoarding == 2" class="col-12 ">
            <div class="row">
                <div class="col-12 text-center">
                    <h6 class="text-white">Hitung usia kehamilan berdasarkan haid terakhir</h6>
                </div>  
                <div class="col-12">
                    <div class="form-group">
                        <label for="Tanggal" >Tanggal</label>
                        <input type="date" class="form-control form-control-sm" v-model="lastHaid" />
                    </div>
                    <button class="btn btn-md btn-block btn-blue" @click="calcAgePregnancy(false)">Simpan</button>
                </div>
            </div>
        </div>

        <div v-else-if="slideOnBoarding == 3" class="col-12 ">
            <div class="row">
                <div class="col-12 text-center">
                    <h6 class="text-white">Hitung usia kehamilan berdasarkan hasil USG</h6>
                </div>  
                <div class="col-12">
                    <div class="form-group">
                        <label for="usia" >Usia Kehamilan</label>
                        <input type="number" class="form-control form-control-sm" placeholder="Masukan Usia Kehamilan" v-model="lastHaid" />
                    </div>
                    <button class="btn btn-md btn-block btn-blue" @click="calcAgePregnancy(true)">Simpan</button>
                </div>
            </div>
        </div>

        <div v-else-if="slideOnBoarding == 4" class="col-12 ">
            <div class="row">
                <div class="col-12 text-center">
                    <h6 class="text-white">Hitung usia kehamilan berdasarkan haid terakhir</h6>
                </div>  
                <div class="col-12 text-center">
                    <img src="@/assets/kehamilan.png" class="img" />
                    <p class="text-white">Usia kehamilan anda:</p>
                    <h2>{{ ageOfPregnancy }} Minggu</h2>
                </div>
            </div>
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
            slideOnBoarding : 1,
            ageOfPregnancy: null,
            lastHaid: null,
        }
    },
    beforeMount(){
        if(this.dataUser.AgePregnancy != undefined && this.dataUser.AgePregnancy != 0){
            window.location.href="/Dashboard";
        }
    },
    methods:{   
        
        goingTo(value){
            this.slideOnBoarding = value;
        },
        async calcAgePregnancy(fromLastHaid = false){
            const docData = this.generateId();
            if(fromLastHaid == false){
                this.diff_weeks(this.lastHaid);
            } else {
                this.ageOfPregnancy = this.lastHaid;
                this.slideOnBoarding = 4;
            }
            const dataUpdate = {
                "AgePregnancy" : this.ageOfPregnancy,
                "CreateDateAgePregnancy": docData.replaceAll(this.dataUser.Id + "-", "")
            }
            const retUpdate = await this.updateData("users", this.dataUser.Id, dataUpdate);
            this.dataUser = Object.assign(dataUpdate, this.dataUser);
            localStorage.user = JSON.stringify(this.dataUser);
            setTimeout(function(){ window.location.href="/Dashboard" }, 1500);
        }, 
        diff_weeks(dt2) 
        {
            var curDate = new Date();
            var diff =(new Date(dt2).getTime() - curDate) / 1000;
            diff /= (60 * 60 * 24 * 7);
            this.ageOfPregnancy = Math.abs(Math.round(diff));
            this.slideOnBoarding = 4;
        }
    },
}
</script>
