import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    FaPlus,
    FaMinus,
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaArrowLeft,
    FaCheckCircle
} from "react-icons/fa";

import API from "../services/api";

function Booking() {

    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ================= GET EVENT =================

    useEffect(() => {
        fetchEvent();
    }, [id]);


    const fetchEvent = async () => {

        try {

            const response = await API.get(`/events/${id}`);

            setEvent(response.data.event);

        } catch (error) {

            console.error(error);

            setError("Unable to load event.");

        } finally {

            setLoading(false);

        }

    };


    // ================= QUANTITY =================

    const increaseQuantity = () => {

        setQuantity(
            (previousQuantity) => previousQuantity + 1
        );

    };


    const decreaseQuantity = () => {

        setQuantity((previousQuantity) => {

            if (previousQuantity <= 1) {
                return 1;
            }

            return previousQuantity - 1;

        });

    };


    // ================= TOTAL PRICE =================

    const totalPrice = event
        ? Number(event.price) * quantity
        : 0;


    // ================= BOOK EVENT =================

    const handleBooking = async () => {

        // Check whether user is logged in
        const token = localStorage.getItem("token");

        if (!token) {

            setError(
                "Please login before booking."
            );

            return;
        }


        setBookingLoading(true);
        setError("");
        setSuccess("");


        try {

            // Send booking to backend
            const response = await API.post("/bookings", {

                event_id: event.id,

                quantity: quantity

            });


            if (response.data.success) {

                setSuccess(
                    "Booking confirmed successfully!"
                );

            } else {

                setError(
                    response.data.message ||
                    "Booking failed."
                );

            }

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Booking failed. Please try again."
            );

        } finally {

            setBookingLoading(false);

        }

    };


    // ================= LOADING =================

    if (loading) {

        return (

            <div className="container py-5">

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p className="text-secondary mt-3">
                        Loading booking details...
                    </p>

                </div>

            </div>

        );

    }


    // ================= EVENT NOT FOUND =================

    if (!event) {

        return (

            <div className="container py-5">

                <div className="text-center py-5">

                    <h3>
                        Event Not Found
                    </h3>

                    <p className="text-secondary">
                        {error || "The event does not exist."}
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
                        to={`/events/${event.id}`}
                        className="text-primary text-decoration-none"
                    >

                        <FaArrowLeft className="me-2" />

                        Back to Event

                    </Link>

                </div>

            </section>


            {/* ================= BOOKING SECTION ================= */}

            <section className="py-5">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-lg-10">

                            <div className="row g-5">


                                {/* ================= EVENT INFORMATION ================= */}

                                <div className="col-lg-6">

                                    <h2 className="fw-bold mb-4">
                                        Book Your Event
                                    </h2>


                                    {/* Event Image */}

                                    <div
                                        className="event-image mb-4"
                                        style={{
                                            height: "350px",
                                            borderRadius: "16px",
                                            overflow: "hidden"
                                        }}
                                    >

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

                                            <div className="event-placeholder h-100">

                                                {event.category || "Event"}

                                            </div>

                                        )}

                                    </div>


                                    {/* Event Title */}

                                    <h3 className="fw-bold">
                                        {event.title}
                                    </h3>


                                    {/* Date */}

                                    <p className="text-secondary mb-2">

                                        <FaCalendarAlt className="me-2" />

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

                                    </p>


                                    {/* Time */}

                                    <p className="text-secondary mb-2">

                                        <FaClock className="me-2" />

                                        {event.event_time}

                                    </p>


                                    {/* Location */}

                                    <p className="text-secondary">

                                        <FaMapMarkerAlt className="me-2" />

                                        {event.location}

                                    </p>

                                </div>


                                {/* ================= BOOKING CARD ================= */}

                                <div className="col-lg-6">

                                    <div className="card border-0 shadow-sm rounded-4">

                                        <div className="card-body p-4 p-lg-5">

                                            <h4 className="fw-bold mb-4">
                                                Booking Details
                                            </h4>


                                            {/* Ticket Price */}

                                            <div className="d-flex justify-content-between mb-4">

                                                <span className="text-secondary">
                                                    Ticket Price
                                                </span>

                                                <span className="fw-bold">

                                                    Rs.{" "}

                                                    {Number(
                                                        event.price
                                                    ).toLocaleString()}

                                                </span>

                                            </div>


                                            {/* Quantity */}

                                            <label className="form-label fw-semibold">

                                                Number of Tickets

                                            </label>


                                            <div className="d-flex align-items-center mb-4">

                                                {/* Minus */}

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    onClick={
                                                        decreaseQuantity
                                                    }
                                                >

                                                    <FaMinus />

                                                </button>


                                                {/* Quantity */}

                                                <div
                                                    className="mx-3 border rounded px-4 py-2 fw-bold text-center"
                                                    style={{
                                                        minWidth: "70px"
                                                    }}
                                                >

                                                    {quantity}

                                                </div>


                                                {/* Plus */}

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    onClick={
                                                        increaseQuantity
                                                    }
                                                >

                                                    <FaPlus />

                                                </button>

                                            </div>


                                            <hr />


                                            {/* Total Price */}

                                            <div className="d-flex justify-content-between align-items-center mb-4">

                                                <span className="fw-semibold">
                                                    Total Price
                                                </span>

                                                <h3 className="text-primary fw-bold mb-0">

                                                    Rs.{" "}

                                                    {totalPrice.toLocaleString()}

                                                </h3>

                                            </div>


                                            {/* Error Message */}

                                            {error && (

                                                <div className="alert alert-danger">

                                                    {error}

                                                </div>

                                            )}


                                            {/* Success Message */}

                                            {success && (

                                                <div className="alert alert-success">

                                                    <FaCheckCircle className="me-2" />

                                                    {success}

                                                </div>

                                            )}


                                            {/* Confirm Booking */}

                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg w-100"
                                                onClick={
                                                    handleBooking
                                                }
                                                disabled={
                                                    bookingLoading ||
                                                    !!success
                                                }
                                            >

                                                {bookingLoading ? (

                                                    <>

                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                        ></span>

                                                        Processing...

                                                    </>

                                                ) : (

                                                    <>

                                                        <FaCheckCircle className="me-2" />

                                                        Confirm Booking

                                                    </>

                                                )}

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default Booking;