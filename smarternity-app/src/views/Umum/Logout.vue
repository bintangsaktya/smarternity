<template>
    <p>Ini Logout</p>
</template>
<script>

export default {
    
    data()
    {
        return{
         
        }
    },
    beforeMount(){
        this.Logout();
    },
    methods:{
        async Logout(){
            localStorage.clear();
            const retData = await this.updateData("Devices", "Device1", {"IdCustActive": ""});
            window.location.href="/Login";
        }
    },
}
</script>