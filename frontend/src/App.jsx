import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Booking from "./pages/Booking";


function App() {
    return (
        <BrowserRouter>
                    <Navbar />


            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/events" element={<Events />} />

                <Route path="/events/:id" element={<EventDetails />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
    path="/events/:id/book"
    element={<Booking />}
/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;