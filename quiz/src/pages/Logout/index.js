import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    deleteAllCookies();
    navigate("/login");
  }, []);
  return <></>;
}
