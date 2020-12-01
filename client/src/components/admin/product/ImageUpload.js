import React from "react";

const ImageUpload = () => {
  const handleOnUpload = (e) => {
    console.log("Files: ", e.target.files);
    // resize

    // send to mongo atlas which will upload images to cloudinary

    // set url to images[] in Product Form
  };
  return (
    <div className="row m-0">
      <label className="btn btn-dark">
        Upload Images
        <input
          className="form-control"
          type="file"
          accept="iamges//*"
          multiple
          hidden
          onChange={handleOnUpload}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
