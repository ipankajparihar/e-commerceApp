import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledAlert,
} from "reactstrap";
import { startLogin, login, clearAuthState } from "../actions/auth";
import { connect } from "react-redux";
import { Navigate } from "react-router";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleInput = (e, value) => {
    this.setState({
      [e]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(startLogin());
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;

    if (isLoggedIn) {
      return <Navigate to="/" />;
    }
    return (
      <>
        {error && (
          <UncontrolledAlert color="warning">{error}</UncontrolledAlert>
        )}
        <div className="SignIn">
          <h2>Sign In</h2>

          <Form className="form">
            {error && <div className="errorBox">{error}</div>}

            <FormGroup>
              <Label for="examleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="signInEmail"
                placeholder="example@example.com"
                required
                onChange={(e) => this.handleInput("email", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="signInPassword"
                placeholder="Password"
                required
                onChange={(e) => this.handleInput("password", e.target.value)}
              />
            </FormGroup>
            {inProgress ? (
              <Button onClick={this.handleSubmit} disabled={inProgress}>
                Log In ...
              </Button>
            ) : (
              <Button onClick={this.handleSubmit} disabled={inProgress}>
                Log In
              </Button>
            )}
          </Form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(SignIn);
