import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCount, searchProducts } from "../../api/nodejs/products";
import { getCategories } from "../../api/nodejs/categories";
import { getSubCategories } from "../../api/nodejs/subCategories";
import ProductCard from "../admin/product/ProductCard";
import Rating from "../rating/Rating";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  BlockOutlined,
  DollarOutlined,
  DownSquareOutlined,
  RobotOutlined,
  RobotFilled,
  StarOutlined,
} from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [rating, setRating] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Asus",
    "Microsoft",
    "Generic",
    "Nokia",
    "LG",
    "Blackberry",
    "Indie",
  ]);
  const [brand, setBrand] = useState("");
  const [ok, setOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  // load default
  useEffect(() => {
    loadProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubCategories().then((res) => setSubCategories(res.data));
  }, []);

  const loadProducts = () => {
    getProductsByCount(12).then((res) => {
      setIsLoading(false);
      setProducts(res.data);
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
    }, 300);
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

    setCategoryIds([]);
    setRating("");
    setSubCategory("");
    setBrand("");
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleOnCategories = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setRating("");
    setSubCategory("");
    setBrand("");

    let ids = [...categoryIds];
    let checkbox = e.target.value;
    let current = ids.indexOf(checkbox);

    if (current === -1) {
      ids.push(checkbox);
    } else {
      ids.splice(current, 1);
    }

    setCategoryIds(ids);
    loadProductSearch({ category: ids });
  };

  const handleOnRating = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryIds([]);
    setSubCategory("");
    setBrand("");
    setRating(num);

    loadProductSearch({ ratings: num });
  };

  const handleOnTag = (sub) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryIds([]);
    setRating("");
    setSubCategory(sub);
    setBrand("");

    loadProductSearch({ sub: sub });
  };

  const handleOnBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryIds([]);
    setRating("");
    setSubCategory("");
    setBrand(e.target.value);

    loadProductSearch({ brand: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          {/* Advanced Search */}
          <h4 className="mt-3">Advanced Search</h4>
          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
          >
            {/* Price Slider */}
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
            {/* Category List */}
            <SubMenu
              key="2"
              title={
                <span>
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <>
                {categories &&
                  categories.map((c) => (
                    <div key={c._id}>
                      <Checkbox
                        className="pb-2 pl-4 pr-4"
                        name="category"
                        checked={categoryIds.includes(c._id)}
                        value={c._id}
                        onChange={handleOnCategories}
                      >
                        {c.name}
                      </Checkbox>
                    </div>
                  ))}
              </>
            </SubMenu>
            {/* Ratings */}
            <SubMenu
              key="3"
              title={
                <span>
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div className="pr-4 pl-4 pb-2">
                <Rating handleOnRating={handleOnRating} numberOfStars={5} />
                <Rating handleOnRating={handleOnRating} numberOfStars={4} />
                <Rating handleOnRating={handleOnRating} numberOfStars={3} />
                <Rating handleOnRating={handleOnRating} numberOfStars={2} />
                <Rating handleOnRating={handleOnRating} numberOfStars={1} />
              </div>
            </SubMenu>
            {/* Sub Categories */}
            <SubMenu
              key="4"
              title={
                <span>
                  <BlockOutlined /> Tags
                </span>
              }
            >
              <div className="pr-4 pl-4 pb-2">
                {subCategories &&
                  subCategories.map((s) => (
                    <span
                      key={s._id}
                      className="p-1 m-1 badge"
                      style={{
                        cursor: "pointer",
                        background: "RoyalBlue",
                        fontSize: "12px",
                      }}
                      onClick={() => handleOnTag(s)}
                    >
                      {s.name}
                    </span>
                  ))}
              </div>
            </SubMenu>
            {/* Brands */}
            <SubMenu
              key="5"
              title={
                <span>
                  <RobotOutlined /> Brands
                </span>
              }
            >
              <div className="mb-1 pb-2 pl-4 pr-4">
                {brands.map((b) => (
                  <span key={b}>
                    <Radio
                      checked={b === brand}
                      name={b}
                      value={b}
                      onChange={handleOnBrand}
                    >
                      {b}
                    </Radio>
                  </span>
                ))}
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
