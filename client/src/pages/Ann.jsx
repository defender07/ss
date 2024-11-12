import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import anniversary1 from '../assets/we.jpeg';
import anniversary2 from '../assets/cx.jpeg';
import anniversary3 from '../assets/kk.jpeg';
import anniversary4 from '../assets/br.jpeg';
import anniversary5 from '../assets/tq.jpeg';
import anniversary6 from '../assets/t2.png';

const AnniversaryGallery = () => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleCardClick = (index) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 1000); // Reset animation after 1 second
  };

  const anniversaryImages = [
    { img: anniversary1, title: 'Golden Anniversary', description: 'A celebration of love with golden decor and elegance.' },
    { img: anniversary2, title: 'Silver Anniversary', description: 'A beautiful silver-themed anniversary celebration.' },
    { img: anniversary3, title: 'Romantic Candlelit Anniversary', description: 'A cozy and romantic candlelit anniversary setup.' },
    { img: anniversary4, title: 'Vintage Anniversary Party', description: 'A charming vintage setup perfect for an anniversary.' },
    { img: anniversary5, title: 'Elegant Black and White Anniversary', description: 'A classy black and white anniversary celebration.' },
    { img: anniversary6, title: 'Outdoor Anniversary Celebration', description: 'A fresh outdoor setting for an unforgettable anniversary.' },
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
        <h2 className="text-center mb-4">Anniversary Gallery</h2>
        <Row>
          {anniversaryImages.map((anniversary, index) => (
            <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
              <Card
                className="shadow-sm h-100"
                style={clickedIndex === index ? animationStyle : {}}
                onClick={() => handleCardClick(index)}
              >
                <Card.Img
                  variant="top"
                  src={anniversary.img}
                  alt={anniversary.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{anniversary.title}</Card.Title>
                  <Card.Text>{anniversary.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AnniversaryGallery;
