import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import concert1 from '../assets/t4.jpg';
import concert2 from '../assets/t1.png';
import concert3 from '../assets/t3.jpg';
import concert4 from '../assets/t5.jpg';
import concert5 from '../assets/lo.jpeg';
import concert6 from '../assets/kk.jpeg';

const ConcertGallery = () => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleCardClick = (index) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 1000); // Reset animation after 1 second
  };

  const concertImages = [
    { img: concert1, title: 'Live Band Performance', description: 'An electrifying performance by a popular band.' },
    { img: concert2, title: 'Outdoor Music Festival', description: 'A vibrant outdoor music festival with thousands of attendees.' },
    { img: concert3, title: 'Rock Concert', description: 'An intense rock concert with dynamic stage effects.' },
    { img: concert4, title: 'Classical Music Night', description: 'A soothing evening of classical music.' },
    { img: concert5, title: 'Pop Concert', description: 'A colorful pop concert with famous artists.' },
    { img: concert6, title: 'Jazz Ensemble', description: 'A soulful jazz night with talented musicians.' },
  ];

  const animationStyle = {
    animation: 'spin3D 1s ease-in-out',
    transformStyle: 'preserve-3d',
  };

  const keyframesStyle = `
    @keyframes spin3D {
      0% { transform: rotateY(0deg); }
      50% { transform: rotateY(180deg); }
      100% { transform: rotateY(360deg); }
    }
  `;

  return (
    <div>
      {/* Inline <style> tag to include keyframes */}
      <style>{keyframesStyle}</style>

      <Container className="mt-5">
        <h2 className="text-center mb-4">Concert Gallery</h2>
        <Row>
          {concertImages.map((concert, index) => (
            <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
              <Card
                className="shadow-sm h-100"
                style={clickedIndex === index ? animationStyle : {}}
                onClick={() => handleCardClick(index)}
              >
                <Card.Img
                  variant="top"
                  src={concert.img}
                  alt={concert.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{concert.title}</Card.Title>
                  <Card.Text>{concert.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ConcertGallery;
