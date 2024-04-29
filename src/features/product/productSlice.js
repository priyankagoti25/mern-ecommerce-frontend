import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchAllProduct, fetchAllProductByFilter, fetchAllProductWithSort} from "./productAPI";
import _ from 'lodash'
const initialState = {
    products: [],
    status: 'idle',
};
export const fetchAllProductAsync = createAsyncThunk(
    'product/fetchAllProduct',
    async () => {
        const response = await fetchAllProduct();
        return response.data;
    }
);
export const fetchAllProductByFiltersAsync = createAsyncThunk(
    'product/fetchAllProductByFilter',
    async (filter) => {
        const response = await fetchAllProductByFilter(filter);
        return response.data;
    }
);

export const fetchAllProductBySortAsync = createAsyncThunk(
    'product/fetchAllProductBySort',
    async (option) => {
        const response = await fetchAllProductWithSort(option);
        return response.data;
    }
);
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchAllProductByFiltersAsync.pending,(state)=>{
                state.status = 'loading';
            })
            .addCase(fetchAllProductByFiltersAsync.fulfilled,(state,action)=>{
                console.log('action', action)
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchAllProductBySortAsync.pending,(state)=>{
                state.status = 'loading';
            })
            .addCase(fetchAllProductBySortAsync.fulfilled,(state,action)=>{
                state.status = 'idle';
                const newData = _.sortBy(action.payload,action.meta.arg.sort,action.meta.arg.order)
                if(action.meta.arg.order === 'desc'){
                    state.products = _.reverse(newData)
                }
                else{
                    state.products = newData
                }
            })
    },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
