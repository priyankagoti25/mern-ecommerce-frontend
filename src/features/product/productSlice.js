import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchAllProduct,
    fetchAllProductByFilter,
    fetchAllProductWithSort,
    fetchAllBrands,
    fetchAllCategories,
    fetchProductById
} from "./productAPI";
import _ from 'lodash'
const initialState = {
    products: [],
    brands: [],
    categories: [],
    status: 'idle',
    pagination:{
        first: 1,
        prev: null,
        next: null,
        pages: null
    },
    productById: null
};
export const fetchAllProductAsync = createAsyncThunk(
    'product/fetchAllProduct',
    async (pagination) => {
        const response = await fetchAllProduct(pagination);
        return response.data;
    }
);

export const fetchProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async (id) => {
        const response = await fetchProductById(id);
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

export const fetchAllBrandsAsync = createAsyncThunk(
    'product/fetchAllBrands',
    async () => {
        const response = await fetchAllBrands();
        return response.data;
    }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
    'product/fetchAllCategories',
    async () => {
        const response = await fetchAllCategories();
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
                console.log('products',action.payload)
                state.status = 'idle';
                const responseData = action.payload
                state.products = responseData.data;
                state.pagination = {
                    first: responseData.first,
                    prev: responseData.prev,
                    next: responseData.next,
                    pages: responseData.pages,
                    items: responseData.items
                }
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
            .addCase(fetchAllBrandsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.brands = action.payload
            })
            .addCase(fetchAllCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.categories = action.payload
            })
            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                console.log('sdsfsdf')
                state.status = 'idle';
                state.productById = action.payload
            })
    },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.productById;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectPagination = (state) => state.product.pagination;

export default productSlice.reducer;
