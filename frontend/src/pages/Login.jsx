
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await API.post("/users/login", {
                email,
                password
            });


            if (response.data.success) {

                // Save JWT token
                localStorage.setItem(
                    "token",
                    response.data.token
                );


                // Save logged-in user
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );


                // Go to Home page
                navigate("/");

            } else {

                setError(
                    response.data.message ||
                    "Login failed"
                );

            }

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-5">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-4 p-lg-5">

                            <h2 className="fw-bold text-center mb-2">
                                Welcome Back
                            </h2>

                            <p className="text-secondary text-center mb-4">
                                Login to your EventHub account
                            </p>


                            {/* Error */}

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}


                            <form onSubmit={handleLogin}>

                                {/* Email */}

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />

                                </div>


                                {/* Password */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />

                                </div>


                                {/* Login Button */}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}

                                </button>

                            </form>


                            {/* Register */}

                            <p className="text-center text-secondary mt-4 mb-0">

                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="text-primary text-decoration-none fw-semibold"
                                >
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;

