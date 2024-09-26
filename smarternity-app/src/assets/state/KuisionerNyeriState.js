import { reactive } from 'vue'

export const hasilKuisioner = reactive({
  hasil: 0,
  dari: 0,
  message: "",
  setHasil(a, b, c){
    this.hasil = a;
    this.dari = b;
    this.message = c
  }
})