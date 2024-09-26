<template>
<div class="col-12 mb-4" style="z-index: 1000000;">
    <div class="row">
        <div class="col-3 ">
            <img src="@/assets/iconpasien.png" />
        </div>
        <div class="col-7 m-0 p-0">
            <p class="m-0 p-0 font-weight-bold">Hi, {{Nama}}</p>
            <p class="m-0 p-0 text-secondary"><small>Bagaimana kabarmu hari ini?</small></p>
        </div>
        <div class="col-2">
            <i class="fa-regular fa-bell"></i>
        </div>
    </div>
</div>
</template>
<script>

export default {
    data()
    {
        return{
           Nama: null,
        }
    },
    beforeMount(){
        const dataStorage = JSON.parse(localStorage.user);
        this.Nama = dataStorage.Nama;
    },
    methods:{
        
    },
}
</script>
