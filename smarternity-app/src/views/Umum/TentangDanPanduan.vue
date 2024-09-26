<template>
    <div class="row " style="margin-top: 75px; padding-bottom: 100px; z-index: 0;">
        <div v-for="(info, index) in informations" :key="index" class="class-12 card border border-info mb-2 mx-1 w-100">
            <div class="card-header my-0 py-0">
                <p>{{ info[0] }}</p>
            </div>
            <div class="card-body my-0 py-0">
                <p>{{ info[1] }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {  
    data()
    {
        return{
            informations : [],
        }
    },
    beforeMount(){
        this.getInformation();
    },
    methods:{
        async getInformation(){
            this.informations = await this.readDataByCollectDoc("Settings", "TentangDanPanduan");
            /*
            Object.keys(this.informations).forEach(key => {
                console.log(key, this.informations[key]);
            });
            */
        },
        
        
    },
    updated(){
        
       
    },
}
</script>