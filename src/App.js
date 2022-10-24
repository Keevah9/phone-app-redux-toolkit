import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import CartContainer from './components/CartContainer';
import {useSelector,useDispatch} from 'react-redux'
import {calculateTotals, getCartItems} from './features/cart/cartSlice'

function App() {
  const {cartItems, isLoading} = useSelector((store)=> store.cart)
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCartItems())
  }, [])

  useEffect(()=>{
    dispatch(calculateTotals())
  }, [cartItems])

  if(isLoading){
    return (
    <div className='loading'>
      <h1>Loading...</h1>
    </div>
    )
  }

  return (
    <main className="App">
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
