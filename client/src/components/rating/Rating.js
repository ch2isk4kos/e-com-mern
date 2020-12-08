import React from "react";
import StarRating from "react-star-ratings";

const Rating = ({ starClick, numberOfStars }) => {
  return (
    <>
      <StarRating
        starDimenson="20px"
        StarSpacing="5px"
        starHoverColor="orange"
        starEmptyColor=""
        starchangeRating={() => starClick(numberOfStars)}
        numberOfStar={numberOfStars}
      />
    </>
  );
};

export default Rating;
