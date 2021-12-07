import { atom, selector } from "recoil";
import axios from "axios";
//

//! 유저 주소
export const usersaddress = atom({
  key: "nowlocation",
  default: { add: "", sigg: "", addr: "" },
});

export const placelist = atom({
  key: "placelist",
  default: [],
});

//메인페이지에서 유저주소, 좌표 넘어오면 연결시키기

//! 관광지 관련 전역변수
export const placeaddress = atom({
  key: "placeaddress",
  default: "",
});

export const placetitle = atom({
  key: "placetitle",
  default: "",
});

export const placelocation = atom({
  key: "placelocation",
  default: { lat: 0, lon: 0 },
});
export const placeimg = atom({
  key: "placeimg",
  default: "",
});

//! 로딩state
export const loading = atom({
  key: "loading",
  default: true,
});

//! Home화면에서 현재위치 저장 모달
export const isSavepositionOpen = atom({
  key: "isSavepositionOpen",
  default: false,
});

//! 로긴
export const loginState = atom({
  key: "loginState",
  default: false,
});
//! 로긴모달
export const loginModal = atom({
  key: "loginModal",
  default: false,
});
export const userInfo = atom({
  key: "userInfo",
  default: null,
});

export const defaultposition = atom({
  key: "defaultPosition",
  default: { lat: 0, lon: 0 },
});

// ! 댓글
export const defaultcomments = atom({
  key: "defaultcomments",
  default: [
    {
      //uuid:0,
      img: "/people1.png",
      nickname: "류준열",
      text: "안녕하세요",
      tags: [
        "안녕하세요",
        "감사해요",
        "잘있어요",
        "다시만나요",
        "여기 더보기버튼을 만들어볼게요",
        "아침해가뜨면",
        "매일같은사람들과",
      ],
      date: "2021-12-03", //형식 모르겠음 db보고 결정
      editable: false,
    },
    {
      //uuid:0,
      img: "/people2.png",
      nickname: "윤해용",
      text: "팀장이에요",
      tags: ["해시태그", "스페이스바로", "바꿨어요"],
      date: "2021-12-03", //형식 모르겠음 db보고 결정
      editable: false,
    },
  ],
});
// ! 댓글쓰면 스크롤 내리는 신호
export const updatecomment = atom({
  key: "updatecomment",
  default: false,
});

//! 댓글 수정신호
export const editcommentMode = atom({
  key: "editcommentMode",
  default: false,
});

// ! 위치기반 API
export const pickpoint = selector({
  key: "pickpoint",
  get: ({ get }) => {
    console.log(get(defaultposition).lat, get(defaultposition).lon);
    return [get(defaultposition).lat, get(defaultposition).lon];
  },
  set: ({ set }, arr) => {
    set(defaultposition, { lat: arr[0], lon: arr[1] });
  },
});

export const token = atom({
  key: "token",
  default: "",
});
