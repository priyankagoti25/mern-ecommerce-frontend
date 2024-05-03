import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import {addToCart} from "./cartAPI";
const initialState = {
    status: 'idle',
    items:[],
}
export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async (item)=>{
        const response = await addToCart(item)
        return response.data
    }
)

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(addToCartAsync.pending,(state)=>{
            state.status = 'loading'
            })
            .addCase(addToCartAsync.fulfilled,(state,action)=>{
                state.items.push(action.payload)
            })
    }
})
