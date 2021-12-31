import { atom, selector } from "recoil";
import axios from "axios";
import Cookies from "universal-cookie";
import { visitedModal } from "./recoil";

const cookies = new Cookies();

//! 마이페이지
export const visitedId = atom({
  key: "visitedId",
  default: 0,
});
export const newVisitedPlace = atom({
  key: "newVisitedPlace",
  default: "",
});
export const newVisitedMemo = atom({
  key: "newVisitedMemo",
  default: "",
});
export const getVisitedPlace = selector({
  key: "getVisitedPlace",
  get: async ({ get }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/visited`, {
      headers: {
        Authorization: `Bearer ${cookies.get("jwt") || cookies.get("kakao-jwt")}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // console.log(response);
    const visitedList = response.data.data;
    return visitedList;
  },
});
// export const newVisitedPlace = selector({
//     key: "newVisitedPlace",
//     get: ({get}) => {
//         return get(visitedPlace)
//     }
//     set:(({set,get},get(getVisitedPlace))=>{

//     })
// })
// export const deletedVisitedPlace = selector({
//   key: "deletedVisitedPlace",

//   get: async ({ get }) => {
//     const response = await axios.delete(`${process.env.REACT_APP_API_URL}/visited`, {
//       headers: {
//         Authorization: `Bearer ${cookies.get("jwt") || cookies.get("kakao-jwt")}`,
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//       params: { visitedId: get(visitedId) },
//     });
//     get(visitedModal)

//     const visitedList = response.
//   },
// });
