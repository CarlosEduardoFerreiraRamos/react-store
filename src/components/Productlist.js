import React, { Component } from 'react';
import Product from './Product';
import Title from "./Title";

import { ProductConsumer } from "../context";

export default class Productlist extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          <div className="py-5">
            <div className="container">
              <Title name="our" title="product"></Title>
              <div className="row">
                <ProductConsumer>
                  {(value) => {
                    return value.products.map(product => <Product product={product} key={product.id} />)
                  }}
                </ProductConsumer>
              </div>
            </div>
          </div>
        </React.Fragment>
        {/* <Product /> */}
      </div>
    );
  }
}
