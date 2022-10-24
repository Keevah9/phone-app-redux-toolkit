import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
    isOpen: false,
    cartItems: cartItems
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state,action)=>{
            state.isOpen = true
        },
        closeModal: (state,action) => {
            state.isOpen = false
        },
        clearCart: (state,action) =>{
            state.cartItems = []
        }
    }
})

export const {openModal,closeModal, clearCart} = modalSlice.actions
export default modalSlice.reducer
