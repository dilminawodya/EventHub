import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaSearch,
    FaMusic,
    FaLaptopCode,
    FaFutbol,
    FaPalette,
    FaArrowRight
} from "react-icons/fa";

import API from "../services/api";

function Home() {

    const categories = [
        {
            name: "Music",
            icon: <FaMusic />
        },
        {
            name: "Technology",
            icon: <FaLaptopCode />
        },
        {
            name: "Sports",
            icon: <FaFutbol />
        },
        {
            name: "Art & Design",
            icon: <FaPalette />
        }
    ];

    const [events, setEvents] = useState([]);

    useEffect(() => {

        const fetchEvents = async () => {

            try {

                const response = await API.get("/events");

                setEvents(
                    response.data.events.slice(0, 3)
                );

            } catch (error) {

                console.error("Error fetching events:", error);

            }

        };

        fetchEvents();

    }, []);

    return (

        <div>

            {/* =========================
                HERO SECTION
            ========================== */}

            <section
                className="hero-section"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(0, 0, 0, 0.55),
                            rgba(0, 0, 0, 0.55)
                        ),
                        url("/hero-event.jpg")
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >

                <div className="container">

                    <div className="row align-items-center min-vh-75">

                        <div className="col-lg-7">

                            <span className="badge bg-primary px-3 py-2 mb-3">

                                Discover Amazing Events

                            </span>


                            <h1 className="display-4 fw-bold mb-4 text-white">

                                Find Your Next{" "}

                                <span className="text-primary">

                                    Amazing Experience

                                </span>

                            </h1>


                            <p className="lead text-white mb-4">

                                Discover exciting events, connect with
                                people and create unforgettable memories
                                with EventHub.

                            </p>


                            {/* Search Box */}

                            <div className="search-box bg-white shadow p-2 rounded-3">

                                <div className="row g-2">

                                    <div className="col-md-9">

                                        <div className="input-group">

                                            <span className="input-group-text bg-white border-0">

                                                <FaSearch />

                                            </span>


                                            <input
                                                type="text"
                                                className="form-control border-0"
                                                placeholder="Search for events..."
                                            />

                                        </div>

                                    </div>


                                    <div className="col-md-3">

                                        <Link
                                            to="/events"
                                            className="btn btn-primary w-100 h-100"
                                        >

                                            Search

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                CATEGORIES
            ========================== */}

            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <span className="text-primary fw-semibold">

                            EXPLORE

                        </span>


                        <h2 className="fw-bold mt-2">

                            Browse By Category

                        </h2>


                        <p className="text-secondary">

                            Find events based on your interests

                        </p>

                    </div>


                    <div className="row g-4">

                        {categories.map((category, index) => (

                            <div
                                className="col-6 col-lg-3"
                                key={index}
                            >

                                <div className="category-card text-center p-4">

                                    <div className="category-icon mx-auto mb-3">

                                        {category.icon}

                                    </div>


                                    <h5 className="fw-semibold">

                                        {category.name}

                                    </h5>


                                    <p className="text-secondary small mb-0">

                                        Explore events

                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* =========================
                FEATURED EVENTS
            ========================== */}

            <section className="py-5 bg-light">

                <div className="container">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <span className="text-primary fw-semibold">

                                FEATURED

                            </span>


                            <h2 className="fw-bold mt-2 mb-0">

                                Upcoming Events

                            </h2>

                        </div>


                        <Link
                            to="/events"
                            className="text-primary text-decoration-none fw-semibold"
                        >

                            View All

                            <FaArrowRight className="ms-2" />

                        </Link>

                    </div>


                    <div className="row g-4">

                        {events.map((event) => (

                            <div
                                className="col-md-6 col-lg-4"
                                key={event.id}
                            >

                                <div className="event-card bg-white">

                                    {/* Event Image */}

                                    <div className="event-image">

                                        {event.image ? (

                                            <img
                                                src={`http://localhost:5000/uploads/events/${event.image}`}
                                                alt={event.title}
                                                className="w-100 h-100"
                                                style={{
                                                    objectFit: "cover"
                                                }}
                                            />

                                        ) : (

                                            <div className="event-placeholder">

                                                {event.category || "Event"}

                                            </div>

                                        )}

                                    </div>


                                    {/* Event Information */}

                                    <div className="p-4">

                                        <span className="badge bg-primary-subtle text-primary mb-2">

                                            {event.category}

                                        </span>


                                        <h5 className="fw-bold">

                                            {event.title}

                                        </h5>


                                        <p className="text-secondary small mb-2">

                                            📅{" "}

                                            {event.event_date
                                                ? new Date(
                                                    event.event_date
                                                ).toLocaleDateString()
                                                : "Date not available"
                                            }

                                        </p>


                                        <p className="text-secondary small">

                                            📍 {event.location}

                                        </p>


                                        <div className="d-flex justify-content-between align-items-center mt-3">

                                            <span className="fw-bold text-primary">

                                                Rs.{" "}

                                                {Number(
                                                    event.price
                                                ).toLocaleString()}

                                            </span>


                                            <Link
                                                to={`/events/${event.id}`}
                                                className="btn btn-outline-primary btn-sm"
                                            >

                                                View Details

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* =========================
                CTA SECTION
            ========================== */}

            <section className="py-5">

                <div className="container">

                    <div className="cta-section text-center p-5 rounded-4">

                        <h2 className="fw-bold">

                            Ready to Discover Your Next Event?

                        </h2>


                        <p className="text-secondary mt-3">

                            Explore exciting events and book your tickets today.

                        </p>


                        <Link
                            to="/events"
                            className="btn btn-primary px-4 mt-2"
                        >

                            Explore Events

                        </Link>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default Home;