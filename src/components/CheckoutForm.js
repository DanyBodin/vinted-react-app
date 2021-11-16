import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const element = useElements();

  const userId = "618d35ec230bfb0017c714ae";

  const location = useLocation();
  const { title } = location.state;
  const { amount } = location.state;

  const [valid, setValid] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElements = element.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElements, {
        name: userId,
      });
      console.log(stripeResponse.token.id, title, amount);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          title: title,
          amount: amount,
        }
      );

      console.log(response.data.message);
      if (response.status === 200) {
        setValid("Paiement validé !");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="paymentcontainer">
      <form className="paymentform" onSubmit={handleSubmit}>
        <h3>What's in your basket</h3>
        <div className="subclasses">
          <span style={{ color: "lightgray" }}>Commande</span>
          <span> {amount.toFixed(2)} €</span>
        </div>

        <div className="subclasses">
          <span style={{ color: "lightgray" }}>Frais protection acheteurs</span>
          <span> 0.40 €</span>
        </div>

        <div className="subclasses">
          <span style={{ color: "lightgray" }}>Frais de port</span>
          <span> 0.80 €</span>
        </div>

        <div className="subclasses">
          <span>TOTAL</span>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            {(amount + 0.4 + 0.8).toFixed(2)} €
          </span>
        </div>

        <div className="cardelement">
          <CardElement />
        </div>

        <input className="paymentbutton" type="submit" value="Pay" />
        <p style={{ color: "green" }}>{valid}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
