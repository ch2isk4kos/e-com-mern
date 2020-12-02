import React from "react";

const ProductUpdateForm = ({
  product,
  setProduct,
  handleOnChange,
  handleOnSubmit,
}) => {
  const {
    name,
    price,
    description,
    colors,
    color,
    brands,
    brand,
    images,
    categories,
    // category,
    subcategories,
    shipping,
    quantity,
  } = product;
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-group">
        <div className="col-md-6 offset-md-3">
          <>
            <label className="float-left">Product Name</label>
            <input
              className="form-control mb-2"
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              required
            />
          </>
          <>
            <label className="float-left">Price</label>
            <input
              className="form-control mb-2"
              name="price"
              value={price}
              onChange={handleOnChange}
              required
            />
          </>
          <>
            <label className="float-left">Color</label>
            <select
              className="form-control mb-2"
              name="color"
              value={color}
              onChange={handleOnChange}
            >
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </>
          <>
            <label className="float-left">Brand</label>
            <select
              className="form-control mb-2"
              name="brand"
              value={brand}
              onChange={handleOnChange}
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </>
          <>
            <label className="float-left">Shipping</label>
            <select
              className="form-control mb-2"
              name="shipping"
              value={shipping === "Yes" ? "Yes" : "No"}
              onChange={handleOnChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </>
          <>
            <label className="float-left">Quantity</label>
            <input
              className="form-control mb-2"
              type="number"
              name="quantity"
              value={quantity}
              onChange={handleOnChange}
              required
            />
          </>

          <>
            <label className="float-left">Description</label>
            <textarea
              className="form-control mb-2"
              type="text"
              rows={5}
              cols={5}
              name="description"
              value={description}
              onChange={handleOnChange}
            />
          </>
          <button className="btn btn-primary m-3" type="submit">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductUpdateForm;