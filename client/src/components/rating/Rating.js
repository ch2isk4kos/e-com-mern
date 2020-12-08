import React from "react";
import StarRating from "react-star-ratings";

const Rating = ({ handleOnRating, numberOfStars }) => {
  return (
    <div>
      <StarRating
        starDimension="25px"
        starSpacing="5px"
        starHoverColor="orange"
        starEmptyColor="orange"
        changeRating={() => handleOnRating(numberOfStars)}
        numberOfStars={numberOfStars}
      />
    </div>
  );
};

export default Rating;
