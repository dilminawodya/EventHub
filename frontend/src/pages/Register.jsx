
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    // ================= HANDLE INPUT =================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    };


    // ================= REGISTER =================

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Check values
        console.log("FORM DATA:", formData);


        
        


        // Check password length
        if (formData.password.length < 6) {

            setError(
                "Password must be at least 6 characters."
            );

            return;
        }


        // Check password match
        if (
            formData.password !==
            formData.confirm_password
        ) {

            setError("Passwords do not match.");

            return;
        }


        setLoading(true);


        try {

            const response = await API.post(
                "/users/register",
                {
                    first_name: formData.first_name.trim(),
                    last_name: formData.last_name.trim(),
                    email: formData.email.trim(),
                    password: formData.password
                }
            );


            console.log(
                "REGISTER RESPONSE:",
                response.data
            );


            if (response.data.success) {

                setSuccess(
                    "Registration successful! Redirecting to login..."
                );


                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirm_password: ""
                });


                setTimeout(() => {

                    navigate("/login");

                }, 1500);

            } else {

                setError(
                    response.data.message ||
                    "Registration failed."
                );

            }

        } catch (error) {

            console.error(
                "REGISTER ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-7 col-lg-6">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-4 p-lg-5">


                            {/* TITLE */}

                            <h2 className="fw-bold text-center mb-2">
                                Create Account
                            </h2>

                            <p className="text-secondary text-center mb-4">
                                Join EventHub and discover amazing events
                            </p>


                            {/* ERROR */}

                            {error && (

                                <div className="alert alert-danger">
                                    {error}
                                </div>

                            )}


                            {/* SUCCESS */}

                            {success && (

                                <div className="alert alert-success">
                                    {success}
                                </div>

                            )}


                            <form onSubmit={handleRegister}>


                                {/* FIRST + LAST NAME */}

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="first_name"
                                            className="form-control"
                                            placeholder="Enter first name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="last_name"
                                            className="form-control"
                                            placeholder="Enter last name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>


                                {/* EMAIL */}

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* PASSWORD */}

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <small className="text-secondary">
                                        Password must be at least 6 characters.
                                    </small>

                                </div>


                                {/* CONFIRM PASSWORD */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirm_password"
                                        className="form-control"
                                        placeholder="Confirm password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* REGISTER BUTTON */}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {loading ? (

                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Creating Account...
                                        </>

                                    ) : (

                                        "Create Account"

                                    )}

                                </button>

                            </form>


                            {/* LOGIN */}

                            <p className="text-center text-secondary mt-4 mb-0">

                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="text-primary text-decoration-none fw-semibold"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Register;

