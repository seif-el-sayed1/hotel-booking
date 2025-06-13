import { useNavigate } from "react-router-dom";
import { useContext, useEffect} from "react"
import { UserContext } from "../context/UserContext"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRef } from "react";

export const VerifyEmail = () => {    
    const {backendUrl, isLoggedin, getUserData, userData} = useContext(UserContext)
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
        const paste = e.clipboardData.getData('text').trim();
        const chars = paste.slice(0, 6).split('');
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
            const otpArray = inputsRef.current.map(input => input.value);
            const otp = otpArray.join("");
            const { data } = await axios.post(backendUrl + "/api/user/verify-email", { otp });

            if (data.Success) {
                toast.success(data.message, { position: "top-center" });
                getUserData
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
        if (userData && userData.isVerified || !isLoggedin) {
            navigate("/");
        }
    },[isLoggedin, userData, navigate])

    return (
        <div
            className="bg-no-repeat bg-[url('/src/assets/signUp.png')] bg-cover bg-center h-screen flex items-center justify-center"
        >
            <form
                onSubmit={handleSubmit}
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
                            ref={el => inputsRef.current[i] = el}
                            type="text"
                            maxLength="1"
                            required
                            onChange={(e) => handleInputChange(e, i)}
                            onPaste={handlePaste}
                            className="otp-input w-10 h-10 border text-white border-gray-300 outline-none rounded text-center text-lg transition duration-300"
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full my-1 cursor-pointer bg-black py-2.5 rounded text-white active:scale-95 transition"
                >
                    Verify
                </button>
            </form>
        </div>
    );
};
