import { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
const Movie = ({ id, name, director, photoLink }) => {
  const [file, setFile] = useState();
  // const [language, setLanguage] = useState("en");
  const [seeComment, setSeeComment] = useState(false);
  const [comments, setComments] = useState([
    { CommentText: "Das war unangenehm.", MovieID: 1, UserName: "shakiba" },
  ]);
  const [postResponse, setPostResponse] = useState("");
  const axios = require("axios");

  //   useEffect(() => {
  //   async function getMovies() {
  //     if (setComments === true) {
  //       let response = await axios.get("https://shakibaam.pythonanywhere.com");
  //       let movies = response.data;
  //       setMovies(movies);
  //       setIsLoading(false);
  //       console.log(movies);
  //     }
  //   }

  //   getMovies();
  // });

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = `https://shakibaam.pythonanywhere.com/${id}`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    console.log(file.name);
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // axios.post(url, formData, config).then((response) => {
    //   console.log(response.data);
    //   setPostResponse(response.data)
    // });
    // alert(postResponse);
  }

  async function handleChangeLanguage(event) {
    console.log(event.target.value);
    // setSeeComment(true);
    const url = `https://shakibaam.pythonanywhere.com/${id}/?lang=${event.target.value}`;
    let response = await axios.get("https://shakibaam.pythonanywhere.com");
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
      <label for="langs">Show comment in :</label>
      <select name="langs" id="langs" onChange={handleChangeLanguage}>
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="es">Espanish</option>
        <option value="it">italian</option>
      </select>
      <br />
      {/* <input type="submit" value="Submit"></input> */}

      {/* <button onClick={test}>Show Comments</button> */}
      {comments.length !== 0 &&
        comments.map((comment) => (
          <div>
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
