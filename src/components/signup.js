import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledAlert,
} from "reactstrap";
import { clearAuthState, signupBegin, signup } from "../actions/auth";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      confirmPassword: "",
      password: "",
    };
  }

  componentWillUnmount = (e) => {
    return this.props.dispatch(clearAuthState());
  };

  handleInputValue = (e, value) => {
    this.setState({
      [e]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, confirmPassword, password } = this.state;
    console.log(this.state);

    if (username && email && confirmPassword && password) {
      this.props.dispatch(signupBegin());
      this.props.dispatch(signup(username, email, confirmPassword, password));
    }
  };

  render() {
    const { inProgress, isLoggedIn, error } = this.props.auth;
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }
    return (
      <>
        {error && (
          <UncontrolledAlert color="warning">{error}</UncontrolledAlert>
        )}
        <div className="SignUp">
          <h2>Sign Up</h2>
          <Form className="form">
            <FormGroup>
              <Label for="exampleName">Username</Label>
              <Input
                type="text"
                name="text"
                id="singupName"
                placeholder="Username"
                required
                onChange={(e) =>
                  this.handleInputValue("username", e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="singupEmail"
                placeholder="example@example.com"
                required
                onChange={(e) => this.handleInputValue("email", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="SignUpPassword"
                placeholder="Password"
                required
                onChange={(e) =>
                  this.handleInputValue("password", e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Confirm password</Label>
              <Input
                type="password"
                name="password"
                id="SignUpConfirmPassword"
                placeholder="Confirm Password"
                required
                onChange={(e) =>
                  this.handleInputValue("confirmPassword", e.target.value)
                }
              />
            </FormGroup>
            <Button onClick={this.handleSubmit} disabled={inProgress}>
              Sign Up
            </Button>
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
export default connect(mapStateToProps)(SignUp);
