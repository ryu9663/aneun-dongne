import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";

import { Styled } from "./style";
import { message } from "../../message";

import { token } from "../../recoil/recoil";

const ModalLogin = ({ handleResponseSuccess, ToSignupModal, closeLoginModalHandler }) => {
  const [accessToken, setAccessToken] = useRecoilState(token);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { email, password } = loginInfo;

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = async () => {
    if (email === "") {
      setErrorMessage(message.loginEmail);
      return;
    } else if (password === "") {
      setErrorMessage(message.loginPassword);
      return;
    }
    // `${process.env.REACT_APP_API_URL}/user/login`,
    await axios
      .post(
        "http://localhost:80/user/login",
        {
          email,
          password,
        },
        { "Content-Type": "application/json", withCredentials: true }
      )
      .then((res) => {
        // closeLoginModalHandler();
        console.log("하이");
        setAccessToken(res.data.data.accessToken);
      })
      .then(() => {
        console.log(accessToken);
        handleResponseSuccess();
      })
      .catch(() => {
        setErrorMessage(message.loginError);
      });
  };

  useEffect(() => {});

  return (
    <>
      <Styled.FormContainer>
        <div className="form-title">아는 동네</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-email">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={email} onChange={handleInputValue("email")} />
          </div>
          <div className="form-password">
            <label htmlFor="password">password</label>
            <input id="password" type="password" value={password} onChange={handleInputValue("password")} />
          </div>
          <div className="error-message">{errorMessage}</div>

          <button type="submit" className="login-button" onClick={handleLogin}>
            로그인
          </button>
          <div className="signup-text">아직 회원이 아니신가요?</div>
          <div className="signup-link" onClick={ToSignupModal}>
            회원가입하기
          </div>
        </form>
      </Styled.FormContainer>
    </>
  );
};

export default ModalLogin;