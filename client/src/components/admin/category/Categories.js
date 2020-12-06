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
    <div>
      <div className="container">
        <div className="row">
          {isLoading ? (
            <h4>Loading...</h4>
          ) : (
            <div className="btn btn-outlined-primary btn-lg btn-block m-3"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
