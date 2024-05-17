import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCart } from "../../context/cart";

export default function OrderSummary({total,rows}) {
  return (
    <div style={{ padding: "1rem" }}>
      <h4>Order Summary</h4>
      <div style={{ marginTop: "2rem" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h5>Item Name</h5>
                </TableCell>
                <TableCell>
                  <h5>Description</h5>
                </TableCell>
                <TableCell align="right">
                  <h5>Description</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <h6>{row.itemName}</h6>
                  </TableCell>
                  <TableCell>
                    <h6>{row.qty}</h6>
                  </TableCell>
                  <TableCell align="right">
                    <h6>
                      {row.total.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h6>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          paddingTop: "3rem",
        }}
      >
        <h6>Subtotal</h6>
        <div>
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          paddingTop: "0rem",
        }}
      >
        <h6>Shipping</h6>
        <div>$3.00</div>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h4>Total Cost</h4>
        <h5>
          {(total + 3).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h5>
      </div>
      <hr />
    </div>
  );
}
