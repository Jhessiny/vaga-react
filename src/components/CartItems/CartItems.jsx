const Cartitems = ({
  cartItems,
  cleanCart,
  setNewAmount,
  removeFromCart,
  totalPrice,
}) => {
  return (
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
                    onClick={() => removeFromCart(item.product_id)}
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

      <p className="cart-item__card__total-price">R${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default Cartitems;
