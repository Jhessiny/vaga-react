import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = ({ cartItems, cleanCart, removeToCart, setNewAmount }) => {
  const [totalPriceWithFrete, setTotalPriceWithFrete] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cep, setCep] = useState(null);
  const [frete, setFrete] = useState(0);
  const [cepMessage, setCepMessage] = useState("");
  const cepInput = useRef("");

  useEffect(() => {
    const total = cartItems.reduce((a, c) => a + c.price * c.amount, 0);
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    setTotalPriceWithFrete(parseFloat(totalPrice) + parseFloat(frete));
  }, [totalPrice, frete]);

  const handleCep = (e) => {
    console.log("handling cep");
    e.preventDefault();
    const cepSearch = cepInput.current.value;
    setCep(cepSearch);
    const cepUrl = "http://localhost:5000/cart/" + cepSearch;
    axios.get(cepUrl).then((data) => {
      console.log(data.data);
      if (data.data[0]) {
        setCepMessage(
          `O prazo previsto é de ${data.data[0].PrazoEntrega} dia(s) útil(eis). Valor estimado de R$ ${data.data[0].Valor}.`
        );
        setFrete(data.data[0].Valor);
      } else {
        setCepMessage("Cep invalido");
        setFrete(0);
      }
    });
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items__top">
          <h2>Carrinho de Compras</h2>
          {cartItems.length > 0 && (
            <button className="btn btn-light" onClick={cleanCart}>
              Limpar Carrinho
            </button>
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
                      <input
                        className="cart-item__card__amount"
                        type="number"
                        value={item.amount}
                        onChange={(e) => setNewAmount(e, item)}
                      />
                    </p>
                    <button
                      onClick={() => removeToCart(item.product_id)}
                      className="btn btn-secondary"
                    >
                      Remover
                    </button>
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
        <p>
          Subtotal: R${totalPrice.toFixed(2)} (R$
          {totalPriceWithFrete.toFixed(2)} com frete)
        </p>
        <p className="cart__aside__cep-message">{cepMessage}</p>
        <form onSubmit={handleCep}>
          <input
            value={cep}
            ref={cepInput}
            onChange={(e) => setCep(e.target.value)}
          />
          <button className="btn btn-secondary">CalcularFrete</button>
        </form>
        <button className="btn btn-primary disabled">Fazer Pedido</button>
      </div>
    </div>
  );
};

export default Cart;
