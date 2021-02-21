import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { products } from "./data.json";
import { Route, Switch } from "react-router";
import Shop from "./Routes/Shop";
import ProductPage from "./Routes/ProductPage/ProductPage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { useState } from "react";
import Cart from "./Routes/Cart/Cart.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const newItems = [...cartItems];
    let alreadyExists = false;
    newItems.forEach((item) => {
      if (item.product_id == product.product_id) {
        item.amount += 1;
        alreadyExists = true;
      }
    });
    if (!alreadyExists) {
      let newItem = { ...product, amount: 1 };
      newItems.push(newItem);
    }
    setCartItems(newItems);
  };

  const removeFromCart = (itemId) => {
    const newItems = [...cartItems];
    const filteredItems = newItems.filter((item) => item.product_id !== itemId);

    setCartItems(filteredItems);
  };

  const cleanCart = () => {
    setCartItems([]);
  };

  const setNewAmount = (e, product) => {
    const newItems = [...cartItems];
    newItems.forEach((item) => {
      if (item.product_id == product.product_id) {
        product.amount = e.target.value;
      }
    });
    setCartItems(newItems);
    if (product.amount <= 0) {
      removeFromCart(product.product_id);
    }
  };

  return (
    <div className="App">
      <Header cartItemsAmount={cartItems.length} />
      <main>
        <Switch>
          <Route
            path="/shop"
            render={() => <Shop products={products} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            render={() => (
              <Cart
                cartItems={cartItems}
                cleanCart={cleanCart}
                removeFromCart={removeFromCart}
                setNewAmount={setNewAmount}
              />
            )}
          />
          <Route
            path="/:id"
            render={() => <ProductPage addToCart={addToCart} />}
          />
        </Switch>
      </main>

      <Footer />
    </div>
  );
}

export default App;
