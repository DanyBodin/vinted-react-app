import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Ribbon from "../components/Ribbon";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Processing ...</p>
  ) : (
    <div className="imageribbon">
      <Ribbon />
      {data.offers.map((offer, index) => {
        return (
          <Link
            key={offer._id}
            to={`/Offer/${offer._id}`}
            style={{ marginTop: "900px", width: 400 }}
          >
            <h3>{offer.product_name}</h3>
            <img
              src={offer.product_image.secure_url}
              alt={offer.product_name}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
