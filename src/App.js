import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import CheckoutForm from "./components/CheckoutForm";

function App() {
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
  const [token, setToken] = useState(null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 0.003 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} token={token} />}
        />
        <Route
          path="/publish"
          element={<Publish setUser={setUser} token={token} />}
        />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

/*
<Elements stripe={stripePromise}>
<CheckoutForm />
</Elements>
*/
