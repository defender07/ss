import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ry from '../assets/tu.jpeg';
import sa from '../assets/t4.jpg';
import xc from '../assets/t5.jpg';
import fg from '../assets/we.jpeg';
import gh from '../assets/tq.jpeg';
import jh from '../assets/br.jpeg';

const CarouselComponent = () => {
  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      {/* Main Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={ry}
            alt="First slide"
            style={{ height: '650px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>First Slide Label</h3>
            <p>Make your events unforgettable with us.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sa}
            alt="Second slide"
            style={{ height: '650px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Second Slide Label</h3>
            <p>Creating memorable moments for every occasion.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={xc}
            alt="Third slide"
            style={{ height: '650px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Third Slide Label</h3>
            <p>Seamlessly tailored experiences for all events.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Events Weddora Content - Center */}
      <Container className="text-center mt-5 p-5 bg-light rounded">
        <h1 className="display-4">Events Weddora</h1>
        <p className="lead">We bring your dream events to life!</p>
        <div className="d-flex justify-content-center mb-4">
          <img
            src={sa}
            alt="Event Weddora"
            className="rounded-circle"
            style={{
              height: '180px',
              width: '180px',
              border: '4px solid #6c5ce7',
              objectFit: 'cover',
            }}
          />
        </div>
        <Link to="/event_detail">
          <Button
            style={{
              fontSize: '20px',
              padding: '12px 36px',
              borderRadius: '30px',
              background: 'linear-gradient(to right, #ff7675, #6c5ce7)',
              border: 'none',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transform: 'perspective(1px) translateZ(0)',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Plan Your Event
          </Button>
        </Link>
      </Container>

      {/* Event Spectrum Section with Enhanced Variety */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">Event Spectrum</h2>
        <Carousel indicators={false} controls={true}>
          <Carousel.Item>
            <Row className="text-center">
              {[
                { img: fg, title: 'Wedding Stages', desc: 'Elegant and captivating wedding stage setups tailored to your theme.', link: '/wedding-gallery' },
                { img: gh, title: 'Corporate Events', desc: 'Professional, well-organized events for businesses and enterprises.', link: '/corporate-gallery' },
                { img: jh, title: 'Birthday Parties', desc: 'Fun, vibrant, and memorable birthday parties for all ages.', link: '/birthday-gallery' },
              ].map((item, index) => (
                <Col md={4} key={index}>
                  <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="hexagon">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <h5 className="mt-3">{item.title}</h5>
                    <p>{item.desc}</p>
                  </Link>
                </Col>
              ))}
            </Row>
          </Carousel.Item>

          <Carousel.Item>
            <Row className="text-center">
              {[
                { img: ry, title: 'Concerts', desc: 'Live concerts with exceptional sound and lighting for an unforgettable experience.', link: '/concert-gallery' },
                { img: sa, title: 'Workshops', desc: 'Interactive and engaging workshop sessions for skill enhancement.', link: '/workshop-gallery' },
                { img: xc, title: 'Anniversary Celebrations', desc: 'Special anniversary events tailored for memorable experiences.', link: '/anniversary-gallery' },
              ].map((item, index) => (
                <Col md={4} key={index}>
                  <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="hexagon">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <h5 className="mt-3">{item.title}</h5>
                    <p>{item.desc}</p>
                  </Link>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* CSS for Hexagon Shape with Responsive Adjustments */}
      <style jsx>{`
        .hexagon {
          position: relative;
          width: 450px;
          height: 250px;
          background-color: #6c5ce7;
          margin: 0 auto;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .hexagon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          clip-path: inherit;
          transition: opacity 0.3s ease;
        }

        .hexagon:hover {
          transform: scale(1.05);
          box-shadow: 0px 8px 15px rgba(108, 92, 231, 0.4);
        }

        /* Responsive Adjustments for Hexagon Size */
        @media (max-width: 768px) {
          .hexagon {
            width: 120px;
            height: 120px;
          }
        }

        @media (max-width: 576px) {
          .hexagon {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default CarouselComponent;
