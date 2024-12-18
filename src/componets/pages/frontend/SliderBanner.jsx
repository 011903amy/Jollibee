import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imgPath } from "@/componets/helpers/functions-general";
import Slider from "react-slick";
import FetchingSpinner from "@/componets/partials/spinner/FetchingSpinner";
import ServerError from "@/componets/partials/ServerError";

const SliderBanner = ({ isLoadingAds, isFetchingAds, errorAds, dataAds }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="relative h-[200px]">
        {(isFetchingAds || isLoadingAds) && <FetchingSpinner />}
        {errorAds && <ServerError />}
        <Slider {...settings}>
          {dataAds?.count > 0 && dataAds?.data.map((item,key) => {

          return (
            <img
              key={key}
              src={`${imgPath}/${item.ads_image}`}
              alt={item.ads_image}
              className="h-[200px] object-cover w-full"
            />
          );

          })}
          {/* <img
        src={`${imgPath}/slider-1.jpg`}
        alt=""
        // className=" object-cover w-full"
      />
      <img
        src={`${imgPath}/slider-2.png`}
        alt=""
        // className=" object-cover w-full"
      />
      <img
        src={`${imgPath}/slider-3.jpg`}
        alt=""
        // className="object-cover w-full"
      /> */}
        </Slider>
      </div>
    </>
  );
};

export default SliderBanner;
