import { TableCell, TableRow } from '@mui/material';
import React from 'react'

export default function OrderItem({payment}) {
const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

    const item =(i)=>{
        return (
          <TableRow>
            <TableCell style={{ minWidth: "20vh" }}>
              <h6 style={{ fontWeight: "bold" }}>{i.name}</h6>
            </TableCell>
            <TableCell style={{ minWidth: "60vh" }}>
              <h6>{i.description}</h6>
            </TableCell>
            <TableCell>
              <h6>
                {i.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h6>
            </TableCell>
          </TableRow>
        );
    }


  return (
    <div
      style={{
        border: "1px solid",
        borderRadius: "10px",
        padding: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div>
        <div>Order #{payment._id}</div>
        <div>
          Placed on{" "}
          {new Date(payment.dateTime).toLocaleDateString("en-GB", options)}
        </div>
        <hr />
      </div>
      <div style={{padding: "1rem" }}>
        {payment.items.map((i) => item(i))}
      </div>
    </div>
  );
}
