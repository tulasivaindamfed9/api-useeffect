import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  // creating useStates for both email and password

  const [email, updatedEmail] = useState("");
  const [password, updatedPassword] = useState("");

  function getEmail(receivedEmail) {
    console.log("email", receivedEmail.target.value);
    updatedEmail(receivedEmail.target.value); //updates with recently entered email on UI
  }

  function getPassword(receivedPassword) {
    console.log("password", receivedPassword.target.value);
    updatedPassword(receivedPassword.target.value); //updates with recently entered password on UI
  }

  // async await function follows here
  //this tells us if we are loading
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  // creating a function to "register" through post method api calling
  async function registerfun() {
    setLoading(true);
    try {
      const newuser = await axios.post(
        " https://api.escuelajs.co/api/v1/users/",
        {
          name: "name",
          email: email,
          password: password,
          avatar: "https://picsum.photos/800",
        }
      );
      console.log(newuser.data);
      setData(newuser.data);

      // storing name,email,password of new user in session storage
      sessionStorage.setItem("email", newuser.data.email);
      sessionStorage.setItem("password", newuser.data.password);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  }

  // creating a function to login through post method api calling
  // It generates access and refresh tokens
  async function loginfun() {
    setLoading(true);
    try {
      const user = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(user.data.access_token);
      const accessToken = user.data.access_token;

      // checking user is registered or not by using authorization
      const validUser = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(validUser);
      const authorization = validUser.config.headers.Authorization;
      sessionStorage.setItem("Authorization", authorization);

      // if session storage access token matches with login user access token , navigate to home page
      if (sessionStorage.getItem("Authorization")) {
        navigate("/Homepage");
      } else {
        alert("Not a valid user. Register to login");
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="loginClass">
        <form class="formclass">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{ marginRight: "20px" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={getEmail}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="exampleInputPassword1"
              style={{ marginRight: "78px" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={getPassword}
            />
          </div>

          {/* creating button for login */}
          <div className="button-group">
            <button type="button" className="btn" onClick={loginfun}>
              Login
            </button>
            <button
              type="button"
              className="btn btn-register"
              onClick={registerfun}
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <h1>Email: {email}</h1>
      <h2>Password: {password}</h2>
    </>
  );
}

export default Login;
