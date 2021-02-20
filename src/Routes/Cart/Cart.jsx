import { useEffect } from "react";
import { useState } from "react";
import "./Cart.css";

const Cart = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((a, c) => a + c.price * c.amount, 0);
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items__top">
          <h2>Carrinho de Compras</h2>
          {cartItems.length > 0 && (
            <button className="btn btn-light">Limpar Carrinho</button>
          )}
        </div>
        {cartItems.length > 0 ? (
          <>
            <p>{cartItems.length} items</p>
            {cartItems.map((item) => (
              <div className="cart-item__card">
                <div className="cart-item__left">
                  <img className="cart-item__image" src={item.img} alt="" />
                  <div className="cart-item__card-details">
                    <p className="cart-item__card__title ">{item.title}</p>
                    <p>
                      Amount:
                      <select name="amount" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </p>
                    <button className="btn btn-secondary">Remover</button>
                  </div>
                </div>
                <div className="cart-item__card__price">
                  <p>R${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}

        <p className="cart-item__card__total-price">
          R${totalPrice.toFixed(2)}
        </p>
      </div>
      <div className="cart__aside">
        <p>Subtotal: R${totalPrice.toFixed(2)}</p>
        <p>Frete: </p>{" "}
        <button className="btn btn-secondary">CalcularFrete</button>
        <button className="btn btn-primary disabled">Fazer Pedido</button>
      </div>
    </div>
  );
};

export default Cart;
