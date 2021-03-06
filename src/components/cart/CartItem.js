import React from "react";

function CartItem({ item, value }) {
  const { id, title, img, price, total, count } = item;
  const { incrementation, decrement, removeItem } = value;
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          alt="product"
          className="img-fluid"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <div className="d-lg-none">product :</div>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <div className="d-lg-none">price :</div>
        {price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span
              className="btn btn-black mx-1"
              onClick={() => incrementation(id)}
            >
              +
            </span>
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => removeItem(id)}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <string>item total : $ {total}</string>
      </div>
    </div>
  );
}

export default CartItem;
