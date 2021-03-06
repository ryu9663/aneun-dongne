import React from "react";
import Carousel from "react-elastic-carousel";
import { responsive, myArrow } from "./carousel";

import "aos/dist/aos.css";
import styled from "styled-components";

export const Content = styled.section`
  width: 80%;
`;

export const Cardul = styled.ul`
  width: 50rem;
  height: 33.3rem;
  overflow: hidden;
`;

export const CardWrapper = styled.section`
  position: relative;
  display: flex;
  width: 100%;
`;

export const CardFace = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: 0.5s all ease-out;

  backface-visibility: hidden;
  border-radius: 5px;
  flex-direction: column;
`;

export const Review = styled(CardFace)`
  background-color: #183152;
  display: flex;
  flex-direction: column;

  & img {
    clip-path: circle();
    object-fit: cover;
    width: 150px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20%;
    position: center;
    top: 18%;
  }
`;

// export const CardBack = styled(CardFace)`
//   background: var(--point-color);
//   color: var(--primary-color);
//   transform: rotateY(180deg);
// `;

export const ReviewHeader = styled.div`
  position: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30%;
  font-weight: bold;
  font-size: 1.5rem;
  /* margin-bottom: 10%; */
  /* font-size: 1.5rem;
  position: absolute;
  bottom: 18%;
  text-align: center;
  margin-left: 5%;
  margin-right: 5%; */
  /* p {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10%;
  } */
`;
export const Backview = styled(Review)`
  background: #1e7ed5;
  /* #5fa6f0 */
  transform: rotateY(180deg);
`;

export const Post = styled.div`
  min-width: 20rem;
  min-height: 26.4rem;
  transform-style: preserve-3d;
  &:not(:first-child) {
    margin-left: 3rem;
  }

  &:hover ${Review} {
    transform: rotateY(180deg);
  }
  &:hover ${Backview} {
    transform: rotateY(180deg);
  }
`;

export const BackText = styled.h2`
  font-size: 1.2rem;
  position: absolute;
  bottom: 40%;
  text-align: center;
  letter-spacing: 2px;
  text-justify: center;
  margin-left: 20%;
  margin-right: 20%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LandingCard = () => {
  return (
    <Content className="content" data-aos="fade-up" data-aos-duration="1000">
      <Carousel breakPoints={responsive} renderArrow={myArrow} pagination={false}>
        <Post>
          <Review>
            <img src="/Designer.png" alt="" />
            <ReviewHeader>김코딩</ReviewHeader>
            <Backview>
              <BackText>
                우리동네에서 인기있는 관광지가 궁금했는데 좋아요와 위치기반으로 간편하게 볼 수 있어요.
              </BackText>
            </Backview>
          </Review>
        </Post>
        <Post>
          <Review>
            <img src="/Fitness.png" alt="" style={{ objectPosition: "-8px 55%" }} />
            <ReviewHeader>최코딩</ReviewHeader>
            <Backview>
              <BackText>해시태그로 원하는 곳을 쉽고 빠르게 찾을 수 있어서 좋아요!</BackText>
            </Backview>
          </Review>
        </Post>
        <Post>
          <Review>
            <img src="/kite.png" alt="" style={{ objectPosition: "-30px 60%" }} />
            <ReviewHeader>정코딩</ReviewHeader>
            <Backview>
              <BackText>새로운 동네로의 이사나 출장도 설레어요! ღ'ᴗ'ღ 산책하는 재미가 생겼어요!!</BackText>
            </Backview>
          </Review>
        </Post>
        <Post>
          <Review>
            <img src="/Notificationsr.png" alt="" style={{ objectPosition: "-15px 45%" }} />
            <ReviewHeader>박코딩</ReviewHeader>
            <Backview>
              <BackText>
                "나만의 좋았던 곳"을 저장해 놓으면, 친구들이 우리동네에 놀러왔을 때 그 리스트를 한 번에 볼 수 있어서
                원하는 곳으로 데려가기 간편해요!!
              </BackText>
            </Backview>
          </Review>
        </Post>
      </Carousel>
    </Content>
  );
};

export default LandingCard;
