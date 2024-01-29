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


      {/* 임시 */}
      <div
        onClick={() => {
          navigate('/write')
        }}
        >
        글쓰기
      </div>

      <div
        onClick={() => {
          navigate('/login')
        }}  
      >
        로그인
      </div>

        {/* 임시 */}

      <div
        onClick={() => {
          navigate("/post");
        }}
      >
        게시판으로 가기
      </div>
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
    </header>
  );
};

export default NavBar;
