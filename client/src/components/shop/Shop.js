import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCount, searchProducts } from "../../api/nodejs/products";
import ProductCard from "../admin/product/ProductCard";
import { Menu, Slider } from "antd";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      loadProductSearch({ query: text });
      return () => clearTimeout(delay);
    }, 300);
  }, [text]);

  const loadProducts = () => {
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
  };

  const loadProductSearch = (query) => {
    searchProducts(query).then((res) => {
      setProducts(res.data);
    });
  };

  const loadProductPrices = (price) => {};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4 className="mt-3">Advanced Search</h4>
        </div>
        <div className="col-md-9">
          {isLoading ? <h4>Loading...</h4> : <h4 className="mt-3">Products</h4>}
          {products.length < 1 && <p>No Products Found</p>}
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
