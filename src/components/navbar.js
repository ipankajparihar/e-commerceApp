import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import Dropdown from "./dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { UncontrolledAlert } from "reactstrap";

class Navbar extends React.Component {
  logOut = () => {
    signOut(auth);

    this.props.dispatch(logout());
    <UncontrolledAlert color="green">
      {this.props.auth.user.user.email} Logged out Successfully.
    </UncontrolledAlert>;
  };
  render() {
    //getting auth state from redux store
    const { auth } = this.props;
    return (
      <div className="Navbar">
        <div className="leftNavbar">
          <Link to="/">Home</Link>
        </div>

        {auth.isLoggedIn && <Dropdown placeHolder={"category..."} />}

        <div className="rightNavbar">
          <ul>
            {!auth.isLoggedIn && (
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            )}
            {!auth.isLoggedIn && (
              <li>
                <Link to="/signIn">Log In</Link>
              </li>
            )}

            {auth.isLoggedIn && (
              <Link to="/userDetail">
                <li>
                  {"user:"}
                  {<b>{auth.user.user.email}</b>}
                </li>
              </Link>
            )}
            {auth.isLoggedIn && (
              <Link to="/cart">
                <li id="logout">
                  <FontAwesomeIcon icon={faCartShopping} />
                  {<b>{" " + this.props.cart.cart.length}</b>}
                </li>
              </Link>
            )}
            {auth.isLoggedIn && (
              <Link to="/">
                <li id="logout" onClick={this.logOut}>
                  LogOut
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    auth: state.auth,
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Navbar);
