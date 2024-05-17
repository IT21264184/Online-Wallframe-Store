import React, { useEffect, useState } from 'react'
import OrderItem from './OrderItem'
import { getAllUserPayments } from '../../services/paymentService';
import { useAuth } from '../../context/auth';

export default function OrdersList() {
  const[payments, setPayments]= useState([])
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUserPayments(auth.user._id);
        setPayments(response.data);
        console.log(response.data);
      } catch (error) {
        setPayments([]);
      }
    };
    fetchData();
  }, [auth.user._id]);
  return (
    <div style={{padding: "1rem" , maxHeight:"60vh", overflowY:'auto'}}>
      {payments.length !== 0 ? payments.map((payment)=>(
        <OrderItem payment={payment} />
      )):<div style={{fontSize:'1.7rem', justifyContent:"center", display:'flex'}} >No orders placed yet.</div>}
    </div>
  );
}
