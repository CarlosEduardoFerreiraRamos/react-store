import React, { Component } from 'react';
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

// Provider
// Consumer

class ProductProvider extends Component {
  state = {
    products: [], detailProduct: detailProduct
  }

  componentDidMount() {
    this.setProduct();
  }

  setProduct = () => this.setState({ products: storeProducts.map(product => ({ ...product })) });

  handleDetail = () => console.log('hello from detail');

  addToCart = (id) => console.log(`hello from add to cart: id is ${id}`);

  render() {
    return (
      <ProductContext.Provider value={{ ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider }
