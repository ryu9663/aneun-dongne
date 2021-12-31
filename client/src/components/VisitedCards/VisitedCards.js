import React, { useState } from "react";

import { Styled } from "./style";

function VisitedCards({ area, sigg, image, memo, id }) {
  return (
    <>
      <Styled.PlaceCard>
        <div className={`place-cards ${id}`}>
          {image ? <img className={id} src={image} /> : <img className={id} src="/images/not-image-yet.png" />}
          <div className={`place-cards-title ${id}`}>
            <div className={id}>
              [ {area} {sigg} ]
            </div>
            <div className="place-cards-memo">{memo}</div>
          </div>
        </div>
      </Styled.PlaceCard>
    </>
  );
}

export default React.memo(VisitedCards);
