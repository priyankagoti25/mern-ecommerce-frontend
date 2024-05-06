import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import {addToCart, fetchCartItemsByUser, updateCartItem, deleteCartItem} from "./cartAPI";
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

export const fetchCartItemsByUserAsync = createAsyncThunk(
    "cart/fetchCartItemsByUser",
    async (userID)=>{
        const response = await fetchCartItemsByUser(userID)
        return response.data
    }
)

export const deleteCartItemAsync = createAsyncThunk(
    "cart/deleteCartItem",
    async (id)=>{
        const response = await deleteCartItem(id)
        return response.data
    }
)

export const updateCartItemAsync = createAsyncThunk(
    "cart/updateCartItem",
    async (updated)=>{
        const response = await updateCartItem(updated)
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
            .addCase(fetchCartItemsByUserAsync.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(fetchCartItemsByUserAsync.fulfilled,(state,action)=>{
                state.status = 'idle'
                state.items = action.payload
            })
            .addCase(updateCartItemAsync.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(updateCartItemAsync.fulfilled,(state,action)=>{
                state.status = 'idle'
                state.items = state.items.map(item => {
                    if (item.id === action.payload.id) {
                        return {...item,quantity:action.payload.quantity}
                    }
                    else{
                        return item
                    }
                })
            })
            .addCase(deleteCartItemAsync.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(deleteCartItemAsync.fulfilled,(state,action)=>{
                state.status = 'idle'
                state.items = state.items.filter(item => item.id !== action.payload.id)
            })
    }
})

// export const cartCount
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer
