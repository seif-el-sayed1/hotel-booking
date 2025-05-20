import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isEmail, setIsEmail] = useState(false);
    const [isOtp, setIsOtp] = useState(false);

    const { backendUrl } = useContext(UserContext);

    axios.defaults.withCredentials = true;

    const inputsRef = useRef([]);

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        } else if (!value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").trim();
        const chars = paste.slice(0, 6).split("");
        chars.forEach((char, i) => {
            if (inputsRef.current[i]) {
                inputsRef.current[i].value = char;
            }
        });
        const nextEmpty = chars.length < 6 ? chars.length : 5;
        inputsRef.current[nextEmpty]?.focus();
    };

    const submitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + "user/send-reset-otp", { email });
            if (data.Success) {
                toast.success(data.message, { position: "top-center" });
                setIsEmail(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const submitOtp = (e) => {
        e.preventDefault();
        const otpArray = inputsRef.current.map((input) => input.value);
        const fullOtp = otpArray.join("");
        setOtp(fullOtp);
        setIsOtp(true);
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + "user/reset-password", {
                email,
                otp,
                newPassword,
            });
            if (data.Success) {
                toast.success(data.message);
                navigate("/signUp");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div
            className="bg-no-repeat bg-cover bg-center h-screen flex items-center justify-center"
            style={{ backgroundImage: "url('/src/assets/signUp.png')" }}
        >
            {!isEmail && (
                <form onSubmit={submitEmail} >
                    <div className="flex items-center text-sm w-90 bg-black h-12 border pl-3 pr-0.5 rounded border-gray-500/30 max-w-md">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.5 4.5c0-.825-.675-1.5-1.5-1.5H3c-.825 0-1.5.675-1.5 1.5m15 0v9c0 .825-.675 1.5-1.5 1.5H3c-.825 0-1.5-.675-1.5-1.5v-9m15 0L9 9.75 1.5 4.5"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <input
                            className="px-2 w-full h-full outline-none text-white bg-transparent"
                            type="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 px-6 py-3.5 mr-px rounded-sm active:scale-95 transition"
                        >
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.131 6.75H0v-1.5h9.131l-4.2-4.2L6 0l6 6-6 6-1.069-1.05z"
                                    fill="#fff"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            )}

            {!isOtp && isEmail && (
                <form
                    onSubmit={submitOtp}
                    className="backdrop-blur-sm bg-white/10 border border-white/20 text-black max-w-96 mx-4 md:py-10 md:px-6 px-4 py-8 text-left text-sm rounded-lg transition-all shadow-[0px_0px_10px_0px] shadow-black/10"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-center text-black">
                        Two-factor Authentication
                    </h2>
                    <p>Please enter the authentication code</p>
                    <p className="text-black mb-4">
                        The authentication code has been sent to your email:
                    </p>
                    <div className="flex items-center justify-between mb-6">
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputsRef.current[i] = el)}
                                type="text"
                                maxLength="1"
                                required
                                onChange={(e) => handleInputChange(e, i)}
                                onPaste={handlePaste}
                                className="otp-input w-10 h-10 border text-black border-gray-300 outline-none rounded text-center text-lg transition duration-300"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full my-1 cursor-pointer bg-black py-2.5 rounded text-white active:scale-95 transition"
                    >
                        Enter OTP
                    </button>
                </form>
            )}

            {isEmail && isOtp && (
                <form onSubmit={resetPassword}>
                    <div className="w-full max-w-md h-12 gap-3 flex flex-col items-center">
                        <input
                            className="outline-none bg-black px-3 py-2 border border-gray-400 rounded w-70 text-white"
                            type="password"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="py-2 text-nowrap w-fit cursor-pointer px-2 rounded  text-sm text-white bg-blue-600 font-medium"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
