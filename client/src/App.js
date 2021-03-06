import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import axios from "axios";
import "./App.css";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

import { loginState } from "./recoil/recoil";
import { userInfo } from "./recoil/recoil";
import { token } from "./recoil/recoil";
import { withCookies, Cookies, useCookies } from "react-cookie";
// import Cookies from "universal-cookie";
import Mainpage from "./pages/Mainpage";
import Home from "./pages/Home/Home";
import DetailPage from "./pages/DetailPage/DetailPage-index";
import Header from "./components/Header";
import Loading from "./components/Loading/Loading";
import MyPage from "./pages/MyPage/MyPage";
import MyVisited from "./components/MyVisited/MyVisited";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [info, setInfo] = useRecoilState(userInfo);
  const accessToken = useRecoilValue(token);
  // const cookies = new Cookies();
  const history = useHistory();

  const isAuthenticated = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/info`, {
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("홈으로 가잔");
        setInfo(res.data.data.userInfo);
        setIsLogin(true);

        window.location.reload();
        // history.push("/home");
      });
  };

  console.log(cookies);
  //쿠키안에 jwt 있는지 보고 로긴상태결정
  useEffect(() => {
    if (cookies.jwt) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    console.log(cookies);
  }, []);

  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  return (
    <>
      <Header handleResponseSuccess={handleResponseSuccess} />
      <Switch>
        <Route exact path="/">
          <Mainpage />
          {/* <Loading /> */}
        </Route>
        <Route exact path="/home">
          <Home info={info} />
        </Route>
        <Route exact path="/mypage">
          <BrowserRouter>
            <MyPage />
          </BrowserRouter>
          {/* <MyVisited /> */}
        </Route>
        <Route exact path="/mapage/likelist">
          {/* <Likelists /> */}
        </Route>
        <Route exact path="/mapage/my-comment">
          {/* <Commentlists /> */}
        </Route>

        {/* <Commentlist />
          <Visted /> */}

        <Route exact path="/detailpage/:id" component={DetailPage}></Route>
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </>
  );
};

export default App;
// "/detailpage/:id"
