import React from "react";
import { checkExist, register } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmitFormLogin = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    // check exist
    const checkEmailExist = await checkExist("email", email);
    if (checkEmailExist.length > 0) {
      alert("Email already exist");
      return;
    } else {
      const records = { name, email, password, token: generateToken() };

      // call api register
      const response = await register(records);

      if (response) {
        navigate("/login");
      } else {
        alert("Register failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmitFormLogin}>
      <h2>Register</h2>
      <div>
        <input type="name" placeholder="Enter name" />
      </div>
      <div>
        <input type="email" placeholder="Enter email" />
      </div>
      <div>
        <input type="password" placeholder="Enter password" />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
