import React from 'react'
import toast from 'react-hot-toast';
import { useCart } from '../../context/cart';

const ItemCard = ({item}) => {
  const p = item;
  const [cart, setCart] = useCart();
  return (
    <div>
      <div className="card m-2">
        <img
          style={{ maxHeight: "40vh", minHeight: "40vh" }}
          src={`/api/v1/product/product-photo/${p._id}`}
          className="card-img-top"
          alt={p.name}
        />
        <div className="card-body">
          <div className="card-name-price">
            <h5 className="card-title">{p.name}</h5>
            <h5 className="card-title card-price">
              {p.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h5>
          </div>
          <p className="card-text ">{p.description.substring(0, 20)}...</p>
          <div className="card-name-price">
            <button
              className="btn btn-info ms-1"
              onClick={() => (window.location = `/product/${p.slug}`)}
            >
              More Details
            </button>
            <button
              className="btn btn-dark ms-1"
              onClick={() => {
                setCart([...cart, p]);
                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                toast.success("Item Added to cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard