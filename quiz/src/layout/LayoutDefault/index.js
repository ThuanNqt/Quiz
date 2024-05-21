import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";
import "./LayoutDefault.scss";
import { Link, NavLink, Outlet } from "react-router-dom";

function LayoutDefautl() {
  // get token when login success
  const token = getCookie("token");
  /* when isLogin change will re-render layout */
  const isLogin = useSelector((state) => state.login);

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <Link to="/">Quiz</Link>
          </div>
          <div className="menu">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {token ? (
                <>
                  <li>
                    <NavLink to="/topic">Topic</NavLink>
                  </li>
                  <li>
                    <NavLink to="/answers">Answers</NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="layout-default__account">
            {token ? (
              <>
                <NavLink to={"/logout"}>Logout</NavLink>
              </>
            ) : (
              <>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/register"}>Register</NavLink>
              </>
            )}
          </div>
        </header>
        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">
          Copyright @ 2024 by Nguyễn Quang Thuận
        </footer>
      </div>
    </>
  );
}
export default LayoutDefautl;
