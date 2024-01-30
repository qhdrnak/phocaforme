// 로그인 페이지 컴포넌트
import React from "react";
import logo from "../../assets/images/logo.PNG";
import icon from "../..//assets/images/icon.PNG";
import kakao from "../../assets/images/kakao.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("로그인");
  };
  return (
    <div>
      <div id="login-container">
        <img id="icon-container" src={icon} />
        <h2>안녕하세요 포포입니다.</h2>
        <div id="text-container">
          계정과 비밀번호 입력없이
          <br />
          카카오톡으로 로그인 해보세요.
        </div>
        <img id="kakao-button" src={kakao} onClick={() => handleLogin()} />
      </div>
    </div>
  );
};

export default LoginPage;
