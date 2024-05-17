import React, { useEffect, useState } from "react";
import CartItemList from "../components/Cart/CartItemList";
import { Button } from "@mui/material";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";

export default function CartPage() {
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        className="Main"
        style={{
          display: "flex",
          minHeight: "68.5vh",
          marginTop: "10vh",
          padding: "2rem",
        }}
      >
        {cart.length !== 0 ? (
          <div className="CartItems" style={{ flex: 2 }}>
            <CartItemList
              cartItems={cart}
              onRemove={removeCartItem}
            />
          </div>
        ) : (
          <div style={{ flex: 2, fontSize: "25px" }}>
            <center>No Items in the Cart!</center>
          </div>
        )}
        <div style={{ width: "3rem" }}></div>
        <div className="CartSummary" style={{ flex: 1, border:'1px solid', padding:'2rem' }}>
          <div style={{ backgroundColor: "white", padding: "1rem" }}>
            <div>
              <h4>Cart Summary</h4>
            </div>
            <hr />
            <div>
              <h5>Total Price : {totalPrice()}</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                disabled={cart.length === 0}
                style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
                variant="contained"
                color="success"
                onClick={() => {
                  window.location = "/payment";
                }}
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
