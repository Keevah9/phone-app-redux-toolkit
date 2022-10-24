import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import thunk from "redux-thunk";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
  cartItems:[],
  amount: 4,
  total: 0,
  isLoading: true,
};

// export const getCartItems = createAsyncThunk('cart/getCartItems', ()=>{
//   return fetch(url)
//   .then(res=>res.json()
//   .catch((err)=>console.log(err)))
// })
// with async

export const getCartItems= createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
  // name: when we need to acess something in my component.. pass from the component
  // thunkAPI can be use to access functionalities in our function
  // console.log(name);
  // console.log(thunkAPI.getState());
  // thunkAPI.dispatch(openModal())
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong')
  }
})
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      // console.log(action)
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state)=>{
        let amount = 0
        let total = 0
        state.cartItems.forEach((item)=>{
            amount += item.amount
            total += item.amount * item.price
        })
        state.amount = amount
        state.total = total.toFixed()
    }
  },
  extraReducers:{
    [getCartItems.pending]: (state)=>{
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state,action)=>{
      console.log(action)
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state, action)=>{
      console.log(action);
      state.isLoading = false
    }
  }
});

console.log(cartSlice);
export const { clearCart, removeItem, decrease, increase, calculateTotals} = cartSlice.actions;

export default cartSlice.reducer;
