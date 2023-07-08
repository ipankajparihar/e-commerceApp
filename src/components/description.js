import React from "react";
import "../css/Description.css";
import { connect } from "react-redux";
import { addToCart, userCart } from "../actions/cart";

class Description extends React.Component {
  handleAddToCart = (e) => {
    this.props.dispatch(addToCart(e));
  };
  render() {
    const { item } = this.props.item;
    const { auth } = this.props;

    return (
      //discription container
      <div className="description-container">
        <div className="description-image">
          <img src={item.image} alt={item.title} className="image" />
        </div>
        <div className="description-content">
          <h5 className="title">{item.title}</h5>
          <p className="category">{item.category}</p>
          <div className="rating-price-container">
            <p className="price">${item.price}</p>
          </div>
          <p className="text">{item.description}</p>
          {auth.isLoggedIn && (
            <button
              className="add-to-cart-btn"
              onClick={() => this.handleAddToCart(item)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Description);
