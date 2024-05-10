import {createUser, checkUser, addAddress, fetchAddress} from "./components/authAPI";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    loggedInUser: null,
    status: 'idle',
    error: null,
    addresses:[],
}
export const createUserAsync = createAsyncThunk(
    "auth/createUser",
    async (userData)=>{
        console.log('userData',userData)
        const response = await createUser(userData)
        console.log('sdsd',response)
        return response.data
    }
)
export const checkUserAsync = createAsyncThunk(
    "auth/checkUser",
    async (loginInfo)=>{
        const response = await checkUser(loginInfo)
        return response.data
    }
)
export const fetchAddressAsync = createAsyncThunk(
    "auth/fetchAddress",
    async (userID)=>{
        const response = await fetchAddress(userID)
        return response.data
    }
)
export const addAddressAsync = createAsyncThunk(
    "auth/addAddress",
    async (address)=>{
        console.log('address',address)
        const response = await addAddress(address)
        console.log('sdsd',response)
        return response.data
    }
)
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(createUserAsync.pending,(state)=>{
            state.status = 'loading'
            })
            .addCase(createUserAsync.fulfilled,(state, action)=>{
                console.log('user', action)
                state.status = "idle"
                state.loggedInUser = action.payload
            })
            .addCase(checkUserAsync.pending,(state)=>{
                state.status = 'loading'
                state.error = null
            })
            .addCase(checkUserAsync.fulfilled,(state, action)=>{
                console.log('user', action)
                state.status = "idle"
                state.loggedInUser = action.payload
                state.error = null
            })
            .addCase(checkUserAsync.rejected,(state, action)=>{
                state.status = "idle"
                state.error = action.error
            })
            .addCase(fetchAddressAsync.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(fetchAddressAsync.fulfilled,(state, action)=>{
                state.status = "idle"
                state.addresses = action.payload
            })
            .addCase(addAddressAsync.pending,(state, action)=>{
                state.status = 'loading'
                state.error = null
            })
            .addCase(addAddressAsync.fulfilled,(state, action)=>{
                state.status = "idle"
                state.addresses.push(action.payload)
                state.error = null
            })
    }
})

export const selectedLoggedInUser = state=>state.auth.loggedInUser
export const selectedAddresses = state=>state.auth.addresses
export const loginError = state=>state.auth.error
export default authSlice.reducer