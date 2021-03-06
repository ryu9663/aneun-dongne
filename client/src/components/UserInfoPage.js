import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import dotenv from "dotenv";
import { userInfo, loginState, loginModal } from "../../recoil/recoil";
import hamtori from "../../img/hamtori.png";
import ProfileUpload from "../../components/UploadImage/ProfileUpload";
export const Body = styled.div`
  /* position: relative; */
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  margin-top: 73px;
`;
export const MenuBar = styled.div`
  margin: 0px 50px 0 10px;
  background: white;
  box-shadow: rgb(180 180 180) -1px 1px 8px;
  border-radius: 20px;
  width: 300px;
  height: 100%;
  border-radius: 10px;
  position: absolute;
  top: 0;
  /* padding: 100px; */
  /* z-index: 9; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #8ea1da;
  background-image: linear-gradient(
    to bottom,
    rgba(192, 251, 255, 1) 0,
    rgba(192, 251, 255, 0.5) 60%,
    rgba(255, 255, 255, 0.1) 100%
  );

  > input {
    border: none;
    align-items: center;
  }
  > .menu-img {
    /* background-color: red; */
    margin-top: 40%;
    /* margin-right: 50%; */
    width: 100px;
    height: 100px;
  }
  > .menu-img img {
    /* margin: 30px; */
    width: 100px;
    height: 100px;
    border-radius: 100%;

    /* cursor: pointer; */
  }
  > h2 {
    margin-top: 20px;
    /* background: red; */
  }
`;
const ButtonList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  > button {
    cursor: pointer;
    border-radius: 20px;
    font-size: 1.3em;
    padding: 10px;
    margin-top: 20px;
    border: none;
    /* background-color: #8ea1da; */
    transition: all 0.5s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const UserInfopage = styled.div`
  top: 0;
  margin-left: 300px;

  display: flex;
  justify-content: center;
`;
export const View = styled.div`
  margin-top: 40px;
  width: 60%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-self: center;
  /* background: yellow; */
  .btn-exit {
    margin: 20px auto;
    width: 80px;
    border: 1px gray solid;
    height: 40px;
    /* background-color: #8ea1da; */
    /* background: purple; */
    background-image: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.9) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    transition: all 0.5s ease;
    border-radius: 20px;
  }
  .btn-exit:hover {
    transform: scale(1.1);
  }
`;
const Viewcontent = styled.div`
  margin: 0px 0px 0 340px;
  background-color: yellow;
  border-radius: 10px;
  width: 200px;
  padding: 30px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  > input {
    /* background-color: red; */
  }
`;

export const UserProfilePage = styled.div`
  width: 500px;
  height: 500px;
  /* background: yellow; */
`;
// export const ProfileImg = styled.img`
//   margin: 30px;
//   width: 170px;
//   height: 170px;
//   border-radius: 100%;
//   cursor: pointer;
// `;
export const ContentBox = styled.div`
  margin-top: 40px;
  margin-left: 10%;
  width: 100%;
  /* display: flex; */
  /* flex-direction: column; */
  > form {
    display: flex;
    flex-direction: column;
    /* background: red; */
  }
  > button {
    margin: auto;
    width: 80px;
    border: none;
    height: 40px;
    /* background-color: #8ea1da; */
    /* background: purple; */
    background-image: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.9) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    transition: all 0.5s ease;
    border-radius: 20px;
  }
  > form .userinfo-each-label {
    /* background: skyblue; */
    margin-top: 30px;
    position: relative;
  }
  > form .userinfo-each-label span {
    float: left;
  }
  > form .userinfo-each-label input {
    /* background: yellow; */
    font-size: 1.2rem;
    width: 80%;
    border-left: none;
    border-right: none;
    border-top: none;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 20px;
    /* position: absolute; */
    /* float: right; */
  }
  > form .userinfo-each-label .btn-edit {
    position: absolute;
    right: 1%;
    width: 80px;
    border: 1px gray solid;
    height: 40px;
    /* background-color: #8ea1da; */
    /* background: purple; */
    background-image: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.9) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    transition: all 0.5s ease;
    border-radius: 20px;
  }
  button:hover {
    transform: scale(1.1);
  }
  button:active {
    transform: scale(1.1);
  }
`;

const ImgDiv = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px auto;
`;
dotenv.config();

//????????????, ???????????????????????????.

const UserInfo = () => {
  const [info, setInfo] = useRecoilState(userInfo);
  const [imgUrl, setImgUrl] = useState(""); //<input type="fiile">??? ????????? ?????????.
  const [prevImg, setPrevImg] = useState(
    "https://aneun-dongne.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A2%E1%86%B7%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5+414kb.png"
  ); //DB?????? ????????? ?????????.
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputCheckPassword, setInputCheckPassword] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [isLoginOpen, setIsLoginOpen] = useRecoilState(loginModal);
  const [formPhotoData, setFormPhotoData] = useState(null);

  // const [PasswordErr, setPasswordErr] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [passwordCheckError, setPasswordCheckError] = useState("");

  // console.log(imgUrl);

  const history = useHistory();
  // console.log(info);
  useEffect(() => {
    //! ?????? ?????? ????????? ???????????????
    axios
      .get("https://localhost:80/user/info", { "Content-Type": "application/json", withCredentials: true })
      .then((res) => {
        console.log(res.data.data.userInfo);

        setInfo(res.data.data.userInfo);
        if (res.data.data.userInfo.user_image_path) {
          console.log(res.data.data.userInfo.user_image_path);
          setImgUrl(res.data.data.userInfo.user_image_path);
          setPrevImg(res.data.data.userInfo.user_image_path);
          setNickname(res.data.data.userInfo.nickname);
        }
      })
      .then();
  }, []);

  const editInfo = (e) => {
    e.preventDefault();
    // ??????????????? ???
    if (!isLogin) {
      setIsLoginOpen(true);
      return;
    }
    let a = null;
    let formData = new FormData();
    // if(!imgUrl){
    //   formData.append("image", imgUrl);
    // }
    if (imgUrl) {
      formData.append("image", imgUrl);
      console.log(imgUrl);
    }
    formData.append("nickname", inputUsername);
    formData.append("email", info.email);
    formData.append("password", inputPassword);
    formData.append("checkPassword", inputCheckPassword);
    formData.append("newPassword", inputNewPassword);
    // formData.append("")

    axios
      .patch(`https://localhost:80/user/info`, formData, { withCredentials: true })
      .then((res) => {
        if (res.status === 400) {
          alert("????????? ???????????? ?????????"); //????????? alert?????? ???
          return;
        }
        //! ???????????? db?????? ?????????, <input text='file'>?????? ??????????????? ??????????????????..
        //!
        console.log(res.data.data);
        setPrevImg(res.data.data.user_image_path);
        return res.data.data.nickname;
      })
      .then((name) => {
        setNickname(name);

        console.log(name);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log(nickname);
  }, [nickname]);

  //   //????????????
  //   const handleChangeFile = (e) => {
  //     let reader = new FileReader();
  //     reader.onloadend = () => {
  //       const url = reader.result;
  //       if (url) {
  //         setImgUrl(url.toString());
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   };

  //???????????????
  const handleInputUsername = (e) => {
    setInputUsername(e.target.value);
  };

  //??????????????????//??????????????????????????????
  const handleInputPassword = (e) => {
    setInputPassword(e.target.value);
  };

  const handleInputNewPassword = (e) => {
    setInputNewPassword(e.target.value);
  };
  const handleInputCheckPassword = (e) => {
    setInputCheckPassword(e.target.value);
  };

  //???????????????
  const validePassword = (InputPassword, InputNewPassword) => {
    if (InputPassword !== InputNewPassword) {
      alert("????????? ??????????????? ???????????????!");
      return false;
    }
  };

  //????????? ????????? ??????
  const handleEdit = () => {
    if (imgUrl === "" || inputUsername === "" || inputEmail === "" || inputPassword === "") {
      alert("????????? ?????????!");
      return;
    }
  };

  const saveBtnHandler = () => {
    if (!validePassword || !handleEdit) {
      // const token = JSON.parse(localStorage.getItem("token"));
      axios
        .put(
          "https://localhost:80/mypage",
          {
            // email: inputUsername,
            nickname: userInfo.nikename,
            users_image_path: userInfo.users_image_path,
            password: userInfo.password,
            new_password: userInfo.new_password, //????????? ???????????? ?????????.
          },
          {
            "Content-Type": "application/json",
            withCredentials: true,
            // Authorization: `token ${token}`,
          }
        )
        .then((res) => {
          setConfirmMessage("????????? ????????? ?????????????????????!");
          // localStorage.clear();
          history.push("/mypage");
        })
        .catch((err) => console.log(err));
    }
  };

  //????????????
  const deleteHandler = () => {
    axios
      .delete(`http://localhost:80/user/mypage`, {
        headers: {
          // authorization: accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("????????? ??????...", res);
        // isLogout();
        setIsDelete(true);
        setTimeout(() => {
          history.push("/");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };
  // console.log(info);
  return (
    <Body>
      <MenuBar>
        <div className="menu-img">
          {/* <ProfileUpload imgUrl={imgUrl} setImgUrl={setImgUrl} /> */}
          <img src={prevImg}></img>
        </div>
        <h2>{nickname}</h2>
        <ButtonList>
          <button>???????????????</button>
          <button>????????? ??? ?????????</button>
          <button>?????? ??? ??????</button>
          <button>?????? ?????? ???</button>
        </ButtonList>
      </MenuBar>

      <UserInfopage>
        <View>
          <ImgDiv>
            <ProfileUpload imgUrl={imgUrl} setImgUrl={setImgUrl} />
          </ImgDiv>

          <ContentBox>
            <form onSubmit={editInfo}>
              <div className="userinfo-each-label">
                <input type="text" name="nickname" placeholder="?????????" onChange={handleInputUsername} />
              </div>
              <div className="userinfo-each-label">
                <input
                  type="password"
                  name="password"
                  // defaultValue=""
                  placeholder="?????? ????????????"
                  value={inputPassword}
                  onChange={(e) => handleInputPassword(e)}
                />
              </div>
              <div className="userinfo-each-label">
                <input
                  type="password"
                  name="password"
                  placeholder="???????????? ??????"
                  // defaultValue=""
                  value={inputCheckPassword}
                  onChange={(e) => handleInputCheckPassword(e)}
                />
              </div>
              <div className="userinfo-each-label">
                <input
                  type="password"
                  name="password"
                  // defaultValue=""
                  placeholder="?????? ????????????"
                  value={inputNewPassword}
                  onChange={(e) => handleInputNewPassword(e)}
                />
                <button className="btn-edit" type="submit">
                  ??????
                </button>
              </div>
            </form>
          </ContentBox>
          <button className="btn-exit" onClick={() => deleteHandler()}>
            ????????????
          </button>
        </View>
      </UserInfopage>
    </Body>
  );
};
export default UserInfo;
