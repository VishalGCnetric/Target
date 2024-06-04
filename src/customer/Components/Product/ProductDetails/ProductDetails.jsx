import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveProductsById } from "../../../../action";
import { Toaster } from "react-hot-toast";
import { AddItemToCartNew, getCartItems } from "../../../../action/cart";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Navbar from "../../Navbar/Navbar";
import { Skeleton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const HeaderTopSection=lazy(()=>import('../../Navbar/HeaderTop'));
const NavigationSection=lazy(()=>import('../../Navbar/Navigation'));
const NavbarSection = lazy(() => import('../../Navbar/Navbar'));
const FooterSection = lazy(() => import('../../footer/Footer'));

const PaymentOptionsSection = lazy(() => import('../../footer/PaymentOption'));
// Shared Tailwind CSS classes
const buttonClasses = 'w-8 h-8 bg-{{color}}-200 border border-zinc-300 rounded-full';
const borderButtonClasses = 'border border-zinc-300 rounded-md p-2';

const SingleProduct = {
  id: 1,
  images: ['https://assets.target.com.au/transform/f3c5fa5e-06c7-4a9c-a80f-d97240bb9ef8/355_69298899_1-282E3B?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', 'https://assets.target.com.au/transform/f3a9d799-f341-4c69-8628-233745da5e34/355_69298899_2-2808C2?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', 'https://assets.target.com.au/transform/7616bde9-97e2-47e0-a5d7-2c07b03d9f5d/355_69298899_3-2808C3?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', 'https://assets.target.com.au/transform/5845c912-41db-4667-afdb-c749de956536/355_69298899_4-2808C4?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp'],
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

const recentlyViewedItems = [
  { id: 1, image: 'https://assets.target.com.au/transform/1711ec72-1d75-402e-8ed8-dffd743032b2/355_69284557_1-282F9D?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' },
  { id: 2, image: 'https://assets.target.com.au/transform/f3c5fa5e-06c7-4a9c-a80f-d97240bb9ef8/355_69298899_1-282E3B?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' },
  { id: 3, image: 'https://assets.target.com.au/transform/1711ec72-1d75-402e-8ed8-dffd743032b2/355_69284557_1-282F9D?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' },
  { id: 4, image: 'https://assets.target.com.au/transform/f3c5fa5e-06c7-4a9c-a80f-d97240bb9ef8/355_69298899_1-282E3B?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' },
  { id: 5, image: 'https://assets.target.com.au/transform/1711ec72-1d75-402e-8ed8-dffd743032b2/355_69284557_1-282F9D?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' }
];

const sharedClasses = {
  flex: 'flex',
  itemsCenter: 'items-center',
  textSm: 'text-sm',
  textXs: 'text-xs',
  textWhite: 'text-white',
  textBlue500: 'text-blue-500',
  textZinc300: 'text-zinc-300',
  textZinc500: 'text-zinc-500',
  textZinc700: 'text-zinc-700',
  textZinc900: 'text-zinc-900',
  fontBold: 'font-bold',
  fontSemibold: 'font-semibold',
  bgGreen500: 'bg-green-500',
  bgYellow500: 'bg-yellow-500',
  rounded: 'rounded',
  roundedFull: 'rounded-full',
  border: 'border',
  shadowMd: 'shadow-md',
  darkBgZinc800: 'dark:bg-zinc-800',
  darkBorderZinc700: 'dark:border-zinc-700',
  mxAuto: 'mx-auto',
  my2: 'my-2',
  p4: 'p-4',
  w10: 'w-10',
  h10: 'h-10',
  wFull: 'w-full',
  py2: 'py-2',
  w1_2: 'w-1/2',
  spaceX1: 'space-x-1',
  spaceX2: 'space-x-2',
  justifyBetween: 'justify-between',
  justifyCenter: 'justify-center',
  select: 'select',
  option: 'option',
  mt2: 'mt-2',
  pt2: 'pt-2',
  borderT: 'border-t',
  ml2: 'ml-2',
  px2: 'px-2',
  py1: 'py-1',
  darkBgZinc700: 'dark:bg-zinc-700',
  darkBorderZinc600: 'dark:border-zinc-600',
  darkTextWhite: 'dark:text-white',
  darkTextZinc300: 'dark:text-zinc-300',
  darkTextZinc100: 'dark:text-zinc-100',
  textYellow500: 'text-yellow-500',
};




const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [qty, setQty] = useState(1);
  const [btn, setBtn] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cartItems.cartItems);
  const { ProductId } = useParams();

  // useEffect(() => {
  //   receiveProductsById(ProductId).then((res) => {
  //     if (res) {
  //       setProductDetails(res.product);
  //     } else {
  //       setProductDetails(SingleProduct);
  //     }
  //   });
  // }, [ProductId]);
useEffect(() => {
  setProductDetails(SingleProduct);
},[])
  useEffect(() => {
    dispatch(getCartItems());
  }, [btn, dispatch]);

  const handleAddToCart = () => {
    const data = {
      productVariantId: productDetails.id,
      quantity: qty,
    };
    AddItemToCartNew(data).then(() => {
      setBtn(!btn);
    });
  };

  const decrementQty = () => {
    setQty((prev) => Math.max(prev - 1, 1));
  };

  const incrementQty = () => {
    setQty((prev) => prev + 1);
  };

  // if (!productDetails) {
  //   return <div>Loading...</div>;
  // }

  // const { name, price, colors, sizes } = productDetails;

  return (<div>
  <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={118} />}>
<NavigationSection/>
{/* <NavbarSection/> */}
</Suspense>
    < div className="w-full mx-auto p-4">
      
      <Toaster />
      <div className="flex flex-col md:flex-row my-4">
        <div className="md:w-2/3">
          <div className="grid grid-cols-2 gap-2">
            {productDetails?.images?.map((image, index) => (
              <div className="overflow-hidden">
              <img key={index} src={image} alt={`Product Image ${index + 1}`} className="w-full transition-transform duration-500 transform hover:scale-150" />
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/3 md:pl-4">
          {/* <h1 className="text-2xl font-semibold mb-2">{productDetails?.name}</h1>
          <p className="text-xl font-bold mb-2">${productDetails?.price.toFixed(2)}</p>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select a colour:</label>
            <div className="flex space-x-2">
              {productDetails?.colors?.map(color => (
                <button key={color} className={buttonClasses.replace('{{color}}', color)}></button>
              ))}
            </div>
          </div> */}
          {/* <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select a size</label>
            <select className="block w-full bg-white border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {productDetails?.sizes.map(size => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div> */}
         
          {/* <button onClick={handleAddToCart} className="w-full bg-zinc-800 text-white py-2 rounded-md mb-4">
            Add To Basket
          </button> */}
          <div className={`w-full ${sharedClasses.mxAuto} ${sharedClasses.p4} ${sharedClasses.border} ${sharedClasses.rounded} ${sharedClasses.shadowMd} ${sharedClasses.darkBgZinc800} ${sharedClasses.darkBorderZinc700}`}>
      <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.my2}`}>
        {productDetails?.isNew && (
          <span className={`${sharedClasses.bgGreen500} ${sharedClasses.textWhite} ${sharedClasses.textXs} ${sharedClasses.fontBold} ${sharedClasses.px2} ${sharedClasses.py1} ${sharedClasses.roundedFull}`}>NEW</span>
        )}
        {productDetails?.isPopular && (
          <span className={`${sharedClasses.ml2} ${sharedClasses.bgYellow500} ${sharedClasses.textWhite} ${sharedClasses.textXs} ${sharedClasses.fontBold} ${sharedClasses.px2} ${sharedClasses.py1} ${sharedClasses.roundedFull}`}>POPULAR</span>
        )}
      </div>
      <h2 className={`text-lg ${sharedClasses.fontSemibold} ${sharedClasses.darkTextWhite}`}>{productDetails?.name}</h2>
      <p className={`text-xl ${sharedClasses.fontBold} ${sharedClasses.textZinc900} ${sharedClasses.darkTextZinc100}`}>${productDetails?.price}</p>
    
      <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.my2}`}>
        <div className={`${sharedClasses.flex} ${sharedClasses.spaceX1}`}>
          {[...Array(4)]?.map((_, index) => (
            <span key={index} className={sharedClasses.textYellow500}>★</span>
          ))}
          {[...Array(5 - 1)]?.map((_, index) => (
            <span key={index} className={sharedClasses.textZinc300}>★</span>
          ))}
        </div>
        <a href="#" className={`${sharedClasses.ml2} ${sharedClasses.textSm} ${sharedClasses.textBlue500}`}>({productDetails?.reviewsCount} reviews)</a>
      </div>
      <p className={`${sharedClasses.textZinc700} ${sharedClasses.darkTextZinc300}`}>Select a colour: <span className={sharedClasses.fontSemibold}>{productDetails?.color}</span></p>
      <div className={`${sharedClasses.flex} ${sharedClasses.spaceX2} ${sharedClasses.my2}`}>
        {productDetails?.colors.map((colorOption, index) => (
          <img key={index} src={"https://assets.target.com.au/transform/1711ec72-1d75-402e-8ed8-dffd743032b2/355_69284557_1-282F9D?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp"} alt={`Color option ${index + 1}`} className={`${sharedClasses.w10} ${sharedClasses.h10} ${sharedClasses.roundedFull} ${sharedClasses.border}`} />
        ))}
      </div>
      <div className={`${sharedClasses.flex} ${sharedClasses.justifyBetween} ${sharedClasses.itemsCenter} ${sharedClasses.my2}`}>
        <select className={`${sharedClasses.w1_2} ${sharedClasses.py2} ${sharedClasses.border} ${sharedClasses.rounded} ${sharedClasses.darkBgZinc700} ${sharedClasses.darkBorderZinc600} ${sharedClasses.darkTextWhite}`}>
          {productDetails?.sizeOptions.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>
        <a href="#" className={`${sharedClasses.textSm} ${sharedClasses.textBlue500}`}>Size Guide</a>
      </div>
      <div className="flex items-center mb-4">
      <label className="block text-sm font-medium mb-2"> Quantity:</label>
            <button onClick={decrementQty} className="px-2 py-1 ml-6"><RemoveCircleOutline/></button>
            <span className="px-4">{qty}</span>
            <button onClick={incrementQty} className="px-2 py-1"><AddCircleOutline/></button>
          </div>
      <div className={`${sharedClasses.flex} justify-center ${sharedClasses.my2}`}>
      <button className={`w-2/3 ${sharedClasses.py2} ${sharedClasses.my2} bg-gray-500 ${sharedClasses.textWhite} ${sharedClasses.roundedFull}`}>Add To Basket</button>
        <button className={`${sharedClasses.w10} ${sharedClasses.h10}  ${sharedClasses.roundedFull} ${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.justifyCenter} ${sharedClasses.darkBorderZinc600}`}>
          <img aria-hidden="true" alt="heart" src="/link.svg" className="w-20 h-20 mt-6 ml-6" />
        </button>
      </div>
      <div className={`${sharedClasses.borderT} ${sharedClasses.pt2} ${sharedClasses.mt2}`}>
        <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter}`}>
          <img src="/onepass.png" alt="OnePass logo" className={`${sharedClasses.w20} ${sharedClasses.h10}`} />
          <div className={`${sharedClasses.ml2} `}>
            <p className={`${sharedClasses.textSm} ${sharedClasses.fontSemibold} ${sharedClasses.darkTextWhite}`}>OnePass</p>
            <p className={`${sharedClasses.textXs} ${sharedClasses.textZinc500} ${sharedClasses.darkTextZinc400}`}>Get free delivery and more! <a href="#" className={`text-purple-500`}>Log in</a> or <a href="#" className={`text-purple-500`}>Learn more</a></p>
          </div>
        </div>
      </div>

          <ProductInfo/>
    </div>
        </div>
      </div>
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Recently Viewed Items</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {recentlyViewedItems.map(item => (
            <div key={item.id} className="w-48">
              <img src={item.image} alt={`Recently Viewed Item ${item.id}`} className="w-full mb-2" />
              <p className="text-sm">{item.name}</p>
              <p className="text-sm font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
      <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={118} />}>
<FooterSection/>
<PaymentOptionsSection/>
</Suspense>
    </div>
  );
};

export default ProductDetails;

// Shared Tailwind CSS classes
const sharedClass = "text-zinc-900 dark:text-zinc-100";

// Accordion component
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="cursor-pointer p-4 dark:bg-zinc-700 rounded flex justify-between items-center"
        onClick={toggleAccordion}
      >
        <h2 className="font-bold">{title}</h2>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isOpen && <div className="p-4 bg-gray-100 dark:bg-zinc-800 rounded">{children}</div>}
    </div>
  );
};

const ProductInfo = () => {
  const productData = {
    deliveryOptions: {
      description: "Please make a selection above to see stock availability.",
      notice: "NOTICE: Click & Collect and delivery timeframes and fees are subject to availability and apply to this individual product only.",
      linkText: "Find out more",
      itemCode: "69284557"
    },
    features: [
      "Baby Coverall",
      "Organic cotton",
      "Regular fit",
      "All over print",
      "Round neck",
      "Long raglan sleeves for full range of movement",
      "Fold over mitts",
      "Two-way zip front",
      "Covered feet"
    ],
    details: "Give your little one the comfort and style with our Cosy Baby's Zip Access Organic Cotton Coverall. Crafted from soft organic cotton, its regular fit and all-over print make your baby stand out. The round neck and long raglan sleeves provide freedom of movement, while the fold-over mittens and two-way zip front add practicality. Keep your baby snug with the covered feet feature. Give your baby the best with our premium coverall.",
    materials: "Cotton/Elastane",
    careInstructions: "Machine washable",
    extraInfo: "Our organic cotton range is made with certified organic cotton. Grown without the use of harmful chemicals and in a way that builds healthy soil and ecosystems."
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
      <div className="mb-4">
        <h2 className="font-bold">Product Features</h2>
        <ul className="list-disc list-inside">
          {productData.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <Accordion title="Delivery and in-store options">
        <p>{productData.deliveryOptions.description}</p>
        <p className={`text-sm ${sharedClass}`}>
          {productData.deliveryOptions.notice} <a href="#" className="text-blue-500">{productData.deliveryOptions.linkText}</a>
        </p>
        <p className="mt-2">Item code: {productData.deliveryOptions.itemCode}</p>
      </Accordion>
      <Accordion title="Product Details">
        <p>{productData.details}</p>
      </Accordion>
      <Accordion title="Materials and Composition">
        <p>{productData.materials}</p>
      </Accordion>
      <Accordion title="Care Instructions">
        <p>{productData.careInstructions}</p>
      </Accordion>
      <Accordion title="Extra Info">
        <p><strong>ORGANIC COTTON</strong><br />{productData.extraInfo}</p>
      </Accordion>
      <div className="text-center text-[13px] border-t border-zinc-300 dark:border-zinc-700 pt-4 gap-2">
        <a href="#" >FAQs</a> | 
        <a href="#">Payments & Delivery</a> | 
        <a href="#" >Returns & Refund</a>
      </div>
    </div>
  );
};

