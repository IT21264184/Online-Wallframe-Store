import React from "react";

import { Button } from "@mui/material";
export default function CartItem({
  cartItem,
  onRemove,
}) {
  return (
    <div
      style={{
        border: "1px solid #C7C9CE",
        marginBottom: "1rem",
        display: "flex",
        maxHeight: "15vh",
        maxWidth: "80%",
        borderRadius: "20px",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "3rem" }}>
          <img
            src={`/api/v1/product/product-photo/${cartItem._id}`}
            className="card-img-top"
            alt={"p.name"}
            style={{
              minWidth: "13vh",
              maxHeight: "11vh",
              borderRadius: "20px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>
            <h5 style={{ marginBottom: "1rem" }}>{cartItem.name}</h5>
            <span style={{ fontSize: "18px" }}>{cartItem.description}</span>
            <br />

            <span style={{ fontSize: "18px" }}>
              {cartItem.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginRight: "2rem",
        }}
      >
        {/* <button
          className="btn btn-danger"
          // onClick={() => removeCartItem(p._id)}
        >
          Remove
        </button> */}
        <Button variant="contained" color="error" onClick={()=>onRemove(cartItem._id)} >
          remove
        </Button>
      </div>
    </div>
    // <div
    //   style={{
    //     padding: "1rem",
    //     backgroundColor: "white",
    //     display: "flex",
    //     marginBottom: "1rem",
    //   }}
    // >
    //   <div className="Image" style={{ flex: 1 }}>
    //     <img
    //       src={`/images/${cartItem.imageName}`}
    //       alt=""
    //       width="90%"
    //       height="100%"
    //     />
    //   </div>
    //   <div
    //     className="Details"
    //     style={{
    //       flex: 2,
    //       paddingLeft: "2rem",
    //       alignContent: "center",
    //     }}
    //   >
    //     <div>
    //       <h5 style={{ marginBottom: "1rem", marginTop: "3rem" }}>
    //         {cartItem.title}
    //       </h5>
    //       <span style={{ fontSize: "18px" }}>Size : {cartItem.size} </span>
    //       <br />

    //       <span style={{ fontSize: "18px" }}>
    //         Rs {cartItem.price}.00 x {cartItem.qty} ={" "}
    //       </span>
    //       <span style={{ fontSize: "18px", fontWeight: "bold" }}>
    //         Rs {cartItem.price * cartItem.qty}.00{" "}
    //       </span>
    //     </div>
    //   </div>
    //   <div
    //     className="Buttons"
    //     style={{
    //       flex: 1,
    //       paddingLeft: "6rem",
    //       flexDirection: "column",
    //       display: "flex",
    //       justifyContent: "flex-end",
    //     }}
    //   >
    //     <div style={{ flex: 3, alignSelf: "flex-end" }}>
    //       <Button
    //       onClick={()=>{
    //         onRemove(cartItem.itemId);
    //       }}
    //         style={{ fontSize: "22px", color: "black", fontWeight: "bold" }}
    //       >
    //         X
    //       </Button>
    //     </div>
    //     <div style={{ flex: 1, alignSelf: "flex-end" }}>
    //       <Button
    //         onClick={() => onIncrease(cartItem.itemId)}
    //         size="small"
    //         style={{
    //           marginRight: "1rem",
    //           fontSize: "22px",
    //           color: "blue",
    //           fontWeight: "bold",
    //         }}
    //         variant="outlined"
    //       >
    //         +
    //       </Button>
    //       <Button
    //         onClick={() => onDecrease(cartItem.itemId)}
    //         size="small"
    //         style={{
    //           fontSize: "22px",
    //           color: "red",
    //           fontWeight: "bold",
    //         }}
    //         variant="outlined"
    //       >
    //         -
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}
