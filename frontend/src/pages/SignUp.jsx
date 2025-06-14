import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import upload from "../assets/upload.png";

export const SignUp = () => {
    const navigate = useNavigate();
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const { backendUrl, setIsLoggedin, getUserData } = useContext(UserContext);

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

                const { data } = await axios.post(backendUrl + "/api/user/register", formData);
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
                const { data } = await axios.post(backendUrl + "/api/user/login", { email, password });
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
        <div className="min-h-screen bg-no-repeat bg-[url('src/assets/signUp.png')] bg-cover bg-center flex items-center justify-center px-4">
            <div className="w-full max-w-sm backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                    {state === "signUp" ? "Create Account" : "Welcome Back"}
                </h2>
                <form className="flex flex-col" onSubmit={handleSubmit} encType="multipart/form-data">
                    {state === "signUp" && (
                        <>
                            <div
                                className={`flex flex-col items-center justify-center mb-4 border-2 rounded-2xl p-2 transition
                                ${isDragging ? "border-yellow-400 bg-white/20" : "border-white/30"}`}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    const file = e.dataTransfer.files[0];
                                    if (file && file.type.startsWith("image/")) {
                                        setImage(file);
                                    } else {
                                        toast.error("Please drop a valid image file", { position: "top-center" });
                                    }
                                }}
                            >
                                <label htmlFor="image" className="cursor-pointer" aria-label="Upload Profile Image">
                                    <img
                                        loading="lazy"
                                        className="w-20 h-20 rounded-full object-cover"
                                        src={image ? URL.createObjectURL(image) : upload}
                                        alt="Upload Profile"
                                    />
                                </label>
                                <input
                                    onChange={(e) => setImage(e.target.files[0])}
                                    type="file"
                                    id="image"
                                    name="image"
                                    hidden
                                    accept="image/*"
                                    required
                                />
                            </div>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                id="name"
                                name="name"
                                className="bg-white/30  placeholder:text-white/80 border border-white/50 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                type="text"
                                value={name}
                                required
                            />
                        </>
                    )}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className="bg-white/30  placeholder:text-white/80 border border-white/50 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        type="email"
                        value={email}
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="bg-white/30  placeholder:text-white/80 border border-white/50 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        required
                    />
                    <div className="flex items-center justify-between mb-4 text-sm">
                        <Link to="/resetPassword" className="text-white/80 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white font-semibold py-2 rounded-md cursor-pointer hover:bg-gray-900 transition"
                    >
                        {state === "signUp" ? "Sign Up" : "Login"}
                    </button>
                    <div className="text-center text-white mt-4 text-sm">
                        {state === "signUp" ? (
                            <p>
                                Already have an account?{" "}
                                <span
                                    onClick={() => setState("login")}
                                    className="text-yellow-300 cursor-pointer hover:underline"
                                >
                                    Login
                                </span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{" "}
                                <span
                                    onClick={() => setState("signUp")}
                                    className="text-yellow-300 cursor-pointer hover:underline"
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
};
