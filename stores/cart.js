import { defineStore } from 'pinia'
import {useAuth} from '@/stores/auth.js'
import {useRequest} from '@/composables/request.js'


export const useCart = defineStore('cart', () => {

    const auth=useAuth()
    const myRequest=useRequest()
    const postData=ref({})
    const cartLength=ref(0)
    const totalCost=ref(0)
    const cartItems=ref({})


    // const isLoading=ref(false)
    // const baseUrl='https://eshop.asad-pro.com/api'
    // const response=ref({})



    async function checkCartLength()
    {
        if(auth.isAuthenticated)
        {
            postData.value={
                user_id:auth.user.user_id
            }
            cartLength.value=await myRequest.postRequestData('cart-length',postData.value)
        }

    }

    async function addToCart(product_id,quantity)
    {
        if(!auth.isAuthenticated)
        {
            alert('Login First')
            return
        }

        postData.value={
            user_id:auth.user.user_id,
            product_id:product_id,
            quantity:quantity
        }

        const isExist=await myRequest.postRequest('check-cart',postData.value)
        if(isExist)
        {
            alert("This product already added in Cart")
        }
        else
        {
            const apiRes=await myRequest.postRequest('add-to-cart',postData.value)
            if(apiRes)
            {
                checkCartLength()
                alert("Product added in Cart")
            }
            else
            {
                alert("Product added Failed")
            }
        }

    }

    async function cartProducts()
    {
        postData.value={
            user_id:auth.user.user_id,
        }

        totalCost.value=await myRequest.postRequestData('cart-cost',postData.value)

        cartItems.value=await myRequest.postRequestData('get-carts',postData.value)
        
        checkCartLength()

    }

    async function removeCartItem(_id)
    {
        postData.value={
            cart_id:_id
        }

        const apiRes=await myRequest.postRequest('delete-cart-item',postData.value)
        if(apiRes)
        {
            cartProducts()
            checkCartLength()
        }
    }

    async function incrementQuantity(_id)
    {
        postData.value={
            cart_id:_id
        }

        const apiRes=await myRequest.postRequest('increment-cart',postData.value)
        if(apiRes)
        {
            cartProducts()
        }
    }
    async function decrementQuantity(_id)
    {
        postData.value={
            cart_id:_id
        }

        const apiRes=await myRequest.postRequest('decrement-cart',postData.value)
        if(apiRes)
        {
            cartProducts()
        }
    }

    function resetCart()
    {
        // isLoading.value=false
        // response.value={}
    }


    function proceedOrder(formData)
    {
        // isLoading.value=true
        // console.log(cartProducts())
        // formData.carts= cartProducts()
        // axios.post(baseUrl+'/proceed-order',formData)      
        //       .then((res)=>{
        //         response.value=res.data
        //         if(response.value.success)
        //         {
        //             isLoading.value=false
        //             alert('Order submitted successfully')
        //             resetCart()
        //             navigateTo('/orders')
        //         }
        //        }) 
        //       .catch((error)=>{
        //           console.log(error)
        //           alert('Order submission falied')
        //           isLoading.value=false
        //        })
    }



    return { cartLength,totalCost,cartItems,cartProducts,addToCart,removeCartItem, incrementQuantity, decrementQuantity, proceedOrder,resetCart }
},{
  persist: true,
})