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
    <Container className="carousel-container" fluid style={{padding: 0}}>
      <Carousel className='carousel-custom' activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}


export default HomepageCarousel;

