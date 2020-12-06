import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../api/nodejs/categories";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {/* <div className="container">
        <div className="row"> */}
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          {categories &&
            categories.map((c) => (
              <button
                key={c._id}
                className="btn btn-raised btn-lg btn-outline m-3"
                // style={{ background: "WhiteSmoke" }}
              >
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
              </button>
            ))}
        </>
      )}
      {/* </div>
      </div> */}
    </>
  );
};

export default Categories;
