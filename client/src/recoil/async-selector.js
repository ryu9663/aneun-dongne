import { pickpoint } from "./recoil";
import { selector } from "recoil";
import axios from "axios";

export const getPlace = selector({
  key: "getPlace",
  get: async ({ get }) => {
    // if (get(pickpoint)[1] === 0 || get(pickpoint)[0] === 0) {
    //   return null;
    // }
    return await axios
      .get(
        `http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?ServiceKey=${process.env.REACT_APP_TOUR_API_KEY}`,
        {
          params: {
            MobileOS: "ETC",
            MobileApp: "TourAPI3.0_Guide",
            //! 관광지 개수
            numOfRows: 50,
            // areaCode:33,
            // sigunguCode:7,
            //! contentTypeId : 12:관광지,14:문화시설,15:행사,25:여행코스,28:레포츠,32:숙박,38:쇼핑,39:식당,
            contentTypeId: 12,
            // * 대분류 : 인문
            // cat1:'A02',
            //* 중분류 : 역사지구
            // cat2:'A0201',
            //*좌표,반경
            mapX: get(pickpoint)[1], //lon
            mapY: get(pickpoint)[0], //lat
            //! 반경 몇m??
            radius: 10000,
            //*
            arrange: "A",
            listYN: "Y",
          },
        },
        { "content-type": "application/json" }
      )
      .then((res) => {
        // console.log(res.data.response.body.items.item);
        let list = res.data.response.body.items.item;
        //! list : [[관광지각각의 y좌표,x좌표,제목,썸네일,주소,컨텐트id],..]
        list = list.map((el) => {
          return [Number(el.mapy), Number(el.mapx), el.title, el.firstimage, el.addr1, el.contentid];
        });
        console.log(list);
        return list;
        //서버에서 값을 받아오다가(로딩) 값이생긴다 or 서버에서 값을 받아오다가(로딩) 에러가 뜬다.
        //{
        //    state : hasValue,loading,hasError,
        //    contents:로딩되었을때 값.
        //}
      })
      .catch((err) => console.log(err));
  },
});

export const setLo = selector({
  key: "setLo",
  get: async ({ get }) => {
    return (
      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${get(pickpoint)[1]}&y=${
            get(pickpoint)[0]
          }&input_coord=WGS84`,
          { headers: { Authorization: `KakaoAK ${process.env.REACT_APP_REST_API}` } }
        )
        .then((res) => res.data.documents[0].address)
        .then((address) => {
          // console.log(address)
          console.log({
            area: address.region_1depth_name,
            sigg: address.region_2depth_name,
            address: address.address_name,
          });
          return { area: address.region_1depth_name, sigg: address.region_2depth_name, address: address.address_name };
        })
        //   .then(res=>console.log(meetingPlace))
        .catch((err) => console.log(err))
    ); //237줄에 console.log(meetingPlace)있음.
  },
});
