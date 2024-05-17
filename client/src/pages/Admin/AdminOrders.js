import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../services/paymentService";
import OrderItem from "../../components/Profile/OrderItem";


export default function AdminOrder() {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPayments();
        setPayments(response.data);
        console.log(response.data);
      } catch (error) {
        setPayments([]);
      }
    };
    fetchData();
  }, []);
  return (
    <div style={{ padding: "1rem", maxHeight: "60vh", overflowY: "auto" }}>
      {payments.length !== 0 ? (
        payments.map((payment) => <OrderItem payment={payment} />)
      ) : (
        <div
          style={{
            fontSize: "1.7rem",
            justifyContent: "center",
            display: "flex",
          }}
        >
          No orders placed yet.
        </div>
      )}
    </div>
  );
}
