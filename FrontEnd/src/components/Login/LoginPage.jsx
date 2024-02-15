// 로그인 페이지 컴포넌트
import React, { useState } from "react";
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

  const [loginPersistChecked, setLoginPersistChecked] = useState(false);

  const toggleLoginPersist = () => {
    setLoginPersistChecked(prevState => !prevState);

    if (!loginPersistChecked) {
      tokenExtension();

    };
  }

  const tokenExtension = () => {
    axios.post(process.env.REACT_APP_API_URL + "auth/login-status",
        { loginStatus: loginPersistChecked },
        { withCredentials: true,}
    ).then(res => {
      console.log('연장성공') 
    }).catch(e => {
     console.log('에러')
    })
  }

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
        <img id="kakao-button" src={kakao} onClick={() => loginHandler()} />
        <input
          type="checkbox"
          checked={loginPersistChecked}
          onChange={toggleLoginPersist}
        />
        <label>로그인유지여부</label>
      </div>
    </div>
  );
};

export default LoginPage;
