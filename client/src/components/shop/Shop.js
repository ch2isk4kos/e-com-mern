import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCount, searchProducts } from "../../api/nodejs/products";
import ProductCard from "../admin/product/ProductCard";
import { Menu, Slider } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  // load default
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
  };

  // load based on search
  const loadProductSearch = (query) => {
    searchProducts(query).then((res) => {
      setProducts(res.data);
    });
  };

  // query search
  useEffect(() => {
    const delay = setTimeout(() => {
      loadProductSearch({ query: text });
      return () => clearTimeout(delay);
    }, 500);
  }, [text]);

  // price search
  useEffect(() => {
    loadProductSearch({ price: price });
  }, [ok]);

  const handleOnPrice = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 500);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4 className="mt-3">Advanced Search</h4>
          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span>
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  range
                  max={10000}
                  tipFormatter={(v) => `$${v}`}
                  value={price}
                  onChange={handleOnPrice}
                />
              </div>
            </SubMenu>
          </Menu>
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
