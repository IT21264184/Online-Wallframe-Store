import CartItem from "./CartItem";

export default function CartItemList({ cartItems, onRemove }) {
  const a = [1,2,3]
  return (
    <div>
      {cartItems.map((cartItem) => (
        <CartItem
          cartItem={cartItem}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
