import React from 'react';
import { Link } from 'react-router-dom';

// Shared Tailwind CSS classes
const containerClass = 'w-full mx-auto p-4 bg-white shadow-md rounded-lg';
const textCenterClass = 'text-center';
const textRedClass = 'text-red-700';
const fontSemiBoldClass = 'font-semibold';
const flexClass = 'flex';
const justifyBetweenClass = 'justify-between';
const textZincClass = 'text-zinc-700';
const textSMClass = 'text-sm';
const textLGClass = 'text-lg';
const fontBoldClass = 'font-bold';
const borderTClass = 'border-t';
const pt4Class = 'pt-4';
const mb4Class = 'mb-4';
const mb2Class = 'mb-2';
const itemsCenterClass = 'items-center';
const textBlueClass = 'text-blue-500';
const floatRightClass = 'float-right';

 export const ProgressBar = () => {
  return (
    <div className="relative w-full h-2 bg-zinc-200 rounded-full mb-4">
      <div
        className="absolute top-0 left-0 h-full bg-red-700 rounded-full"
        style={{ width: '70%' }}
      ></div>
      <div className="absolute -top-2 -right-1 text-white  w-6 h-6 bg-zinc-200 rounded-full border-2 border-white"> <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg></div>
    </div>
  );
};

const OrderSummary = () => {
  return (
    <div className={` ${borderTClass} ${pt4Class} `}>
      <h2 className={`${textSMClass} ${fontSemiBoldClass} ${textZincClass} ${mb2Class}`}>
        ORDER SUMMARY
      </h2>
      <div className={`${flexClass} ${justifyBetweenClass} ${textSMClass} ${mb2Class}`}>
        <span>Sub total (1 item)</span>
        <span className={fontSemiBoldClass}>$30.00</span>
      </div>
      <div className={`${flexClass} ${justifyBetweenClass} ${textSMClass} ${mb2Class}`}>
        <span>Estimated Delivery</span>
        <span className={fontSemiBoldClass}>TBC</span>
      </div>
      <div className={`${flexClass} ${justifyBetweenClass} ${textLGClass} ${fontBoldClass} ${mb2Class}`}>
        <span>Total</span>
        <span>$30.00</span>
      </div>
      <div className={`${textSMClass} ${textZincClass} ${mb4Class}`}>
        <span>Inc. GST</span>
        <span className={floatRightClass}>$2.73</span>
      </div>
      <hr/>

      <div className={`${flexClass} ${itemsCenterClass} my-2 ${justifyBetweenClass} ${mb2Class}`}>
        <div className={` flex ${itemsCenterClass}`}>
          <img src="./zip.png" alt="ZIP" className="w-20 mr-2" />
          <a href="#" className={`${textSMClass} `}>
            Learn more
          </a>
        </div>
        <div className={`${textSMClass} ${textZincClass} text-right`}>
          <div>From $10 a week</div>
        </div>
      </div>
      <hr/>
      <div className={`${flexClass} ${itemsCenterClass} my-2 ${justifyBetweenClass}`}>
        <div className={` flex ${itemsCenterClass}`}>
          <img src="/afterpay.png" alt="afterpay" className=" w-20 mr-2" />
          <a href="#" className={`${textSMClass} `}>
            Learn more
          </a>
        </div>
        <div className={`${textSMClass} ${textZincClass} text-right`}>
          <div>4 X $7.50</div>
        </div>
      </div>
    </div>
  );
};

const buttonClass = 'bg-black text-white py-2 px-6 rounded-full';
const imageClass = 'w-auto h-14';

const PaymentMethod = ({ src, alt }) => {
  return <img src={src} alt={alt} className={imageClass} />;
};

const CheckoutComponent = () => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-10 mb-10">
        <Link to="/checkout" className="text-blue-500">
      <button className={buttonClass}>Continue to checkout</button>
      </Link>
      <div className="text-center">
        <p className="text-sm font-medium">We accept</p>
        <div className="flex justify-center space-x-4 mt-2">
            <img src="https://www.target.com.au/medias/sys_master/root/h16/h8f/h00/h00/28570039058462/target-payment-modes-2024.png
            " alt="VISA" className={imageClass} />
          {/* <PaymentMethod src="/visa.png" alt="VISA" />
          <PaymentMethod src="https://www.target.com.au/medias/sys_master/root/h16/h8f/h00/h00/28570039058462/target-payment-modes-2024.png" alt="Mastercard" />
          <PaymentMethod src="/amex.png" alt="AMEX" />
          <PaymentMethod src="/applepay.png" alt="Apple Pay" />
          <PaymentMethod src="/paypal.png" alt="PayPal" />
          <PaymentMethod src="/afterpay.png" alt="Afterpay" />
          <PaymentMethod src="/zip.png" alt="Zip" /> */}
        </div>
      </div>
    </div>
  );
};

// export default CheckoutComponent;

const ShippingComponent = () => {
  return (<>
    <div className={containerClass}>
      <div
        className={`${textCenterClass} ${mb4Class} ${textSMClass} ${textRedClass} ${fontSemiBoldClass}`}
      >
        You're $30 away to get FREE standard shipping
      </div>
      <ProgressBar />
      <OrderSummary />
    
    </div>
    <CheckoutComponent/>
    </>
  );
};

export default ShippingComponent;
