import React, { useEffect, useState } from "react";
import axios from "axios";
import notImageYet from "../../img/not-image-yet.png";
import { Styled } from "./style";
import PlaceList from "../PlaceList";
import VisitedList from "./VisitedList";
import { visitedModal } from "../../recoil/recoil";
import { useSetRecoilState } from "recoil";
import Footer from "../Footer/Footer";
const { kakao } = window;
const placeList = [
  {
    id: 1,
    visited_area: "충청북도",
    visited_sigg: "제천",
    visited_memo_image_path: "https://aneun-dongne.s3.ap-northeast-2.amazonaws.com/cafe1.jpg",
    visited_memo: "와~~카페다~",
    mapX: "128.37468237",
    mapY: "37.43569238",
    createdAt: "2021 - 08 - 23",
  },
  {
    id: 2,
    visited_area: "충청북도",
    visited_sigg: "청주",
    visited_memo_image_path:
      "https://aneun-dongne.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2021-11-26+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+1.19.31.png",
    visited_memo: `붉은노을처럼 난 너를 사랑해 이 세상은 너 뿐이야`,
    mapX: "126.37468237",
    mapY: "35.23569238",
    createdAt: "2021 - 03 - 20",
  },
  {
    id: 3,
    visited_area: "충청북도",
    visited_sigg: "청주",
    visited_memo_image_path:
      "https://aneun-dongne.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2021-11-26+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+1.19.31.png",
    visited_memo: `소리쳐 부르지만`,
    mapX: "126.37468237",
    mapY: "36.83569238",
    createdAt: "2021 - 03 - 20",
  },
  {
    id: 4,
    visited_area: "충청북도",
    visited_sigg: "청주",
    visited_memo_image_path:
      "https://aneun-dongne.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2021-11-26+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+1.19.31.png",
    visited_memo: `저 대답없는 노을만 붉게타는데`,
    mapX: "126.37468237",
    mapY: "36.43569238",
    createdAt: "2021 - 03 - 20",
  },
  {
    id: 5,
    visited_area: "충청북도",
    visited_sigg: "청주",
    visited_memo_image_path:
      "https://aneun-dongne.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2021-11-26+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+1.19.31.png",
    visited_memo: `멋진풍경
    와 노을 진짜 멋지다 와
    와'
  와와와
  와와
  와
  대박
  대박사건`,
    mapX: "127.2468237",
    mapY: "36.43569238",
    createdAt: "2021 - 03 - 20",
  },
  {
    id: 6,
    visited_area: "충청북도",
    visited_sigg: "청주",
    visited_memo_image_path:
      "https://aneun-dongne.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2021-11-26+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+1.19.31.png",
    visited_memo: `멋진풍경
    와 노을 진짜 멋지다 와
    와'
  와와와
  와와
  와
  대박
  대박사건`,
    mapX: "127.37468237",
    mapY: "36.43569238",
    createdAt: "2021 - 03 - 20",
  },
];

const MyVisited = () => {
  const setIsVisitedOpen = useSetRecoilState(visitedModal);
  useEffect(() => {
    const container = document.querySelector("#map");
    const options = {
      //!사실 placeLocation은 필요없음
      //!지도의 초기 중심화면 설정
      center: new kakao.maps.LatLng(37, 128),
      level: 14,
    };
    if (container === null) {
      return;
    }
    const map = new kakao.maps.Map(container, options);
    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
    let bounds = new kakao.maps.LatLngBounds();
    let positions = [];
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    for (let i = 0; i < placeList.length; i++) {
      positions.push({
        addr: `${placeList[i].visited_area} ${placeList[i].visited_sigg}`,
        img: placeList[i].visited_memo_image_path,
        content: placeList[i].visited_memo,
        latlng: new kakao.maps.LatLng(placeList[i].mapY, placeList[i].mapX),
      });
    }
    console.log("hi");
    for (let i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng,
        image: markerImage, // 마커 이미지
      }); // 마커를 표시할 위치

      // 지도 범위정보에 좌표 추가
      bounds.extend(positions[i].latlng);
      //관광지마커의 infowindow(마우스 올렸을때만)
      let iwContent = `
      <div style="width: 200px">
        <img style = "width:100px;height:100px" src = ${positions[i].img} />
        <div>[${positions[i].addr}]</div>
        <div style = 
          padding: 0 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;"
          >${positions[i].content}
        </div>
      </div>`,
        iwPosition = new kakao.maps.LatLng(positions[i][0], positions[i][1]);
      let infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
        // removable : iwRemoveable
      });
      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
      //관광지 마커 클릭하면 정보나오기
      // ! 여기 홈페이지 주소도 넣어줘야함. 백엔드에 요구하기. 위치기반url에는 홈페이지 응답으로 안준다.
      // let onClickContent = `<div class="wrap">
      //                <div class="info">
      //                    <div class="title">
      //                    ${positions[i].content}

      //                    </div>
      //                    <div class="body">
      //                        <div class="img">
      //                            <img src=${positions[i].img || notImageYet} width="73" height="70">
      //                       </div>
      //                        <div class="desc">
      //                            <div class="ellipsis">${positions[i].addr}</div>
      //                        </div>
      //                    </div>
      //                </div>
      //           </div>`,
      //   iwRemoveable = true;
      // let infowindowOnClick = new kakao.maps.InfoWindow({
      //   position: iwPosition,
      //   content: onClickContent,
      //   removable: iwRemoveable,
      // });

      kakao.maps.event.addListener(marker, "click", function () {
        // infowindowOnClick.open(map, marker);
        setIsVisitedOpen(true);
      });
    }
    map.setBounds(bounds);
  }, []);

  return (
    <Styled.Body>
      <Styled.Div>
        <Styled.Map id="map"></Styled.Map>
      </Styled.Div>
      <VisitedList placeList={placeList} />
    </Styled.Body>
  );
};

export default MyVisited;
