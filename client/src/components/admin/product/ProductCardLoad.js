import React from "react";
import { Card, Skeleton } from "antd";

const ProductCardLoad = ({ count }) => {
  const display = () => {
    let cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <Card className="col m-5">
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return cards;
  };
  return <>{display()}</>;
};

export default ProductCardLoad;
