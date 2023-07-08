import React from "react";
import { connect } from "react-redux";
import { addToCart, userCart, removeFromCart } from "../actions/cart";
import {
  Table,
  Button,
  ButtonGroup,
  Badge,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import StripeCheckout from "react-stripe-checkout";

class Cart extends React.Component {
  handleRemoveItem = (item) => {
    this.props.dispatch(removeFromCart(item));
    const { cart } = this.props.cart;
    const newCart = cart.filter((a) => a.id !== item.id);
    console.log("newCart", newCart);

    this.props.dispatch(userCart(newCart));
  };

  handleIncreaseItem = (item) => {
    this.props.dispatch(addToCart(item));
    const { cart } = this.props.cart;

    this.props.dispatch(userCart([...cart, item]));
  };

  handlePayment = (e) => {
    console.log("payment");
  };

  render() {
    const { cart } = this.props.cart;
    const uniqueItems = [...new Set(cart.map((item) => item))];
    const onToken = (token) => {
      console.log("token", token);
    };
    return (
      <div>
        <h3>Cart</h3>
        {uniqueItems.length === 0 ? (
          <Card className="text-center">
            <CardBody>
              <CardTitle>Your cart is empty</CardTitle>
            </CardBody>
          </Card>
        ) : (
          <Table striped responsive>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {uniqueItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                    {cart.filter((i) => i.id === item.id).length}
                    {
                      <b
                        onClick={() => this.handleIncreaseItem(item)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {" "}
                        +{" "}
                      </b>
                    }
                  </td>
                  <td>
                    ${" "}
                    {cart
                      .filter((i) => i.id === item.id)
                      .reduce((acc, curr) => acc + curr.price, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    <ButtonGroup>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => this.handleRemoveItem(item)}
                      >
                        Remove
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-right">
                  <strong>Total:</strong>
                </td>
                <td>
                  <strong>
                    ${" "}
                    {cart.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}
                  </strong>
                </td>
                {/* <td>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      size="lg"
                      onClick={() => this.handlePayment()}
                      action="/create-checkout-session"
                      method="POST"
                    >
                      CheckOut
                    </Button>
                  </ButtonGroup>
                </td> */}
                <td>
                  <StripeCheckout
                    token={onToken}
                    name="Checkout"
                    amount={
                      parseInt(
                        cart
                          .reduce((acc, curr) => acc + curr.price, 0)
                          .toFixed(2)
                      ) * 100
                    }
                    stripeKey="pk_test_51NRB51SFSg0zhrbsryasEUnnreWwJY0HIx4IePE33cnudBTiNd9hUVdAMH9NMNu2sqfKTelqz2xOhsdb8B4fK5Gy00XuFpFzim"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Cart);
