import { useContext, useState } from "react"
import axios from 'axios';
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify"
import { useNavigate, Link } from "react-router-dom"
import upload from "../assets/upload.png" 

export const SignUp = () => {
    const navigate = useNavigate()

    const [state, setState] = useState('login')
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [role, setRole] = useState("user"); 

    const { backendUrl, setIsLoggedin, getUserData } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        try {
            if (state === "signUp") {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("image", image);
                formData.append("role", role);

                const { data } = await axios.post(backendUrl + "user/register", formData);
                if (data.Success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate("/");
                    setImage(null);
                    toast.success(data.message, { position: "top-center" });
                } else {
                    toast.error(data.message, { position: "top-center" });
                }
            } else {
                const { data } = await axios.post(backendUrl + "user/login", { email, password });

                if (data.Success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate("/");
                    toast.success(data.message, { position: "top-center" });
                } else {
                    toast.error(data.message, { position: "top-center" });
                }
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong", { position: "top-center" });
        }
    };

    return (
        <div className="bg-no-repeat bg-[url('/src/assets/signUp.png')] bg-cover 
                    bg-center flex flex-col items-center justify-center h-screen">
            <div className="w-80 max-w-md backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-black mb-4 text-center">
                    {state === "signUp" ? "Create Account" : "Welcome Back"}
                </h2>
                <form className="flex flex-col" onSubmit={handleSubmit} encType="multipart/form-data">
                    {state === "signUp" && (
                        <>
                            <div className="flex flex-col items-center justify-center mb-4 
                                        border-2 rounded-2xl p-2">
                                <label htmlFor="image">
                                    <img className='cursor-pointer w-20 h-20 rounded-full ' 
                                        src={image ? URL.createObjectURL(image) : upload } alt="UPLOAD" />
                                </label>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                            </div>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="bg-white/20 text-black placeholder:text-white/70 border border-white/30 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                type="text"
                                value={name}
                                required
                            />
                            <div className="flex items-center justify-center gap-6 mb-4 text-white text-lg">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={role === "user"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="accent-yellow-400"
                                    />
                                    <span>User</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="owner"
                                        checked={role === "owner"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="accent-yellow-400"
                                    />
                                    <span>Owner</span>
                                </label>
                            </div>
                        </>
                    )}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="bg-white/20 text-black placeholder:text-white/70 border border-white/30 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        type="email"
                        value={email}
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="bg-white/20 text-black placeholder:text-white/70 border border-white/30 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        type="password"
                        value={password}
                        required
                    />

                    <div className="flex items-center justify-between mb-4 text-sm">
                        <Link to={"/resetPassword"} className="text-black-300 hover:underline">Forgot password?</Link>
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white font-semibold py-2 rounded-md cursor-pointer transition"
                    >
                        {state === "signUp" ? "Sign Up" : "Login"}
                    </button>
                    <div className="text-center text-white mt-2">
                        {state === "signUp" ? (
                            <p>
                                Already have an account?{" "}
                                <span
                                    onClick={() => setState("login")}
                                    className="text-black cursor-pointer hover:underline"
                                >
                                    Login
                                </span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{" "}
                                <span
                                    onClick={() => setState("signUp")}
                                    className="text-black cursor-pointer hover:underline"
                                >
                                    Sign Up
                                </span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
