import React from "react";
import { Carousel } from "antd";

function ProductImage({ images }) {
  return (
    <div>
      {images && (
        <Carousel dotPosition={"right"} className="carousel_wrapper">
          <img src={images[0].s3_url} width={300} alt="product-image-1"></img>
          <img src={images[1].s3_url} width={300} alt="product-image-2"></img>
          <img src={images[2].s3_url} width={300} alt="product-image-3"></img>
        </Carousel>
      )}
    </div>
  );
}

export default ProductImage;
