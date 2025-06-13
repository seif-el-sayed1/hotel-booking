import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export const VerifyEmail = () => {
    const { backendUrl, isLoggedin, getUserData, userData } = useContext(UserContext);
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const otpArray = inputsRef.current.map((input) => input.value);
            const otp = otpArray.join("");
            const { data } = await axios.post(backendUrl + "/api/user/verify-email", { otp });

            if (data.Success) {
                toast.success(data.message, { position: "top-center" });
                getUserData();
                navigate("/");
            } else {
                toast.error(data.message, { position: "top-center" });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
            });
        }
    };

    useEffect(() => {
        if ((userData && userData.isVerified) || !isLoggedin) {
            navigate("/");
        }
    }, [isLoggedin, userData, navigate]);

    return (
        <div
            className="min-h-screen bg-[url('src/assets/signUp.png')] bg-cover bg-center flex items-center justify-center px-4"
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md backdrop-blur-sm bg-white/10 border border-white/30 text-white p-6 md:p-8 rounded-xl shadow-lg"
                aria-label="Verify Email Form"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h2>
                <p className="mb-1 text-sm text-center">Enter the 6-digit code we sent to your email</p>
                <div className="flex justify-around mt-4 mb-6">
                    {[...Array(6)].map((_, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputsRef.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            id={i + 1}
                            name={i + 1}
                            pattern="[0-9]*"
                            maxLength="1"
                            required
                            onChange={(e) => handleInputChange(e, i)}
                            onPaste={handlePaste}
                            className="w-10 h-12 border border-white/50 bg-white/20 text-white text-lg text-center rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                            aria-label={`Digit ${i + 1}`}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full cursor-pointer bg-black hover:bg-gray-900 text-white font-semibold py-2.5 rounded transition active:scale-95"
                >
                    Verify
                </button>
            </form>
        </div>
    );
};
