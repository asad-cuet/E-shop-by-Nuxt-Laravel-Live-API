import { defineStore } from 'pinia'
import axios from "axios";


export const useProduct = defineStore('product', () => {

    const baseUrl='https://eshop.asad-pro.com/api'
    const response=ref({})
    const products=ref(null)
    const productsLoading=ref(true)


    axios.get(baseUrl+'/products')      
    .then((res)=>{
        response.value=res.data
        if(response.value.success)
        {
            productsLoading.value=false
            products.value=response.value.data
        }
        }) 
    .catch((error)=>{
        productsLoading.value=false
        console.log(error)
        })


    async function getProduct(_id) {
        productsLoading.value=true
        const data=await axios.get(baseUrl+'/products/'+_id)      
        .then((res)=>{
            response.value=res.data
            if(response.value.success)
            {
                productsLoading.value=false
                return response.value.data
                 
            }
            }) 
        .catch((error)=>{
            productsLoading.value=false
            console.log(error)
            })
        // console.log(data)
        return data
    }

  
    return { products,productsLoading, getProduct }
  },{
    persist: true,
  })