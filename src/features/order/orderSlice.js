import {createOrder} from "./orderAPI";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
const initialState = {
    status: 'idle',
    orders: []
}

export const createOrderAsync = createAsyncThunk(
    "order/createOrder",
    async (order)=>{
        const response = await createOrder(order)
        return response.data
    }
)

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createOrderAsync.pending,(state)=>{
                state.status = 'pending'
            })
            .addCase(createOrderAsync.fulfilled,(state, action) => {
                state.orders.push(action.payload)
            })
    }
})