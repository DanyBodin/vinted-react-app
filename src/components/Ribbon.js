import { Link } from "react-router-dom";
import homebanner_wide from "../images/banner_wide.jpeg";

const ribbon = () => {
  return (
    <div classname="container">
      <img className="banner" src={homebanner_wide} alt="homebanner_wide" />
      <div className="sellsquare">
        <h2> Prêts à faire du tri dans vos placards </h2>
        <Link to="/publish">
          <button className="sellbutton">Commencer à vendre</button>
        </Link>
      </div>
    </div>
  );
};

export default ribbon;
