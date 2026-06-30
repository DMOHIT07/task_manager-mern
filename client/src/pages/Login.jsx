import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await API.post("/auth/login", form);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
                    Task Manager
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Login to continue
                </p>

                <form onSubmit={handleSubmit}>

                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 mb-4"
                        required
                    />

                    <label className="block mb-2 font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 mb-6"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-6">
                    Don't have an account?
                </p>

                <button
                    onClick={() => navigate("/register")}
                    className="text-blue-600 font-semibold mt-2 w-full"
                >
                    Create Account
                </button>

            </div>

        </div>
    );
}

export default Login;