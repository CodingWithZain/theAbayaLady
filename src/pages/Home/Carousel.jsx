import React from "react";

const Carousel = () => {
  return (
    <div className="carousel carousel-end rounded-box">
      <div className="carousel-item">
        <img src="/Cpic1.jpg" width={"340px"} alt="Drink" />
      </div>
      <div className="carousel-item">
        <img src="/Cpic2.jpg" width={"340px"} alt="Drink" />
      </div>
      <div className="carousel-item">
        <img src="/Cpic3.jpg" width={"340px"} alt="Drink" />
      </div>
      <div className="carousel-item">
        <img src="/Cpic4.jpg" width={"340px"} alt="Drink" />
      </div>
    </div>
  );
};

export default Carousel;
