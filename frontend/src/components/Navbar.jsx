import { Link } from "react-router-dom";
import {
    FaCalendarAlt,
    FaSearch,
    FaUser
} from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">

            <div className="container">

                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-brand fw-bold d-flex align-items-center"
                >
                    <FaCalendarAlt className="text-primary me-2" />
                    EventHub
                </Link>


                {/* Mobile Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                {/* Navigation */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >

                    <ul className="navbar-nav mx-auto">

                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/events"
                                className="nav-link"
                            >
                                Events
                            </Link>
                        </li>

                    </ul>


                    {/* Search Icon */}
                    <div className="d-flex align-items-center me-3">
                        <FaSearch className="text-secondary" />
                    </div>


                    {/* Login */}
                    <Link
                        to="/login"
                        className="btn btn-outline-primary me-2"
                    >
                        <FaUser className="me-1" />
                        Login
                    </Link>


                    {/* Register */}
                    <Link
                        to="/register"
                        className="btn btn-primary"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;