import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../Redux/Auth/Action';
import { Toaster, toast } from 'react-hot-toast';
import { RxCube } from 'react-icons/rx';
import { SlBasket } from 'react-icons/sl';
import { MdOutlineEmail } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { BsArrowLeft } from "react-icons/bs";

// Shared Tailwind CSS classes
const buttonClasses = 'bg-black text-white py-2 px-4 rounded-full';
const iconClasses = 'w-6 h-6 mr-3 mt-1';
const textColorClasses = 'text-zinc-700';
const smallTextClasses = 'text-xs text-zinc-600';
const containerClasses = 'bg-zinc-200 p-6 rounded-lg w-full';
const centerClasses = 'text-center';
const listClasses = 'space-y-4';
const listItemClasses = 'flex items-start';
const fontBoldClasses = 'font-semibold';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                await dispatch(login({ email, password }, navigate, toast));
                navigate('/');
            } catch (error) {
                console.error(error);
                toast.error('Failed to login. Please try again.');
            }
        }
    };

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const handlePasswordVisibilityToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex items-center justify-start mb-2 gap-[40%]">
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
            <div className="flex items-stretch justify-center m-auto gap-4 p-6">
                <div className="flex-1">
                    <LoginForm
                        handleSubmit={handleSubmit}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        handlePasswordVisibilityToggle={handlePasswordVisibilityToggle}
                        errors={errors}
                    />
                </div>
                <div className="flex-1">
                    <SignUpComponent />
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Login;

const inputClass = 'mt-1 block w-full p-2 border border-zinc-300 rounded-md';
const buttonClass = 'text-sm leading-5';
const linkClass = 'text-sm text-zinc-600 hover:underline';
const primaryButtonClass = 'w-full py-2 bg-zinc-300 text-zinc-700 rounded-md font-semibold';
const secondaryButtonClass = 'w-full py-2 bg-purple-600 text-white rounded-md font-semibold';
const hrClass = 'flex-grow border-t border-zinc-300';
const orTextClass = 'mx-2 text-sm text-zinc-600';

const LoginForm = ({
    handleSubmit,
    setEmail,
    setPassword,
    showPassword,
    handlePasswordVisibilityToggle,
    errors,
}) => {
    return (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg h-full">
            <h1 className="text-2xl font-bold mb-6">Welcome back!</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email*
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className={inputClass}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password*
                    </label>
                    <div className="relative mt-1">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Password"
                            className={inputClass}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center {buttonClass}"
                            onClick={handlePasswordVisibilityToggle}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                    <a href="#" className={linkClass}>
                        Reset password?
                    </a>
                </div>
                <div>
                    <button type="submit"className="w-full py-2 bg-zinc-500 text-white rounded-md text-lg">
                        Log in with Target
                    </button>
                </div>
                <p className="text-sm text-zinc-600 mt-4">
                    By logging in with Target or OnePass you agree to Target's{' '}
                    <a href="#" className="underline">
                        Condition of Use
                    </a>{' '}
                    and may receive personalised communication and advertising from Target. Target
                    will handle your personal information in accordance with its{' '}
                    <a href="#" className="underline">
                        Privacy Policy
                    </a>
                    .
                </p>
                <div className="flex items-center my-4">
                    <hr className={hrClass} />
                    <span className={orTextClass}>OR</span>
                    <hr className={hrClass} />
                </div>
                <div>
                    <button type="button" className={secondaryButtonClass}>
                        Continue with OnePass
                    </button>
                </div>
            </form>
        </div>
    );
};

const SignUpComponent = () => {
    return (
        <div className={`${containerClasses} h-full`}>
            <div className={centerClasses}>
                <p className={`${fontBoldClasses} text-lg`}>Don't have an account?</p>
                <Link to="/sign-up">
                    <button className={`${buttonClasses} mt-2`}>Create Account</button>
                </Link>
            </div>
            <div>
                <p className={fontBoldClasses}>Enjoy access to:</p>
                <ul className={listClasses}>
                    <FeatureItem
                        icon={<FaRegHeart className={iconClasses} />}
                        title="$10 off online!^"
                        description="Get $10 off your next $50+ online shop when you opt into marketing."
                    />
                    <FeatureItem
                        icon={<RxCube className={iconClasses} />}
                        title="Detailed Order Tracking"
                        description="Get updates on the progress of your order and see all your past purchases."
                    />
                    <FeatureItem
                        icon={<SlBasket className={iconClasses} />}
                        title="Faster Checkout"
                        description="We'll remember and pre-fill your details every time you shop online."
                    />
                    <FeatureItem
                        icon={<MdOutlineEmail className={iconClasses} />}
                        title="Latest Deals and Products"
                        description="Never miss a promotion, the latest products or exclusive offers when you opt into marketing."
                    />
                </ul>
                <p className={`${smallTextClasses} mt-6`}>
                    ^Offer available to new marketing opt-ins only. E-Voucher promo code sent via
                    your Welcome Email. Code is single-use only and not redeemable for cash. Cannot
                    be used with any other promo code. Excludes Clearance.
                </p>
            </div>
        </div>
    );
};

const FeatureItem = ({ icon, title, description }) => (
    <li className={
        `${listItemClasses}`}>
        <div>{icon}</div>
        <div>
            <p className={fontBoldClasses}>{title}</p>
            <p className={`${fontBoldClasses} ${textColorClasses}`}>{description}</p>
        </div>
    </li>
);

// export default Login;
