import React from "react";
import { login } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import {
  getCookie,
  setCookie,
  eraseCookie,
  deleteAllCookies,
} from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/loginAction";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitFormLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // call api login
    const response = await login(email, password);

    // save data into cookie
    if (response.length > 0) {
      setCookie("token", response[0].token, 1);
      setCookie("name", response[0].name, 1);
      setCookie("userId", response[0].id, 1);
      navigate("/");

      // dispatch action checkLogin
      dispatch(checkLogin(true));
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmitFormLogin}>
      <h2>Login</h2>
      <div>
        <input type="email" placeholder="Enter email" />
      </div>
      <div>
        <input type="password" placeholder="Enter password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
