import React from "react";
import StarRating from "react-star-ratings";

const Rating = ({ starClick, numberOfStars }) => {
  return (
    <>
      <StarRating
        starDimension="20px"
        starSpacing="5px"
        starHoverColor="orange"
        starEmptyColor="orange"
        starchangeRating={() => starClick(numberOfStars)}
        numberOfStar={numberOfStars}
      />
    </>
  );
};

export default Rating;
