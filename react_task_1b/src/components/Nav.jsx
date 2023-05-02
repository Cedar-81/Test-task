import React from "react";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";
import { AiOutlineUser } from "react-icons/ai";

function Nav() {
  const { dispatch, state } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };
  return (
    <nav className="w-full h-[9vh]">
      <ul className="flex justify-between items-center h-full">
        <li className="text-3xl font-semibold">APP</li>
        <li className="">
          <button onClick={logout} className="button-active flex gap-2">
            <AiOutlineUser className="h-5 w-5" />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
