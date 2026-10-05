
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import API from "../services/api";

function Events() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {

            const response = await API.get("/events");

            setEvents(response.data.events);

        } catch (error) {

            console.error(error);

            setError("Unable to load events.");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            {/* Page Header */}
            <section className="events-header py-5">

                <div className="container">

                    <div className="text-center">

                        <span className="text-primary fw-semibold">
                            DISCOVER
                        </span>

                        <h1 className="fw-bold mt-2">
                            Upcoming Events
                        </h1>

                        <p className="text-secondary">
                            Discover exciting events and experiences.
                        </p>

                    </div>

                </div>

            </section>


            {/* Events */}
            <section className="py-5">

                <div className="container">

                    {/* Loading */}
                    {loading && (
                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                            <p className="text-secondary mt-3">
                                Loading events...
                            </p>

                        </div>
                    )}


                    {/* Error */}
                    {!loading && error && (
                        <div className="alert alert-danger text-center">
                            {error}
                        </div>
                    )}


                    {/* No Events */}
                    {!loading &&
                        !error &&
                        events.length === 0 && (

                            <div className="text-center py-5">

                                <h4>
                                    No events found
                                </h4>

                                <p className="text-secondary">
                                    There are currently no events available.
                                </p>

                            </div>
                        )
                    }


                    {/* Event Cards */}
                    {!loading && !error && events.length > 0 && (

                        <div className="row g-4">

                            {events.map((event) => (

                                <div
                                    className="col-md-6 col-lg-4"
                                    key={event.id}
                                >

                                    <div className="event-card bg-white">

                                        {/* Image */}
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


                                        {/* Content */}
                                        <div className="p-4">

                                            {event.category && (
                                                <span className="badge bg-primary-subtle text-primary mb-2">
                                                    {event.category}
                                                </span>
                                            )}

                                            <h5 className="fw-bold">
                                                {event.title}
                                            </h5>

                                            <p className="text-secondary small mb-2">

                                                <FaCalendarAlt className="me-2" />

                                                {new Date(
                                                    event.event_date
                                                ).toLocaleDateString()}

                                            </p>

                                            <p className="text-secondary small">

                                                <FaMapMarkerAlt className="me-2" />

                                                {event.location}

                                            </p>


                                            <div className="d-flex justify-content-between align-items-center mt-3">

                                                <span className="fw-bold text-primary">

                                                    Rs. {Number(
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

                    )}

                </div>

            </section>

        </div>
    );
}

export default Events;

