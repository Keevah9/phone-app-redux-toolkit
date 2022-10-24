import React from 'react'
import {clearCart} from '../features/cart/cartSlice'
import { closeModal } from '../features/modal/modalSlice'
import { useDispatch, useSelector } from 'react-redux'

const Modal = () => {
    const dispatch = useDispatch()
    // const {clearCart} = useSelector((store)=> store.cart)
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all items from your shopping cart</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() =>{ 
                dispatch(clearCart())
                dispatch(closeModal());
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Modal

