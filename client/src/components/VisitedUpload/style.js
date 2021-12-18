import styled from "styled-components";
export const Styled = {
  ImageUploadBox: styled.div`
    /* width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 30px; */
    width: 100%;
    height: 100%;
    text-align: center;
    flex-direction: column;
    .input-blind {
      display: none;
    }
  `,
  ImgDiv: styled.div`
    background: ${(props) => `url(${props.photo})`} center;

    background-size: cover;
    display: flex;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    width: 400px;
    height: 200px;
    cursor: pointer;

    z-index: 999;
  `,
  EditProfile: styled.div`
    cursor: pointer;
    display: inline-block;
    margin-top: 10px;
  `,
};
