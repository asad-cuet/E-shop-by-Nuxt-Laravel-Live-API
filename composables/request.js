import axios from "axios";

export const useRequest=()=> {

    const isLoading=ref(false)  
    const response=ref({})  
    const baseUrl='https://eshop.asad-pro.com/api'

    const getRequest=(api)=>{
        isLoading.value=true
        return axios.get(baseUrl+'/'+api)      
        .then((res)=>{
            isLoading.value=false
            response.value=res.data
            console.log(response.value)
            if(response.value.success)
            {
                //console.log(response.value.message)
                return response.value.data
            }
            else
            {
                return false
            }
            }) 
        .catch((error)=>{
            isLoading.value=false
            console.log(error)
            })
    }



    const postRequest=(api,postData)=>{
        isLoading.value=true
        return axios.post(baseUrl+'/'+api,postData)      
              .then((res)=>{
                response.value=res.data
                console.log(response.value)
                if(response.value.success)
                {
                    //console.log(response.value.message)
                    return true
                }
                else
                {
                    return false
                }
               }) 
              .catch((error)=>{
                  console.log(error)
                  isLoading.value=false
                  return false
               })
    }

    const postRequestData=(api,postData)=>{
        isLoading.value=true
        return axios.post(baseUrl+'/'+api,postData)      
              .then((res)=>{
                response.value=res.data
                console.log(response.value)
                if(response.value.success)
                {
                    console.log('Data',response.value.data)
                    return response.value.data
                }
               }) 
              .catch((error)=>{
                  console.log(error)
                  isLoading.value=false
               })
    }




    return {
        getRequest,postRequest,postRequestData
    }
}
