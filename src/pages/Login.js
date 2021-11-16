import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Sign = ({ setUser }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        console.log(response.data);
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);

      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <form className="signupform" onSubmit={handleSubmit}>
        <h1>Se connecter</h1>
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          value={email}
          placeholder="Email"
          className="signupbutton"
        ></input>

        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          placeholder="Password"
          className="signupbutton"
        ></input>

        <input
          className="submitbutton"
          type="submit"
          value={"Se connecter"}
        ></input>
        <Link
          style={{
            textDecoration: "none",
            color: "grey",
            fontSize: "12px",
          }}
          to="/signup"
        >
          <p>Pas encore de compte ? Inscris-toi !</p>
        </Link>
        {error ? <p style={{ color: "red" }}>{error}</p> : <> </>}
      </form>
    </div>
  );
};

export default Sign;
//"token":"2kag515rlEhJHbHbd7RvVqKEzOH9dD2lMhQCcAA2fprsmsRPLXMdp7dPwzAdACgF"
