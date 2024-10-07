import React from 'react';

function CartPage() {
  // Example cart items with specific sections selected
  const cartItems = [
    {
      id: 1,
      service: "Event Planning",
      section: "Wedding",
      price: 1200,
      quantity: 1,
    },
    {
      id: 2,
      service: "Venue Booking",
      section: "Conference Hall",
      price: 2000,
      quantity: 1,
    },
    {
      id: 3,
      service: "Catering Services",
      section: "Corporate Event",
      price: 1500,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      
      <div className="row">
        <div className="col-md-8">
          {/* Cart Items List */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Selected Services</h5>
              <ul className="list-group list-group-flush">
                {cartItems.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6>{item.service}</h6>
                      <p>Section: {item.section}</p>
                      <p>Price: ${item.price} x {item.quantity}</p>
                    </div>
                    <div>
                      <button className="btn btn-danger btn-sm">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <p className="card-text"><strong>Subtotal:</strong> ${subtotal}</p>
              <p className="card-text"><strong>Total:</strong> ${subtotal}</p>
              <a href="/checkout" className="btn btn-primary btn-block">Proceed to Checkout</a>
              <a href="/services" className="btn btn-secondary btn-block mt-2">Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
