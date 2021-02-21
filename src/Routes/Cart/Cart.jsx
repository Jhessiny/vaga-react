import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./Cart.css";
import CartItems from "../../components/CartItems/CartItems";
import CartAside from "../../components/CartAside/CartAside";
import Checkout from "../../components/CheckOutModal/Checkout";

const Cart = ({ cartItems, cleanCart, removeFromCart, setNewAmount }) => {
  const [totalPriceWithFrete, setTotalPriceWithFrete] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cep, setCep] = useState(null);
  const [frete, setFrete] = useState(0);
  const [cepMessage, setCepMessage] = useState("");
  const cepInput = useRef("");
  const [user, setUser] = useState(true);
  const [isOrdering, setisOrdering] = useState(false);

  const modalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
    },
  };

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
    if (cepSearch.length > 8 || cepSearch.length < 8) {
      setCepMessage("Cep invalido");
      setFrete(0);
      return;
    }
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

  const handleOrder = () => {
    if (!user) {
      alert("You need to login");
      return;
    }
    setisOrdering(true);
  };

  const closeOrder = () => {
    setisOrdering(false);
  };

  return (
    <div className="cart">
      <CartItems
        cartItems={cartItems}
        cleanCart={cleanCart}
        setNewAmount={setNewAmount}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
      />
      <CartAside
        totalPrice={totalPrice}
        totalPriceWithFrete={totalPriceWithFrete}
        cepMessage={cepMessage}
        handleCep={handleCep}
        cep={cep}
        cepInput={cepInput}
        setCep={setCep}
        handleOrder={handleOrder}
      />
      {isOrdering && (
        <Modal isOpen={true} style={modalCustomStyles}>
          <Checkout
            orderItems={cartItems}
            closeOrder={closeOrder}
            finalPrice={totalPriceWithFrete}
          />
        </Modal>
      )}
    </div>
  );
};

export default Cart;
