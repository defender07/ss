import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import wedding1 from '../assets/cx.jpeg';
import wedding2 from '../assets/pp.jpeg';
import wedding3 from '../assets/lo.jpeg';
import wedding4 from '../assets/kk.jpeg';
import wedding5 from '../assets/jj.jpeg';
import wedding6 from '../assets/we.jpeg';

const WeddingStageGallery = () => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleCardClick = (index) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 1000); // Reset animation after 1 second
  };

  const weddingImages = [
    { img: wedding1, title: 'Elegant Floral Stage', description: 'A stage decorated with exquisite floral arrangements.' },
    { img: wedding2, title: 'Royal Themed Stage', description: 'A grand royal stage setup with luxurious decor.' },
    { img: wedding3, title: 'Modern Minimalist Stage', description: 'A contemporary stage with a minimalist design.' },
    { img: wedding4, title: 'Traditional Stage', description: 'A beautiful stage that embodies traditional aesthetics.' },
    { img: wedding5, title: 'Outdoor Wedding Stage', description: 'A scenic outdoor stage setup with natural elements.' },
    { img: wedding6, title: 'Vintage Themed Stage', description: 'A charming vintage stage perfect for nostalgic themes.' },
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
        <h2 className="text-center mb-4">Wedding Stage Gallery</h2>
        <Row>
          {weddingImages.map((wedding, index) => (
            <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
              <Card
                className="shadow-sm h-100"
                style={clickedIndex === index ? animationStyle : {}}
                onClick={() => handleCardClick(index)}
              >
                <Card.Img
                  variant="top"
                  src={wedding.img}
                  alt={wedding.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{wedding.title}</Card.Title>
                  <Card.Text>{wedding.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default WeddingStageGallery;
