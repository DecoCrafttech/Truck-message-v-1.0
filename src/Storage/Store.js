import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Slices/LoginSlice"; 

const Store = configureStore({
    reducer:{
        login:LoginSlice, 
    }
})

export default Store