import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imgPath } from "@/componets/helpers/functions-general";
import Slider from "react-slick";

const SliderBanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      <img
        src={`${imgPath}/slider-1.jpg`}
        alt=""
        className="h-[200px] object-cover w-full"
      />
      <img
        src={`${imgPath}/slider-2.png`}
        alt=""
        className="h-[200px] object-cover w-full"
      />
      <img
        src={`${imgPath}/slider-3.jpg`}
        alt=""
        className="h-[200px] object-cover w-full"
      />
    </Slider>
  );
};

export default SliderBanner;