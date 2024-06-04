import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartItems, RemoveCartItemNew, updateCartQtyNEW } from "../../../action/cart";
import ShippingComponent from "./ShippingComponent";
import CartFooter from "./CartFooter";
import HomeCarousel from "../Carousel/HomeCarousel";
import PaymentOptions from "../footer/PaymentOption";
import { BsArrowLeft } from "react-icons/bs";

const SingleProduct = {
  id: 1,
  images: [
    'https://assets.target.com.au/transform/f3c5fa5e-06c7-4a9c-a80f-d97240bb9ef8/355_69298899_1-282E3B?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp',
    'https://assets.target.com.au/transform/f3a9d799-f341-4c69-8628-233745da5e34/355_69298899_2-2808C2?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp',
    'https://assets.target.com.au/transform/7616bde9-97e2-47e0-a5d7-2c07b03d9f5d/355_69298899_3-2808C3?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp',
    'https://assets.target.com.au/transform/5845c912-41db-4667-afdb-c749de956536/355_69298899_4-2808C4?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp'
  ],
  price: 9.95,
  rating: 4,
  reviewsCount: 10,
  color: "Butterfly",
  name: 'Baby Organic Cotton Print Zip Coverall - Leaves',
  colors: ['green', 'zinc', 'yellow', 'pink'],
  sizes: ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months', '12-18 Months'],
  itemCode: '89024587',
  sizeOptions: ["Select a size", "0-3 months", "3-6 months", "6-9 months", "9-12 months"],
  isNew: true,
  isPopular: true,
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cartItems } = useSelector((store) => store);
  const [CartData, setCartData] = useState([SingleProduct]);

  const handleRemoveItemFromCart = (e, id) => {
    e.preventDefault();
    RemoveCartItemNew(id).then((res) => {
      dispatch(getCartItems());
    });
  };

  const handleUpdateCartPlus = (e, lineId, qty) => {
    e.preventDefault();
    updateCartQtyNEW(lineId, qty + 1).then((res) => {
      dispatch(getCartItems());
    });
  };

  const handleUpdateCartMinus = (e, lineId, qty) => {
    e.preventDefault();
    if (qty !== 1) {
      updateCartQtyNEW(lineId, qty - 1).then((res) => {
        dispatch(getCartItems());
      });
    } else {
      handleRemoveItemFromCart(e, lineId);
    }
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [CartData]);

  return (
    <div className="">
      <div className="flex items-center justify-start mb-4 gap-[40%]">
        <div className="flex items-center space-x-2">
          {/* <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg> */}
          <BsArrowLeft/>
          <span className="font-bold">Back</span>
        </div>
        <div className="relative">
          <img src="https://www.target.com.au/medias/auth0/target.svg" alt="Target" />
        </div>
      </div>
      {CartData.length > 0 && (
        <div className=" lg:grid grid-cols-5 lg:px-16 relative">
          <div className="  lg:col-span-3 lg:px-5 bg-white">
            <div className="space-y-3">
              <CartItem
                item={SingleProduct}
                showButton={true}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                handleUpdateCartPlus={handleUpdateCartPlus}
                handleUpdateCartMinus={handleUpdateCartMinus}
              />
            </div>
          </div>
          <div className="px-5 lg:col-span-2 sticky top-0  mt-5 lg:mt-0">
            <ShippingComponent />
          </div>
        </div>
      )}
      <HomeCarousel/>
      <CartFooter/>
    </div>
  );
};

export default Cart;
