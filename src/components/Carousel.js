import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';

import main2 from '../image/main2.jpg';
import main3 from '../image/main3.jpg';
import main4 from '../image/main4.jpg';
import main5 from '../image/main5.jpg';

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
   // pauseOnHover: true,
    fade: true,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      <div>
        <img class="slider" src={main2} alt="imagen1" />
      </div>
      <div>
        <img class="slider" src={main3} alt="imagen2" />
      </div>
      <div>
        <img class="slider" src={main4} alt="imagen3" />
      </div>
      <div>
        <img class="slider" src={main5} alt="imagen3" />
      </div>
    </Slider>
  );
};

export default Carousel;
