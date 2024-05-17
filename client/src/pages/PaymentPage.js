import React, { useEffect, useState } from "react";
import PaymentForm from "../components/Payment/PaymentForm2";
import OrderSummary from "../components/Payment/OrderSummary";
import Layout from "../components/Layout/Layout";

export default function PaymentPage() {
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let tot = 0;
        let rowsArr = [];
        JSON.parse(window.localStorage.getItem("cart")).forEach(
          (cartItem) => {
            tot = tot + cartItem.price;
            rowsArr.push(
              createData(cartItem.name, cartItem.description, cartItem.price)
            );
          }
        );
        setTotal(tot);
        setRows(rowsArr);
      } catch (error) {
      } finally {
      }
    };
    fetchData();
  }, []);
  function createData(itemName, qty, total) {
    return { itemName, qty, total };
  }
  return (
    <Layout>
      <div style={{padding:'2rem', marginTop:'8vh'}}>
        <div style={{ display: "flex" }}>
          <div
            style={{ flex: 1, backgroundColor: "white" }}
            className="InputData"
          >
            <PaymentForm />
          </div>
          <div style={{ width: "2rem" }}></div>
          <div
            style={{ flex: 1, backgroundColor: "white" }}
            className="OrderDetails"
          >
            <OrderSummary total={total} rows={rows} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
