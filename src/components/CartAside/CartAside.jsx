const CartAside = ({
  totalPrice,
  totalPriceWithFrete,
  cepMessage,
  handleCep,
  cep,
  cepInput,
  setCep,
  handleOrder,
}) => {
  return (
    <div className="cart__aside">
      <p>
        Subtotal: R${totalPrice.toFixed(2)}{" "}
        {totalPriceWithFrete > 0 && (
          <span>
            (R$
            {totalPriceWithFrete.toFixed(2)} com frete)
          </span>
        )}
      </p>

      {totalPrice > 0 ? (
        <p className="cart__aside__cep-message">{cepMessage}</p>
      ) : (
        <p className="cart__aside__cep-message">Carrinho vazio.</p>
      )}
      <form onSubmit={handleCep}>
        <input
          value={cep}
          ref={cepInput}
          onChange={(e) => setCep(e.target.value)}
        />
        <button disabled={totalPrice <= 0} className="btn btn-secondary">
          Calcular Frete
        </button>
      </form>
      <button
        onClick={handleOrder}
        className="btn btn-primary"
        disabled={totalPrice <= 0}
      >
        Fazer Pedido
      </button>
    </div>
  );
};

export default CartAside;
