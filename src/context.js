import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

// Provider
// Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  componentDidMount() {
    this.setProduct();
  }

  setProduct = () =>
    this.setState({
      products: storeProducts.map((product) => ({ ...product })),
    });

  getItem = (itemId) => this.state.products.find(({ id }) => id === itemId);

  handleDetail = (id) =>
    this.setState(() => ({ detailProduct: this.getItem(id) }));

  addToCart = (id) => {
    const tempArr = [...this.state.products];
    const product = tempArr[tempArr.indexOf(this.getItem(id))];
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    this.setState(
      () => ({
        products: tempArr,
        cart: [...this.state.cart, product],
      }),
      () => this.addTotals()
    );
  };

  openModal = (id) =>
    this.setState(() => ({ modalProduct: this.getItem(id), modalOpen: true }));

  closeModal = () => this.setState(() => ({ modalOpen: false }));

  incrementation = (productId) => {
    const cart = [...this.state.cart];
    const product = cart.find(({ id }) => id === productId);
    product.count++;
    product.total = product.count * product.price;

    this.setState(
      () => ({ cart }),
      () => this.addTotals()
    );
  };

  decrement = (productId) => {
    const cart = [...this.state.cart];
    const product = cart.find(({ id }) => id === productId);
    product.count--;

    if (product.count === 0) {
      this.removeItem(productId);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => ({ cart }),
        () => this.addTotals()
      );
    }
  };

  removeItem = (productId) => {
    const cart = [...this.state.cart].filter(({ id }) => id !== productId);

    const products = [...this.state.products];
    const product = products.find(({ id }) => id === productId);
    product.inCart = false;
    product.count = 0;
    product.total = 0;

    this.setState(
      () => ({ cart, products }),
      () => this.addTotals()
    );
  };

  clearCart = () => {
    this.setState(
      () => ({ cart: [] }),
      () => {
        this.setProduct();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    const cartSubtotal = this.state.cart.reduce((s, e) => (s += e.total), 0);
    const cartTax = parseFloat((cartSubtotal * 0.1).toFixed(2));
    const cartTotal = cartSubtotal + cartTax;

    this.setState(() => ({ cartSubtotal, cartTax, cartTotal }));
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          incrementation: this.incrementation,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider };
