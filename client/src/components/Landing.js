import React from "react";
import { Carousel } from "antd";

const Landing = () => {
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    // <div>
    //   {/* Carousel wrapper */}
    //   <div id="carouselBasicExample" class="carousel slide carousel-fade" data-ride="carousel">
    //     {/* <!-- Indicators --> */}
    //     <ol class="carousel-indicators">
    //       <li data-target="#carouselBasicExample" data-slide-to="0" class="active"></li>
    //       <li data-target="#carouselBasicExample" data-slide-to="1"></li>
    //       <li data-target="#carouselBasicExample" data-slide-to="2"></li>
    //     </ol>

    //     {/* <!-- Inner --> */}
    //     <div class="carousel-inner">
    //       {/* <!-- Single item --> */}
    //       <div class="carousel-item active">
    //         <img
    //           src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
    //           class="d-block w-100"
    //           alt="..."
    //         />
    //         <div class="carousel-caption d-none d-md-block">
    //           <h5>First slide label</h5>
    //           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //         </div>
    //       </div>

    //       {/* <!-- Single item --> */}
    //       <div class="carousel-item">
    //         <img
    //           src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
    //           class="d-block w-100"
    //           alt="..."
    //         />
    //         <div class="carousel-caption d-none d-md-block">
    //           <h5>Second slide label</h5>
    //           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //         </div>
    //       </div>

    //       {/* <!-- Single item --> */}
    //       <div class="carousel-item">
    //         <img
    //           src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
    //           class="d-block w-100"
    //           alt="..."
    //         />
    //         <div class="carousel-caption d-none d-md-block">
    //           <h5>Third slide label</h5>
    //           <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    //         </div>
    //         </div>
    //       </div>
    //       {/* <!-- Inner --> */}

    //       {/* <!-- Controls --> */}
    //       <a
    //         class="carousel-control-prev"
    //         href="#carouselBasicExample"
    //         role="button"
    //         data-slide="prev"
    //       >
    //         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //         <span class="visually-hidden">Previous</span>
    //       </a>
    //       <a
    //         class="carousel-control-next"
    //         href="#carouselBasicExample"
    //         role="button"
    //         data-slide="next"
    //       >
    //         <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //         <span class="visually-hidden">Next</span>
    //       </a>
    //     </div>
    // {/* <!-- Carousel wrapper --> */}
    // </div>

    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export default Landing;
