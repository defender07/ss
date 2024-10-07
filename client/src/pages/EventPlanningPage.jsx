import React, { useState } from 'react';

function EventPlanningPage({ addToCart }) {
  const [selectedSection, setSelectedSection] = useState("");

  const handleAddToCart = () => {
    if (selectedSection) {
      addToCart({
        id: new Date().getTime(), // unique id
        service: "Event Planning",
        section: selectedSection,
        price: 1200, // this could vary depending on the section
        quantity: 1,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Event Planning</h2>
      <div className="list-group">
        <button
          className={`list-group-item list-group-item-action ${selectedSection === "Wedding" ? "active" : ""}`}
          onClick={() => setSelectedSection("Wedding")}
        >
          Wedding
        </button>
        <button
          className={`list-group-item list-group-item-action ${selectedSection === "Conference" ? "active" : ""}`}
          onClick={() => setSelectedSection("Conference")}
        >
          Conference
        </button>
        <button
          className={`list-group-item list-group-item-action ${selectedSection === "Other Events" ? "active" : ""}`}
          onClick={() => setSelectedSection("Other Events")}
        >
          Other Events
        </button>
      </div>
      <button className="btn btn-primary mt-4" onClick={handleAddToCart} disabled={!selectedSection}>
        Add to Cart
      </button>
    </div>
  );
}

export default EventPlanningPage;
