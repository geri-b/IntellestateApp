import img1 from '../images/HomePage/CarouselSlide1.jpg';
import img2 from '../images/HomePage/CarouselSlide2.jpg';
import img3 from '../images/HomePage/CarouselSlide3.jpg';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';
import '../App.css';


function HomepageCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid>
      <Carousel classname='carousel-fullscreen' activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>About Intellestate</h3>
            <p className='caption-box'><b>
              Here at Intellestate, we want to provide you with an "intellegent" property purchasing experience. Our goal is to
              supply our users with essencial information about properties you can only find here!
            </b></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Find a property</h3>
            <p className='caption-box'><b>
              Use our real estate search feature to look for a property you are interested in, or just search for a general area.
              As you view properties, our intellegent recomendation system will present homes you may be interested in.
            </b></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Buisness Hotspot Analisys</h3>
            <p className='caption-box'><b>
              Home owners are not the only group that need access to a realestate marketplace. Many times buisness owners are in need of a way
              to find an ideal place to run a buisness from. Our hotspot anlysis will show you if an area is "hot" to give your busness a better chance at thriving.
            </b></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}


export default HomepageCarousel;

