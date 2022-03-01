import { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
const Movie = ({ id, name, director, photoLink }) => {
  const [file, setFile] = useState();
  // const [language, setLanguage] = useState("en");
  const [seeComment, setSeeComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [postResponse, setPostResponse] = useState("");
  const axios = require("axios");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = ` https://shakibaam.pythonanywhere.com/${id}`;
    const formData = new FormData();
    formData.append("file", file);

    console.log(file.name);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        //handle success
        console.log(response);
        let result = response.data;
        alert(result);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  //   axios.post(url, formData).then((response) => {
  //     console.log(response.data);
  //     // setPostResponse(response.data);
  //     // console.log(postResponse);
  //   });
  //   // alert(postResponse);
  // }

  async function handleChangeLanguage(event) {
    console.log(event.target.value);
    const url = `https://shakibaam.pythonanywhere.com/${id}?lang=${event.target.value}`;
    let response = await axios.get(url);
    let comments = response.data["translated_comments"];
    setComments(comments);
  }

  return (
    <div>
      <img src={photoLink} alt="" />
      <p>Name : {name}</p>
      <p>Director : {director}</p>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload Comment</button>
      </form>
      <label htmlFor="langs">Show comment in :</label>
      <select name="langs" id="langs" onChange={handleChangeLanguage}>
        <option>Languages</option>
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="es">Espanish</option>
        <option value="it">italian</option>
      </select>
      <br />

      {comments.length !== 0 &&
        comments.map((comment) => (
          <div key={comment["CommentID"]}>
            <p>
              {" "}
              {comment["UserName"]} : {comment["CommentText"]}
            </p>
          </div>
        ))}

      <hr />
    </div>
  );
};

export default Movie;
