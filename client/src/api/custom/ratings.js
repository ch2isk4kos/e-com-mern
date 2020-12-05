import React from "react";
import StarRating from "react-star-ratings";

export const averageRating = (product) => {
  if (product && product.ratings) {
    let ratingsArray = product && product.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.rating));

    let reduceTotal = total.reduce((prev, next) => prev + next, 0);
    let max = length * 5;
    let average = (reduceTotal * 5) / max;

    return (
      <div>
        <span>
          <StarRating
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="5px"
            isSelectable={false}
            rating={average}
          />
        </span>
        <span className="pl-3">( {product.ratings.length} )</span>
      </div>
    );
  }
};
