import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ry from '../assets/tu.jpeg';
import sa from '../assets/t4.jpg';
import xc from '../assets/t5.jpg';
import fg from '../assets/we.jpeg'; // Event Spectrum Images
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
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Events Weddora Content - Center */}
      <Container className="text-center mt-5">
        <h1>Events Weddora</h1>
        <p>We make your events memorable and magical!</p>
        <div className="d-flex justify-content-center mb-3">
          <img
            src={sa} // Replace 'sa' with the appropriate image asset for the center content.
            alt="Event Weddora"
            className="rounded-circle"
            style={{
              height: '200px',
              width: '200px',
              border: '5px solid #f39c12',
              objectFit: 'cover',
            }}
          />
        </div>
        <Link to="/event_detail">
          <Button
            style={{
              fontSize: '20px',
              padding: '10px 30px',
              borderRadius: '50px',
              backgroundColor: '#f39c12',
              border: 'none',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
              transform: 'perspective(1px) translateZ(0)',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Event Planning
          </Button>
        </Link>
      </Container>

      {/* Event Spectrum Section with Hexagon Shape and Carousel */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">EVENT SPECTRUM</h2>
        <Carousel>
          <Carousel.Item>
            <Row className="text-center">
              <Col md={4}>
                <div className="hexagon">
                  <div className="hexagon-in1">
                    <div className="hexagon-in2">
                      <img src={fg} alt="Wedding Stages" />
                    </div>
                  </div>
                </div>
                <h5 className="mt-2">Wedding Stages</h5>
                <p>Short description of Wedding Stages.</p>
              </Col>
              <Col md={4}>
                <div className="hexagon">
                  <div className="hexagon-in1">
                    <div className="hexagon-in2">
                      <img src={gh} alt="Service 2" />
                    </div>
                  </div>
                </div>
                <h5 className="mt-2">Service 2</h5>
                <p>Short description of Service 2.</p>
              </Col>
              <Col md={4}>
                <div className="hexagon">
                  <div className="hexagon-in1">
                    <div className="hexagon-in2">
                      <img src={jh} alt="Birthday Parties" />
                    </div>
                  </div>
                </div>
                <h5 className="mt-2">Birthday Parties</h5>
                <p>Short description of Birthday Parties.</p>
              </Col>
            </Row>
          </Carousel.Item>

          <Carousel.Item>
            <Row className="text-center">
              <Col md={4}>
                <div className="hexagon">
                  <div className="hexagon-in1">
                    <div className="hexagon-in2">
                      <img src={sa} alt="Corporate Events" />
                    </div>
                  </div>
                </div>
                <h5 className="mt-2">Corporate Events</h5>
                <p>Short description of Corporate Events.</p>
              </Col>
              <Col md={4}>
                <div className="hexagon">
                  <div className="hexagon-in1">
                    <div className="hexagon-in2">
                      <img src={xc} alt="Music Shows" />
                    </div>
                  </div>
                </div>
                <h5 className="mt-2">Music Shows</h5>
                <p>Short description of Music Shows.</p>
              </Col>
              <Col md={4}>
                <div className="hexagon">
                  <div className="hexagon-in1">
                    <div className="hexagon-in2">
                      <img src={ry} alt="Cultural Festivals" />
                    </div>
                  </div>
                </div>
                <h5 className="mt-2">Cultural Festivals</h5>
                <p>Short description of Cultural Festivals.</p>
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* CSS for Hexagon Shape */}
      <style jsx>{`
        .hexagon {
          position: relative;
          width: 500px;
          height: 200px;
          background-color: #3498db;
          margin: 0 auto;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        .hexagon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          clip-path: inherit;
        }

        .hexagon-in1,
        .hexagon-in2 {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .hexagon-in1 {
          top: 0;
          left: 0;
          z-index: 1;
          background-color: inherit;
          clip-path: inherit;
        }

        .hexagon-in2 {
          top: 0;
          left: 0;
          z-index: 2;
          background-color: inherit;
          clip-path: inherit;
        }
      `}</style>
    </div>
  );
};

export default CarouselComponent;
