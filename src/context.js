import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

// Provider
// Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: storeProducts,
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
    this.setState(() => ({
      products: tempArr,
      cart: [...this.state.cart, product],
    }));
  };

  openModal = (id) =>
    this.setState(() => ({ modalProduct: this.getItem(id), modalOpen: true }));

  closeModal = () => this.setState(() => ({ modalOpen: false }));

  incrementation = (id) => console.log("increment " + id);

  decrement = (id) => console.log("decrement " + id);

  removeItem = (id) => console.log("removeItem " + id);

  clearCart = () => console.log("cleared ");

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
