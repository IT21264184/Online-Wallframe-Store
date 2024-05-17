import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button } from "@mui/material";
import { createNewPayment } from "../../services/paymentService";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

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
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useAuth();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePaymentMethodChange = (event) => {
    setFormData({ ...formData, paymentMethod: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
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
          window.localStorage.removeItem("cart");
          toast.success("Payment Successful");
          setTimeout(() => {
            window.location = "/";
          }, 2000);
          
        })
        .catch((err) => console.log(err));
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    let errors = {};
    const requiredFields = [
      "country",
      "firstName",
      "lastName",
      "address",
      "city",
      "postalCode",
      "phone",
    ];
    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors[field] = "This field is required";
      }
    });
    if (data.paymentMethod === "creditCard") {
      const cardFields = [
        "cardNumber",
        "expirationDate",
        "securityCode",
        "nameOnCard",
      ];
      cardFields.forEach((field) => {
        if (!data[field]) {
          errors[field] = "This field is required";
        }
      });
    }
    return errors;
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
            error={!!errors.country}
            helperText={errors.country}
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
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="filled"
              style={{ width: "100%", marginBottom: "1rem" }}
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </div>
          <TextField
            id="address"
            label="Address"
            name="address"
            variant="filled"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            id="apartment"
            label="Apartment, Suit, etc. (Optional)"
            name="apartment"
            variant="filled"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.apartment}
            onChange={handleInputChange}
          />
          <div style={{ display: "flex" }}>
            <TextField
              id="city"
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
              error={!!errors.city}
              helperText={errors.city}
            />
            <TextField
              id="postalCode"
              label="Postal Code"
              name="postalCode"
              variant="filled"
              style={{ width: "100%", marginBottom: "1rem" }}
              value={formData.postalCode}
              onChange={handleInputChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
          </div>
          <TextField
            id="phone"
            label="Phone"
            variant="filled"
            name="phone"
            style={{ width: "100%", marginBottom: "1rem" }}
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
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
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
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
                    error={!!errors.expirationDate}
                    helperText={errors.expirationDate}
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
                    error={!!errors.securityCode}
                    helperText={errors.securityCode}
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
                  error={!!errors.nameOnCard}
                  helperText={errors.nameOnCard}
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
          {!!errors.paymentMethod && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              Please select a payment method.
            </div>
          )}
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
