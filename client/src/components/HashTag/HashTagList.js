import React from "react";
import styled from "styled-components";
import HashTagTemplate from "./HashTagTemplate";
const BackImg = styled.img`
  position: absolute;
  width: 45%;
  height: 100px;

  opacity: 0.5;
`;
const Div = styled.div`
  /* width: 100%; */
  display: flex;

  width: 500px;
  border-radius: 10px;
  border: 1px rgb(192, 251, 255) solid;
  height: 140px;
  /* margin-left: 10px; */
  margin-top: 10px;
`;

function HashTagList() {
  let totalWidth = 0;
  let totalHeight = 0;
  if (document.querySelector("#totalbox")) {
    totalWidth = document.querySelector("#totalbox").scrollWidth;
    totalHeight = document.querySelector("#totalbox").scrollHeight;
  }
  // console.log(totalWidth);
  return (
    <>
      <Div>
        {/* <BackImg src="data:image/jpeg;base64,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" /> */}
        <div id="totalbox">
          <HashTagTemplate keywordDummy={keywordDummy} totalWidth={totalWidth} totalHeight={totalHeight} />
        </div>
      </Div>
    </>
  );
}

export default HashTagList;

const keywordDummy = [
  "#??????????????????",
  "#???",
  "#??????",
  "#??????",
  "#????????????",
  "#?????????",
  "#???????????????",
  "#??????",
  "#?????????",
  "#?????????",
];
