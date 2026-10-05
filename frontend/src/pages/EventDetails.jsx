
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaTag,
    FaArrowLeft
} from "react-icons/fa";

import API from "../services/api";

function EventDetails() {

    // Get event ID from URL
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch event from database
    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {

        try {

            const response = await API.get(`/events/${id}`);

            setEvent(response.data.event);

        } catch (error) {

            console.error(error);

            setError("Unable to load event details.");

        } finally {

            setLoading(false);

        }
    };


    // Loading
    if (loading) {

        return (
            <div className="container py-5">

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p className="text-secondary mt-3">
                        Loading event details...
                    </p>

                </div>

            </div>
        );

    }


    // Error
    if (error) {

        return (
            <div className="container py-5">

                <div className="alert alert-danger text-center">
                    {error}
                </div>

                <div className="text-center">

                    <Link
                        to="/events"
                        className="btn btn-primary"
                    >
                        <FaArrowLeft className="me-2" />
                        Back to Events
                    </Link>

                </div>

            </div>
        );

    }


    // Event not found
    if (!event) {

        return (
            <div className="container py-5">

                <div className="text-center py-5">

                    <h3>
                        Event Not Found
                    </h3>

                    <p className="text-secondary">
                        The event you are looking for does not exist.
                    </p>

                    <Link
                        to="/events"
                        className="btn btn-primary"
                    >
                        <FaArrowLeft className="me-2" />
                        Back to Events
                    </Link>

                </div>

            </div>
        );

    }


    return (

        <div>

            {/* ================= HEADER ================= */}

            <section className="bg-light py-4">

                <div className="container">

                    <Link
                        to="/events"
                        className="text-decoration-none text-primary"
                    >
                        <FaArrowLeft className="me-2" />
                        Back to Events
                    </Link>

                </div>

            </section>


            {/* ================= EVENT DETAILS ================= */}

            <section className="py-5">

                <div className="container">

                    <div className="row g-5">


                        {/* ================= IMAGE ================= */}

                        <div className="col-lg-6">

                            <div className="event-details-image">

                                {event.image ? (

                                    <img
                                        src={`http://localhost:5000/uploads/events/${event.image}`}
                                        alt={event.title}
                                        className="w-100 h-100"
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "16px"
                                        }}
                                    />

                                ) : (

                                    <div
                                        className="event-placeholder"
                                        style={{
                                            minHeight: "450px",
                                            borderRadius: "16px"
                                        }}
                                    >
                                        {event.category || "Event"}
                                    </div>

                                )}

                            </div>

                        </div>


                        {/* ================= DETAILS ================= */}

                        <div className="col-lg-6">

                            {/* Category */}

                            {event.category && (

                                <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">

                                    <FaTag className="me-2" />

                                    {event.category}

                                </span>

                            )}


                            {/* Title */}

                            <h1 className="fw-bold mt-3 mb-4">

                                {event.title}

                            </h1>


                            {/* Description */}

                            <p className="text-secondary lead">

                                {event.description ||
                                    "No description available for this event."
                                }

                            </p>


                            <hr className="my-4" />


                            {/* Event Information */}

                            <div className="mb-4">


                                {/* Date */}

                                <div className="d-flex align-items-center mb-3">

                                    <div className="category-icon me-3">

                                        <FaCalendarAlt />

                                    </div>

                                    <div>

                                        <small className="text-secondary">
                                            Date
                                        </small>

                                        <div className="fw-semibold">

                                            {new Date(
                                                event.event_date
                                            ).toLocaleDateString(
                                                "en-US",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                }
                                            )}

                                        </div>

                                    </div>

                                </div>


                                {/* Time */}

                                <div className="d-flex align-items-center mb-3">

                                    <div className="category-icon me-3">

                                        <FaClock />

                                    </div>

                                    <div>

                                        <small className="text-secondary">
                                            Time
                                        </small>

                                        <div className="fw-semibold">

                                            {event.event_time}

                                        </div>

                                    </div>

                                </div>


                                {/* Location */}

                                <div className="d-flex align-items-center mb-3">

                                    <div className="category-icon me-3">

                                        <FaMapMarkerAlt />

                                    </div>

                                    <div>

                                        <small className="text-secondary">
                                            Location
                                        </small>

                                        <div className="fw-semibold">

                                            {event.location}

                                        </div>

                                    </div>

                                </div>


                                {/* Category */}

                                <div className="d-flex align-items-center mb-3">

                                    <div className="category-icon me-3">

                                        <FaTag />

                                    </div>

                                    <div>

                                        <small className="text-secondary">
                                            Category
                                        </small>

                                        <div className="fw-semibold">

                                            {event.category ||
                                                "General"
                                            }

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Price + Book Now */}

                            <div className="bg-light rounded-4 p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <small className="text-secondary">
                                            Ticket Price
                                        </small>

                                        <h3 className="fw-bold text-primary mb-0">

                                            Rs.{" "}

                                            {Number(
                                                event.price
                                            ).toLocaleString()}

                                        </h3>

                                    </div>


                                    <Link
                                        to={`/events/${event.id}/book`}
                                        className="btn btn-primary btn-lg px-4"
                                    >
                                        Book Now
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default EventDetails;

