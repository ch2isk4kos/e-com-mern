import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../../api/nodejs/subCategories";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getSubCategories().then((res) => {
      setSubCategories(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          {subCategories &&
            subCategories.map((c) => (
              <button
                key={c._id}
                className="btn btn-raised btn-lg btn-outline m-3"
                // style={{ background: "WhiteSmoke" }}
              >
                <Link to={`/sub/${c.slug}`}>{c.name}</Link>
              </button>
            ))}
        </>
      )}
    </>
  );
};

export default SubCategories;
