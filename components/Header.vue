<template>
    <div>

    <nav class="navbar navbar-expand-lg">
      <div class="container">
        
        <NuxtLink class="navbar-brand" to="/">
          <img src="/favicon.ico" class="rounded" alt="Logo" width="70px">
          E-Shop
        </NuxtLink>

        <!-- Search box -->
         <div class="search-bar">
          <form action="" method="POST">
          <div class="input-group">
            <input type="search" class="form-control" name="product_name" id="auto_complete" placeholder="Seach Product" aria-label="Username" aria-describedby="basic-addon1">          
            <button type="submit" class="input-group-text"><i class="fa fa-search"></i></button>
          </div>
          </form>
         </div>


        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <NuxtLink class="nav-link {{Request::is('/') ? 'active':'' }}" aria-current="page" to="/">Products</NuxtLink>
            </li>

            <li class="nav-item">
              <NuxtLink class="nav-link {{Request::is('category') ? 'active':'' }}" to="/categories">Category</NuxtLink>
            </li>
            
            

            <div v-if="auth.isLoggedIn()">
                <li class="nav-item">
                <NuxtLink class="nav-link " to="/carts"><i class="fa fa-shopping-cart"></i> Cart
                <span class="badge badge-pill bg-primary cart-count">{{ myCart.cartLength }}</span>
                </NuxtLink>
                </li>
            
            

                <!-- <li class="nav-item">
                <NuxtLink class="nav-link {{Request::is('wishlist') ? 'active':'' }}" href=""><i class="fa fa-wish-list"></i> Wishlist
                    <span class="badge badge-pill bg-success wish-count">0</span>
                </NuxtLink>
                </li> -->

            </div>
       

            <li v-if="!auth.isLoggedIn()" class="nav-item">
                <NuxtLink class="nav-link bg-success btn text-white" to="/auth/login">Login</NuxtLink>
            </li>

            <li v-if="!auth.isLoggedIn()" class="nav-item">
                <NuxtLink class="nav-link bg-primary btn text-white" style="margin-left:2px;" to="/auth/register">Register</NuxtLink>
            </li>








            <!-- <div v-if="auth.isLoggedIn()"> -->
                <!-- <li class="nav-item dropdown">
                    <button type="button" id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ name }}
                    </button>

                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">

                        <NuxtLink to="/auth/profile" class="dropdown-item">Profile</NuxtLink>
                        <NuxtLink to="" class="dropdown-item">My Orders</NuxtLink>
                    
                        <button class="dropdown-item" @click="auth.logout()">
                            Logout
                        </button>
                    </div>
                </li> -->
                
            <!-- </div> -->





            
            <li v-if="auth.isLoggedIn()" class="nav-item">
                      <NuxtLink class="nav-link" to="/auth/profile">Profile</NuxtLink>
            </li>
            <li v-if="auth.isLoggedIn()" class="nav-item">
                      <NuxtLink class="nav-link" to="/orders">My Orders</NuxtLink>
            </li>

            <li v-if="auth.isLoggedIn()" class="nav-item">
                  <button v-if="!auth.isLoading" class="nav-link bg-danger text-white btn" @click="auth.logout()">
                            Logout
                  </button>
                  <button v-else class="nav-link bg-danger text-white btn" @click="auth.logout()" disabled>
                            Loading
                  </button>
            </li>


        
          </ul>
        </div>
      </div>
    </nav>


    </div>
</template>



<script setup>
import {useAuth} from '@/stores/auth.js'
import { useCart } from '@/stores/cart.js'
const auth=useAuth()
const myCart=useCart()
const name=auth.user.name





</script>