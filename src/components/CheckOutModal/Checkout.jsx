import { useState } from "react";
import "./Checkout.css";

const Checkout = ({ orderItems, closeOrder, finalPrice }) => {
  const [formSection, setFormSection] = useState("user-data");

  const handleOrder = () => {
    setFormSection("order-sent");
  };

  return (
    <div className="checkout">
      <div className="checkout-left">
        <button onClick={closeOrder} className="checkout__close-modal ">
          x
        </button>
      </div>
      {formSection == "user-data" ? (
        <div className="confirming-data">
          <h1>Confirme seus dados</h1>
          <div className="checkout__user-data">
            <h2>Dados do destinatário</h2>
            <p>Nome: Jhéssiny Mattos</p>
            <p>Email: jhessinymattos@gmail.com</p>
            <div className="checkout__address">
              <h3>Endereço de entrega:</h3>
              <p>Cep: 81.110-522</p>
              <p>Rua Louthario Boltin, 220, Spazio Consenza</p>
              <p>Curitiba/PR - Brasil</p>
            </div>
          </div>
          <div className="checkout__credit-card-form">
            <h2>Dados de cobrança</h2>
            <form action="">
              <div className="checkout__input-box">
                <label htmlFor="">Nome no cartão</label>
                <input type="text" name="" id="" />
              </div>
              <div className="checkout__input-box">
                <label htmlFor="">Número do cartão</label>
                <input type="number" name="" id="" />
              </div>
              <div className="checkout__input-box">
                <label htmlFor="">Data de expiração</label>
                <input type="text" name="" id="" />
              </div>
              <div className="checkout__input-box">
                <label htmlFor="">CVV</label>
                <input type="number" name="" id="" />
              </div>
              <div className="checkout-left">
                <button
                  onClick={() => setFormSection("order-summary")}
                  className="btn btn-primary"
                >
                  Próximo
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : formSection == "order-summary" ? (
        <div className="order-summary">
          <h1> Resumo do pedido</h1>
          <div className="order-summary__list">
            {orderItems.map((item) => (
              <div className="order-summary__item">
                <p>{item.title}</p>
                <p>
                  {item.amount} x R$ {item.price}
                </p>
              </div>
            ))}
          </div>
          <p className="order-summary__total-price">
            total {finalPrice.toFixed(2)}
          </p>
          <div className="checkout-left">
            <button
              onClick={() => setFormSection("user-data")}
              className="btn btn-primary"
            >
              Voltar
            </button>
            <button onClick={handleOrder} className="btn btn-primary">
              Finalizar
            </button>
          </div>
        </div>
      ) : (
        <div className="order-sent">
          <h1>Pedido Enviado Com Sucesso!!</h1>
          <p>Acompanhe o status do seu pedido em Perfil {">"} Meus pedidos</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
