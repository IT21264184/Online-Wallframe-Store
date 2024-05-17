import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button } from "@mui/material";
import { createNewPayment } from "../../services/paymentService";

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "bankDeposit",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    nameOnCard: "",
  });
  const [auth, setAuth] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (event) => {
    setFormData({ ...formData, paymentMethod: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let items = [];
    JSON.parse(window.localStorage.getItem("cart")).forEach((i) => {
      items.push({
        name: i.name,
        description: i.description,
        price: i.price,
      });
    });
    const order = { ...formData, items: items, userId: auth.user._id };

    await createNewPayment(order)
      .then(() => {
        window.location = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="form-content" style={{ padding: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <div className="Delivery" style={{ marginBottom: "1rem" }}>
          <h4>Delivery</h4>
          <TextField
            id="country"
            name="country"
            label="Country/Region"
            variant="filled"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.country}
            onChange={handleInputChange}
          />
          <div style={{ display: "flex" }}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              variant="filled"
              style={{
                width: "100%",
                marginRight: "1rem",
                marginBottom: "1rem",
              }}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="filled"
              style={{ width: "100%", marginBottom: "1rem" }}
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <TextField
            id="filled-basic"
            label="Address"
            name="address"
            variant="filled"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.address}
            onChange={handleInputChange}
          />
          <TextField
            id="filled-basic"
            label="Apartment, Suit, etc. (Optional)"
            name="apartment"
            variant="filled"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.apartment}
            onChange={handleInputChange}
          />
          <div style={{ display: "flex" }}>
            <TextField
              id="filled-basic"
              label="City"
              name="city"
              variant="filled"
              style={{
                width: "100%",
                marginRight: "1rem",
                marginBottom: "1rem",
              }}
              value={formData.city}
              onChange={handleInputChange}
            />
            <TextField
              id="filled-basic"
              label="Postal Code"
              name="postalCode"
              variant="filled"
              style={{ width: "100%", marginBottom: "1rem" }}
              value={formData.postalCode}
              onChange={handleInputChange}
            />
          </div>
          <TextField
            id="filled-basic"
            label="Phone"
            variant="filled"
            name="phone"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="Payment" style={{ marginBottom: "1rem" }}>
          <h4>Payment</h4>
          <RadioGroup
            aria-labelledby="payment-method-group-label"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <FormControlLabel
              value="creditCard"
              control={<Radio />}
              label="Credit Card"
            />
            {formData.paymentMethod === "creditCard" && (
              <div>
                <TextField
                  id="cardNumber"
                  name="cardNumber"
                  label="Card Number"
                  variant="filled"
                  style={{ width: "100%", marginBottom: "1rem" }}
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                />
                <div style={{ display: "flex" }}>
                  <TextField
                    id="expirationDate"
                    name="expirationDate"
                    label="Expiration Date (MM/YY)"
                    variant="filled"
                    style={{
                      width: "100%",
                      marginRight: "1rem",
                      marginBottom: "1rem",
                    }}
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="securityCode"
                    name="securityCode"
                    label="Security Code"
                    variant="filled"
                    style={{
                      width: "100%",
                      marginBottom: "1rem",
                      marginRight: "1rem",
                    }}
                    value={formData.securityCode}
                    onChange={handleInputChange}
                  />
                </div>
                <TextField
                  id="nameOnCard"
                  name="nameOnCard"
                  label="Name on Card"
                  variant="filled"
                  style={{ width: "100%", marginBottom: "1rem" }}
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <FormControlLabel
              value="cashOnDelivery"
              control={<Radio />}
              label="Cash on Delivery (COD)"
            />
            <FormControlLabel
              value="bankDeposit"
              control={<Radio />}
              label="Bank Deposit"
            />
          </RadioGroup>
        </div>
        <div>
          <Button
            type="submit"
            style={{
              width: "100%",
              height: "3rem",
              fontSize: "18px",
              backgroundColor: "black",
            }}
            variant="contained"
          >
            Pay Now
          </Button>
        </div>
      </form>
    </div>
  );
}
