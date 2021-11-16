import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Header = ({ token, setUser }) => {
  const [title, setTitle] = useState();
  const [sort, setSort] = useState();
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [skip, setSkip] = useState();
  const [limit, setLimit] = useState();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers",
          {
            params: {
              title: title,
              sort: sort,
              priceMin: priceMin,
              priceMax: priceMax,
              skip: skip,
              limit: limit,
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [title, sort, priceMin, priceMax, skip, limit]);

  const navigate = useNavigate();
  return (
    <div className="upperheader">
      {token ? (
        <div>
          <button
            className="logoutbutton"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
          <div className="bottomheader"></div>
        </div>
      ) : (
        <div className="main">
          <input
            className="searchbar"
            type="text"
            value={"What you looking for?"}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
          <Link to="/signup">
            <button className="logbutton">S'inscrire</button>
          </Link>
          <Link to="/login">
            <button className="logbutton">Se connecter</button>
          </Link>
          <Link to="/publish">
            <button className="sellbutton">Vends tes articles</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
