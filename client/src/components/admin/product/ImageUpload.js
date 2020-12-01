import React from "react";
import Resizer from "react-image-file-resizer";
import { uploadImages } from "../../../api/cloudinary/images";
import { useSelector } from "react-redux";

const ImageUpload = ({ product, setProduct, isLoading, setIsLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleOnUpload = (e) => {
    console.log("Files: ", e.target.files);

    // resize images
    let files = e.target.files;
    let productImages = product.images;

    if (files) {
      setIsLoading(true);

      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720, // width
          720, // height
          "JPG", // compress format
          100, // quality
          0, // rotation
          // vvv response uri function vvv
          (uri) => {
            console.log("URI: ", uri);
            const token = user ? user.token : "";
            uploadImages(uri, token)
              .then((res) => {
                setIsLoading(false);
                productImages.push(res.data);
                setProduct({ ...product, images: productImages });
              })
              .catch((err) => {
                setIsLoading(true);
                console.log("CLOUDINARY UPLOAD", err);
              });
          },
          "base64" // output type
        );
      }
    }

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
