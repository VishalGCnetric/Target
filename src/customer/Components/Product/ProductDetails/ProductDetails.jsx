import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveProductsById } from "../../../../action";
import { Toaster } from "react-hot-toast";
import { AddItemToCartNew, getCartItems } from "../../../../action/cart";
import { Skeleton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { FaSearchPlus } from "react-icons/fa";

import ProductInfo from "./ProductInfo";
import RecentViewProduct from "./RecentViewProduct";

const NavigationSection = lazy(() => import('../../Navbar/Navigation'));
const FooterSection = lazy(() => import('../../footer/Footer'));
const PaymentOptionsSection = lazy(() => import('../../footer/PaymentOption'));

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [qty, setQty] = useState(1);
  const [btn, setBtn] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cartItems.cartItems);
  const { productId } = useParams();
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    receiveProductsById(productId).then((res) => {
      if (res) {
        console.log('Product Data:', res.data.product.masterData.current); // Debug log
        setProductDetails(res.data.product.masterData.current);
      }
    }).catch(err => {
      console.error('Error fetching product:', err);
    });
  }, [productId]);

  useEffect(() => {
    if (productDetails) {
      setVariant(productDetails?.masterVariant);
    }
  }, [productDetails]);

  useEffect(() => {
    dispatch(getCartItems());
  }, [btn, dispatch]);

  const handleAddToCart = () => {
    if (!variant) return;
    const data = {
      productVariantId: variant.id,
      quantity: qty,
    };
    AddItemToCartNew(data).then(() => {
      setBtn(!btn);
    }).catch(err => {
      console.error('Error adding item to cart:', err);
    });
  };

  const decrementQty = () => {
    setQty((prev) => Math.max(prev - 1, 1));
  };

  const incrementQty = () => {
    setQty((prev) => prev + 1);
  };

  const handleMouseEnter = (e) => {
    const img = e.target;
    img.style.transform = 'scale(1.5)';
  };

  const handleMouseLeave = (e) => {
    const img = e.target;
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
  };

  const handleMouseMove = (e) => {
    const img = e.target;
    const { left, top, width, height } = img.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  };

  if (!productDetails) {
    return <Skeleton variant="rectangular" width="100%" height={1180} />;
  }

  return (
    <div>
      <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={118} />}>
        <NavigationSection />
      </Suspense>
      <div className="w-full mx-auto p-4">
        <Toaster />
        <div className="flex flex-col md:flex-row my-4">
          <div className={`md:w-full`}>
            <div className="grid grid-cols-2 gap-2 p-2">
              {variant?.images?.map((image, index) => (
                <div key={index} className={`overflow-hidden ${variant.images.length % 2 !== 0 && index === 0 ? "col-span-2 " : "col-span-1 "}`}>
                  <img 
                    src={image.url} 
                    alt={`Product Image ${index + 1}`} 
                    className="w-full  transition-transform duration-500 border-2 transform" 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    style={{ cursor: `url(https://static.vecteezy.com/system/resources/previews/000/631/501/original/search-icon-symbol-sign-vector.jpg), auto` }} // Placeholder cursor path
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-2/3 md:pl-4">
            <div className="w-full mx-auto p-4 border rounded shadow-md dark:bg-zinc-800 dark:border-zinc-700">
              <div className="flex items-center my-2">
                {true && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
                )}
                {productDetails.isPopular && (
                  <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">POPULAR</span>
                )}
              </div>
              <h2 className="text-lg font-semibold dark:text-white">{productDetails?.name}</h2>
              {/* <p>{productDetails?.description}</p> */}
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">${variant?.price?.value?.centAmount/100 }</p> {/* Assuming price is in cents */}
              <div className="flex items-center my-2">
                <div className="flex space-x-1">
                  {[...Array(4)].map((_, index) => (
                    <span key={index} className="text-yellow-500">★</span>
                  ))}
                  {[...Array(5 - 4)].map((_, index) => (
                    <span key={index} className="text-zinc-300">★</span>
                  ))}
                </div>
                <a href="#" className="ml-2 text-sm text-blue-500">({productDetails.reviewsCount || 4} reviews)</a>
              </div>
              <p className="text-zinc-700 semibold dark:text-zinc-300">Select a colour: <span className="font-semibold">{productDetails.color}</span></p>
              <div className="grid grid-cols-7 gap-1 my-3">
                {[productDetails?.masterVariant , ...productDetails?.variants]?.map((colorOption, index) => (
                  <img key={index} src={colorOption.images[0].url} alt={`Color option ${index + 1}`} className={`w-10 h-10 rounded-full  border object-cover ${variant === colorOption ? "border-2 border-black" : ""}`}
                    onClick={() => setVariant(colorOption)}
                  />
                ))}
              </div>
              <div className="flex items-center mb-4">
                <label className="block text-sm font-medium mb-2"> Quantity:</label>
                <button onClick={decrementQty} className="px-2 py-1 ml-6"><RemoveCircleOutline /></button>
                <span className="px-4">{qty}</span>
                <button onClick={incrementQty} className="px-2 py-1"><AddCircleOutline /></button>
              </div>
              <div className="flex justify-center my-2">
                <button className="w-3/4 py-2 my-2 bg-gray-500 text-white rounded-full" onClick={handleAddToCart}>Add To Basket</button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center dark:border-zinc-600">
                  <img aria-hidden="true" alt="heart" src="/link.svg" className="w-20 h-20 mt-6 ml-6" />
                </button>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center rounded border-1 border border-purple-500 p-2">
                  <img src="/onepass.png" alt="OnePass logo" className="w-30 h-10" />
                  <div className="ml-2
                  ">
                    <p className="text-sm font-semibold dark:text-white">OnePass</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Get free delivery and more! 
                      <br/>
                      <a href="#" className="text-purple-500">Log in</a> or <a href="#" className="text-purple-500">Learn more</a></p>
                  </div>
                </div>
              </div>
              <ProductInfo des={productDetails?.description} />
            </div>
          </div>
        </div>
        <RecentViewProduct />
      </div>
      <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={118} />}>
        <FooterSection />
        <PaymentOptionsSection />
      </Suspense>
    </div>
  );
};

export default ProductDetails;
