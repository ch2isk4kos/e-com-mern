import React from "react";
import Jumbotron from "./Jumbotron";
import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";
import Categories from "../../../src/components/admin/category/Categories";

const Home = () => {
  return (
    <>
      <div
        className="jumbotron mb-5"
        style={{
          background: "WhiteSmoke",
          padding: "2em",
          fontSize: "4em",
          fontWeight: "bold",
        }}
      >
        <Jumbotron
          text={[
            "Yard Sale on Fire",
            "Built by Chris Kakos",
            "Powered by MongoDB and Google",
          ]}
        />
      </div>
      <div
        className="p-3 mt-3 mb-3 display-5"
        style={{ background: "WhiteSmoke" }}
      >
        New Arrivals
      </div>
      <>
        <NewArrivals />
      </>
      <div
        className="p-3 mt-3 mb-3 display-5"
        style={{ background: "WhiteSmoke" }}
      >
        Best Sellers
      </div>
      <>
        <BestSellers />
      </>
      <div
        className="p-3 mt-3 mb-3 display-5"
        style={{ background: "WhiteSmoke" }}
      >
        Categories
      </div>
      <>
        <Categories />
      </>
    </>
  );
};

export default Home;
