import { defineStore } from 'pinia'
import {useAuth} from '@/stores/auth.js'
import axios from "axios";



export const useOrder = defineStore('order', () => {
    const auth=useAuth()
    const isLoading=ref(false)
    const response=ref({})
    const baseUrl='https://eshop.asad-pro.com/api'



    function getOrders()
    {
        isLoading.value=true
        if(auth.user.name==="")
        {
            isLoading.value=false
            return false
        }
        else
        {
            
            return axios.post(baseUrl+'/my-orders',auth.user)      
                        .then((res)=>{
                        response.value=res.data
                        if(response.value.success)
                        {
                            isLoading.value=false
                            return response.value.data

                        }
                        }) 
                        .catch((error)=>{
                            console.log(error)
                            isLoading.value=false
                        })
        }

    }


    function getOrderInfo(_id)
    {
        isLoading.value=true
        if(auth.user.name==="")
        {
            isLoading.value=false
            return false
        }
        else
        {
            
            return axios.get(baseUrl+'/order-info/'+_id)      
                        .then((res)=>{
                        response.value=res.data
                        if(response.value.success)
                        {
                            isLoading.value=false
                            return response.value.data

                        }
                        }) 
                        .catch((error)=>{
                            console.log(error)
                            isLoading.value=false
                        })
        }
    }


    function getOrderDetails(_id)
    {
        isLoading.value=true
        if(auth.user.name==="")
        {
            isLoading.value=false
            return false
        }
        else
        {
            
            return axios.get(baseUrl+'/my-orders/'+_id)      
                        .then((res)=>{
                        response.value=res.data
                        if(response.value.success)
                        {
                            isLoading.value=false
                            return response.value.data

                        }
                        }) 
                        .catch((error)=>{
                            console.log(error)
                            isLoading.value=false
                        })
        }
    }



    return {  getOrders, getOrderInfo, getOrderDetails }
},{
  persist: true,
})