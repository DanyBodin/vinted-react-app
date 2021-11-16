import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Publish({ token }) {
  const [title, setTitle] = useState("");
  const [adescription, setAdescription] = useState("");
  const [abrand, setAbrand] = useState("");
  const [asize, setAsize] = useState("");
  const [acolor, setAcolor] = useState("");
  const [aplace, setAplace] = useState("");
  const [astate, setAstate] = useState("");
  const [aprice, setAprice] = useState("");
  const [preview, setPreview] = useState("");

  const [file, setFile] = useState();
  const [data, setData] = useState();

  const navigate = useNavigate();

  /*
  const token =
    "2kag515rlEhJHbHbd7RvVqKEzOH9dD2lMhQCcAA2fprsmsRPLXMdp7dPwzAdACgF";
*/
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", adescription);
      formData.append("price", aprice);
      formData.append("condition", astate);
      formData.append("city", aplace);
      formData.append("brand", abrand);
      formData.append("size", asize);
      formData.append("color", acolor);
      formData.append("picture", file);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <form className="publishform" onSubmit={handleSubmit}>
        <section>
          <input
            className="publishbutton"
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Choose a title for your article"
          />
        </section>

        <section>
          <input
            onChange={(event) => {
              setFile(event.target.files[0]);
              setPreview(URL.createObjectURL(event.target.files[0]));
            }}
            type="file"
          />
          <img className="previewpicture" src={preview} alt="preview" />
        </section>

        <section>
          <input
            className="publishbutton"
            onChange={(event) => setAdescription(event.target.value)}
            type="text"
            placeholder="Describe as best as you can your article"
          />
        </section>

        <section>
          <input
            className="publishbutton"
            onChange={(event) => setAbrand(event.target.value)}
            type="text"
            placeholder="Which brand"
          />
          <input
            className="publishbutton"
            onChange={(event) => setAsize(event.target.value)}
            type="text"
            placeholder="What size ?"
          />
          <input
            className="publishbutton"
            onChange={(event) => setAcolor(event.target.value)}
            type="text"
            placeholder="What color(s) ?"
          />
          <input
            className="publishbutton"
            onChange={(event) => setAstate(event.target.value)}
            type="text"
            placeholder="State ?"
          />
          <input
            className="publishbutton"
            onChange={(event) => setAplace(event.target.value)}
            type="text"
            placeholder="Where are you?"
          />
        </section>

        <section>
          <input
            className="publishbutton"
            onChange={(event) => setAprice(event.target.value)}
            type="text"
            placeholder="Let us know the Price"
          />
          <div className="signupletter">
            <input type="checkbox" className="checkbox"></input>
            <span>Je suis intéressé.e par les échanges</span>
          </div>
        </section>

        <input
          className="addbutton"
          type="submit"
          value="Ajoute ton article !"
        />
      </form>
      {data && <img src={data.product_image.secure_url} alt="" />}
    </div>
  );
}

export default Publish;
