import { defineStore } from 'pinia'
import axios from "axios";



export const useCart = defineStore('cart', () => {

    const cartContent=ref({})
    const cartLength=ref(0)
    const totalCost=ref(0)
    const isLoading=ref(false)



    const products=ref(null)
    const productsLoading=ref(true)
    const baseUrl='https://eshop.asad-pro.com/api'
    const response=ref({})


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



    function getProduct(_id) {
        return products.value.find(product=> {
            if(product.id.toString() === _id)
            {
                return product
            }
        })

    }



    function addToCart(product_id,quantity)
    {
        if(cartContent.value.hasOwnProperty(product_id))
        {
            alert("This product already added in Cart")
        }
        else
        {
          cartContent.value[product_id]=
            {
                product_id:product_id,
                quantity: quantity
            }
            cartLength.value++
        }

    }

    function cartProducts()
    {
        totalCost.value=0
        return Object.keys(cartContent.value).map(product_id => {
            const product=cartContent.value[product_id]

            const productDetails=getProduct(product_id)

            const cost=product.quantity * productDetails.selling_price

            totalCost.value+=cost


            return {
              id: product.product_id,
              name:productDetails.name,
              selling_price:productDetails.selling_price,
              image:productDetails.image,
              quantity: product.quantity,
              cost: cost
            }
        })

    }


    function removeCartItem(_id)
    {
        if(cartContent.value.hasOwnProperty(_id))
        {
            delete cartContent.value[_id]
            cartLength.value--
        }
    }

    function incrementQuantity(_id)
    {
        if(cartContent.value.hasOwnProperty(_id))
        {
            cartContent.value[_id].quantity++
        }
    }
    function decrementQuantity(_id)
    {
        if(cartContent.value.hasOwnProperty(_id))
        {
            if(cartContent.value[_id].quantity===1)
            {
                removeCartItem(_id)
            }
            else
            {
                cartContent.value[_id].quantity--
            }
        }
    }

    function resetCart()
    {
        cartContent.value={}
        cartLength.value=0
        totalCost.value=0
        isLoading.value=false
        products.value=null
        response.value={}
    }


    function proceedOrder(formData)
    {
        isLoading.value=true
        console.log(cartProducts())
        formData.carts= cartProducts()
        axios.post(baseUrl+'/proceed-order',formData)      
              .then((res)=>{
                response.value=res.data
                if(response.value.success)
                {
                    isLoading.value=false
                    alert('Order submitted successfully')
                    resetCart()
                    navigateTo('/orders')
                }
               }) 
              .catch((error)=>{
                  console.log(error)
                  alert('Order submission falied')
                  isLoading.value=false
               })
    }



    return { cartContent,cartLength,totalCost, addToCart,cartProducts,removeCartItem, incrementQuantity, decrementQuantity, proceedOrder }
},{
  persist: true,
})