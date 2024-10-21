import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CAROUSEL_IMG_1, CAROUSEL_IMG_2 } from "../../common/constants/constants";

const CarouselView = () => {
  return (
    <div className="w-full mt-52">
      <Carousel
        infiniteLoop
        autoPlay
        showArrows
        interval={3000}
        transitionTime={500}
        showStatus={false}
        showThumbs={false}
        className=""
      >
        <div className="h-[28rem]">
          <img
            src="https://static.vecteezy.com/system/resources/previews/011/320/988/non_2x/big-sale-banner-design-with-podium-gradient-background-social-media-post-product-advertisement-design-special-discount-design-vector.jpg"
            className="h-full object-fit"
          />
        </div>
        <div className="h-[28rem]">
        <img
            src={CAROUSEL_IMG_1}
            className="h-full object-fit"
          />
        </div>
        <div className="h-[28rem]">
        <img
            src={CAROUSEL_IMG_2}
            className="h-full object-fit"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselView;
