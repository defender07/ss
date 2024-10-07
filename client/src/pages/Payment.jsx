import React from 'react';

function PaymentPage() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment</h2>

      <div className="row">
        {/* Payment Form Section */}
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input type="text" className="form-control" id="cardNumber" placeholder="Enter card number" />
            </div>

            <div className="mb-3">
              <label htmlFor="cardHolderName" className="form-label">Cardholder Name</label>
              <input type="text" className="form-control" id="cardHolderName" placeholder="Enter cardholder name" />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input type="password" className="form-control" id="cvv" placeholder="CVV" />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              Order Summary
            </div>
            <div className="card-body">
              <p>Event: <strong>Your Event Name</strong></p>
              <p>Ticket(s): <strong>2 x $50.00</strong></p>
              <hr />
              <h5>Total: <strong>$100.00</strong></h5>
              <div className="mb-3">
                <label htmlFor="promoCode" className="form-label">Promotional Code</label>
                <input type="text" className="form-control" id="promoCode" placeholder="Enter promo code" />
              </div>
              <button className="btn btn-primary w-100">Pay Now</button>
              <small className="text-muted d-block mt-2 text-center">Secure payment processing</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
