import React from "react";

const ProductForm = ({
  product,
  handleOnChange,
  handleOnCategory,
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
            <label className="float-left">Category</label>
            <select
              className="form-control mb-2"
              name="category"
              onChange={handleOnCategory}
              autoFocus
            >
              <option></option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </>
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
              type="number"
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
              onChange={handleOnChange}
            >
              <option></option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </>
          {/* <select id="" name="category">
                  <option value={category}>Select Category</option>
                </select> */}
          <>
            <label className="float-left">Brand</label>
            <select
              className="form-control mb-2"
              name="brand"
              onChange={handleOnChange}
            >
              <option></option>
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
              onChange={handleOnChange}
            >
              <option></option>
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
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
