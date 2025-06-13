import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
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
    const inputsRef = useRef([]);

    axios.defaults.withCredentials = true;

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
            const { data } = await axios.post(backendUrl + "/api/user/send-reset-otp", { email });
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
            const { data } = await axios.post(backendUrl + "/api/user/reset-password", {
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
        <div className="min-h-screen bg-[url('/src/assets/signUp.png')] bg-cover bg-center flex items-center justify-center px-4">
            {!isEmail && (
                <form
                    onSubmit={submitEmail}
                    className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-6 md:p-8 max-w-md w-full shadow-lg text-white"
                >
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                        Enter Your Email
                    </label>
                    <div className="flex bg-black border border-gray-500/30 rounded overflow-hidden">
                        <div className="flex items-center px-3">
                            <svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16.5 4.5c0-.825-.675-1.5-1.5-1.5H3c-.825 0-1.5.675-1.5 1.5v9c0 .825.675 1.5 1.5 1.5h12c.825 0 1.5-.675 1.5-1.5v-9zM1.5 4.5L9 9.75 16.5 4.5" />
                            </svg>
                        </div>
                        <input
                            id="email"
                            name="email"
                            autoComplete="off"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter Your Email"
                            className="bg-transparent text-white w-full px-3 py-2 outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 px-5 text-white font-semibold hover:bg-blue-700 transition"
                            aria-label="Submit Email"
                        >
                            <svg width="12" height="12" fill="#fff" viewBox="0 0 12 12">
                                <path d="M9.131 6.75H0v-1.5h9.131l-4.2-4.2L6 0l6 6-6 6-1.069-1.05z" />
                            </svg>
                        </button>
                    </div>
                </form>
            )}

            {isEmail && !isOtp && (
                <form
                    onSubmit={submitOtp}
                    className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-6 md:p-8 max-w-md w-full shadow-lg text-white mt-4"
                >
                    <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
                    <p className="text-sm mb-4 text-center">
                        We've sent a 6-digit code to <strong>{email}</strong>
                    </p>
                    <div className="flex justify-between gap-2 mb-6">
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                id={i + 1}
                                name={i + 1}
                                ref={(el) => (inputsRef.current[i] = el)}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength="1"
                                required
                                onChange={(e) => handleInputChange(e, i)}
                                onPaste={handlePaste}
                                className="w-10 h-12 rounded text-center text-lg text-white bg-black/40 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                aria-label={`Digit ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-black text-white font-semibold rounded hover:bg-gray-900 transition active:scale-95"
                    >
                        Submit OTP
                    </button>
                </form>
            )}

            {isEmail && isOtp && (
                <form
                    onSubmit={resetPassword}
                    className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-6 md:p-8 max-w-md w-full shadow-lg text-white mt-4"
                >
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium">
                        New Password
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Enter Your New Password"
                        className="w-full px-3 py-2 bg-black/40 border border-white/30 text-white rounded outline-none mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition active:scale-95"
                    >
                        Reset Password 
                    </button>
                </form>
            )}
        </div>
    );
};
