import React from "react";
import "../css/App.css";
import {
  Home,
  Navbar,
  SignIn,
  SignUp,
  Category,
  Description,
  Cart,
  UserDetail,
} from ".";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { fetchItems } from "../actions/items";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchItems());
  }

  handleMsg() {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }

  render() {
    const { auth, homeitems, item } = this.props;
    return (
      <div className="App">
        {/* connecting every route */}
        <Router>
          <header className="App-header">
            <Navbar {...this.props} homeitems={homeitems} />

            <Routes>
              <Route path="/" element={<Home {...this.props} />} />
              <Route
                path="/category"
                element={<Category homeitems={homeitems} />}
              />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="userDetail" element={<UserDetail />} />

              <Route
                path="/description"
                element={<Description item={item} />}
              />
              <Route
                path="category/description"
                element={<Description item={item} />}
              />
            </Routes>
          </header>
        </Router>

        <div className="Payment" onChange={this.handleMsg}>
          <p></p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    homeitems: state.homeitems,
    item: state.item,
  };
};

App.propTypes = {
  homeitems: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
