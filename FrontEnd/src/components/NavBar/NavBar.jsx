import logo from "../../assets/images/logo.PNG";
import ProfileImage from "./ProfileImage";
import Bell from "./Bell";

import { useNavigate } from "react-router-dom";

const NavBar = ({ children }) => {
  const navigate = useNavigate();

  return (
    <header id="nav-bar">
      <img
        id="logo"
        onClick={() => {
          navigate("/main");
        }}
        src={logo}
      ></img>
      <div id="nav-menus">
        <div
          id="bell"
          onClick={() => {
            navigate("/alarm");
          }}
        >
          <Bell />
        </div>
        <ProfileImage />
      </div>

      <div
        onClick={() => {
          navigate("/write");
        }}
      >
        글쓰기~
      </div>
      <div
        onClick={() => {
          navigate("/post");
        }}
      >
        게시판으로 가기
      </div>
    </header>
  );
};

export default NavBar;
