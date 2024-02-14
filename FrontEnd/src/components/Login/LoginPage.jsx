// 로그인 페이지 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { KAKAO_AUTH_URL } from "./OAuth";

import icon from "../..//assets/images/icon.PNG";
import kakao from "../../assets/images/kakao_login.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <div id="login-container">
        <img id="icon-container" src={icon} />
        <h2 id='login-title'>안녕하세요 포카포미입니다 👋</h2>
        <div id="text-container">
          번거로운 가입 절차 없이
          <br />
          카카오톡으로 로그인 해보세요.
        </div>
        <img id="kakao-button" src={kakao} onClick={() => loginHandler()} />
      </div>
    </div>
  );
};

export default LoginPage;
