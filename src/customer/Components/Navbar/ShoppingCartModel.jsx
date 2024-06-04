import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { RemoveCartItemNew, updateCartQtyNEW, getCartItems } from '../../../action/cart';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProgressBar } from '../Cart/ShippingComponent';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const buttonStyles = 'absolute top-2 right-2 text-zinc-500 hover:text-zinc-700';
const containerStyles = 'flex justify-center items-center w-full h-[40vh] bg-zinc-100';
const innerContainerStyles = 'relative w-[100%] h-[50vh] p-4 bg-white border border-zinc-300 rounded shadow-md';
const textStyles = 'text-center m-14 text-zinc-600';
const buttonClasses = 'px-2  ';

const modalClasses = "w-full bg-zinc-600 bg-opacity-50 flex items-center justify-center z-50";
const closeButtonClasses = "absolute top-2 right-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white";
const productContainerClasses = "flex overflow-x-auto space-x-4 pb-4";
const productCardClasses = "flex-shrink-0 w-24";
const borderClasses = "border-t border-zinc-200 dark:border-zinc-700 my-4";
const subtotalClasses = "flex justify-between items-center mb-4";
const checkoutButtonClasses = "w-full bg-black text-white py-2 rounded-lg flex items-center justify-center mb-4";
const continueShoppingButtonClasses = "w-full text-black dark:text-white py-2 rounded-lg border border-zinc-300 dark:border-zinc-600";
const commonContainerClasses = "bg-white z-100 dark:bg-zinc-800 p-4 w-96 h-auto border border-zinc-300 dark:border-zinc-700 shadow-lg rounded";

const SingleProduct = {
  id: 1,
  image: 'https://assets.target.com.au/transform/f3c5fa5e-06c7-4a9c-a80f-d97240bb9ef8/355_69298899_1-282E3B?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp',
  price: 9.95,
  name: 'Baby Organic Cotton Print Zip Coverall - Leaves',
  quantity: 1,
};

export const EmptyCart = ({ handleCloseCart }) => {
  return (
    <div className={commonContainerClasses}>
      <div className={innerContainerStyles}>
        <button onClick={handleCloseCart} className={buttonStyles}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Your basket is empty</h2>
        <div className={borderClasses}></div>
        <div className={subtotalClasses}>
          <p className="text-sm dark:text-zinc-300">Subtotal (0 items)</p>
          <p className="text-lg font-semibold dark:text-white">$0.00</p>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Includes all items and discounts</p>
        <button className={checkoutButtonClasses}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Checkout Securely
        </button>
        <button className={continueShoppingButtonClasses}>
          Continue shopping
        </button>
      </div>   
    </div>
  );
};

const CartItem = ({ id, imageSrc, productName, price, quantity, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="flex justify-between border-2 p-4 items-center">
      <img src={imageSrc} alt={productName} className="w-[130px] h-auto object-cover rounded" />
      <div className="flex flex-col flex-grow ml-4">
        <span className="text-zinc-700 dark:text-zinc-300">{productName}</span>
        <span className="text-zinc-900 dark:text-zinc-100 font-bold">${price.toFixed(2)}</span>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <button onClick={() => onUpdateQuantity(id, quantity - 1)} disabled={quantity === 1} className={buttonClasses}><RemoveCircleOutline/></button>
            <span className="px-4">{quantity}</span>
            <button onClick={() => onUpdateQuantity(id, quantity + 1)} className={buttonClasses}>            <AddCircleOutline />
</button>
          </div>
          <button className="ml-2 text-zinc-500 dark:text-zinc-400" onClick={() => onRemoveItem(id)}><DeleteIcon /></button>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart = ({ handleCloseCart }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems.cartItems.cart);
  const cartItems = cart?.lines || [];
  const jwt = localStorage.getItem("jwt");

  // Uncomment when integrating with Redux
  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, [dispatch, jwt]);

  // const handleUpdateQuantity = (lineId, quantity) => {
  //   updateCartQtyNEW({ lineId, quantity }, toast).then(() => {
  //     dispatch(getCartItems());
  //   });
  // };

  // const handleRemoveItem = (lineId) => {
  //   dispatch(RemoveCartItemNew(lineId));
  // };

  // Dummy data for now
  const dummyCartItems = [SingleProduct, { ...SingleProduct, id: 2 }];

  const subtotal = dummyCartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className={commonContainerClasses}>
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <span className="text-zinc-700 dark:text-zinc-300">
            {/* {dummyCartItems.length} Items in Cart */}
            You're $30 away to get FREE standard shipping

            </span>
        <button onClick={handleCloseCart} className="text-zinc-500 dark:text-zinc-400">✕</button>
      </div>
      <ProgressBar />
      <div className="overflow-y-auto h-52">
        {dummyCartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            imageSrc={item.image}
            productName={item.name}
            price={item.price}
            quantity={item.quantity}
            onUpdateQuantity={() => {}}
            onRemoveItem={() => {}}
          />
        ))}
      </div>
      <div className={subtotalClasses}>
        <p className="text-sm dark:text-zinc-300">Subtotal ({dummyCartItems.length} items)</p>
        <p className="text-lg font-semibold dark:text-white">${subtotal}</p>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Includes all items and discounts</p>
    <Link to="/checkout">  <button className={checkoutButtonClasses}>
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        Checkout Securely
      </button>
      </Link>
      <Link to="/cart">
      <button className={continueShoppingButtonClasses}>
        Continue shopping
      </button>
      </Link>
    </div>
  );
};

export default ShoppingCart;
