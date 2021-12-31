import React from "react";
import { Styled } from "./style";

function HashTagTemplate({ keywordDummy }) {
  console.log(keywordDummy);
  return (
    <>
      <Styled.KeyWordBox>
        {keywordDummy.map((keyword, idx) => {
          return (
            //key index 쓰지말기
            <Styled.KeyWord idx={idx + "px"} id={idx} position={"absolute"} key={idx}>
              {keyword}
            </Styled.KeyWord>
          );
        })}
      </Styled.KeyWordBox>
    </>
  );
}

export default React.memo(HashTagTemplate);
