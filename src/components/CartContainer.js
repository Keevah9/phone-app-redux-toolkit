import React from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
const CartContainer = () => {

    const dispatch = useDispatch()
  const { cartItems, total, amount } = useSelector((store) => store.cart);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} {...cartItem} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button type="" className="clear-btn btn" onClick={()=>dispatch(openModal())}>clear cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;

// npm install react-router-dom@6
// npx create-react-app@latest my-app --template

// npm install @reduxjs/toolkit react-redux
// 
// libraries- redux(core lib, state management), immer(allows to mutate state), redux-thunk(handles async actions), reselect(simplifies reducer functions)
