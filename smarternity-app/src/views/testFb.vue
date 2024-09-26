<template>
    <p>asd</p>
</template>


<script>


export default {  

    data()
    {
        return{
           
        }
    },
    beforeMount(){
        const data = {
            "username": "test",
            "password" : "pass"
        };
        //this.insertData("users", "NewId", data);
        
        this.readData("Settings");
    },
    methods:{
        
    },
}
</script>