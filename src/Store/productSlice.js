import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        status:StatusCode.IDLE
    },
    reducers: {
        // fetchProducts(state, action) {
        //     state.data = action.payload;
        // }
    },
    extraReducers:(builder) => {
           builder
           .addCase(getProducts.pending,(state,action) => {
            state.status=StatusCode.LOADING;
           })
           .addCase(getProducts.fulfilled,(state , action) => {
            state.data = action.payload;
            state.status=StatusCode.IDLE;
           })
           .addCase(getProducts.rejected,(state,action) => {
            state.status=StatusCode.ERROR;
           })
    }
});

export default productSlice.reducer;
export const { fetchProducts } = productSlice.actions;

export const getProducts = createAsyncThunk('products/get',async () => {
                 const response = await fetch('https://fakestoreapi.com/products');
                 const data = await response.json();
                 return data;

})

// export const getProducts = () => {
//     return async function getProductsThunk(dispatch, getState) {
//         try {
//             const response = await fetch('https://fakestoreapi.com/products');
//             const data = await response.json();
//             dispatch(fetchProducts(data));
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
// };
