import './overlaysignup.css'

import React from 'react';
import { Button,
  Form,
  FormGroup,
  Input,
  Label,
  Tooltip } from 'reactstrap'

import axios from "axios";
import API from "./../../../API"

class OverlaySignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasFailed: false,
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    }
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  handleChangeFirstName = (e) => {
    this.setState({
      firstName: e.target.value
    });
  }

  handleChangeLastName = (e) => {
    this.setState({
      lastName: e.target.value
    });
  }

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleClickOnSignUp() {
    let body_signup = {
      username: this.state.email,
      email: this.state.email,
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      password: this.state.password
    }
    axios.post(API.url_register, body_signup)
    .then(response => {
      axios.post(API.url_login, body_signup)
      .then(response => {
        API.token = response.data.token
        this.props.onEventSignIn(response.data.user)
      })
      .catch(error => {
        console.log(error);
        this.props.onCancel()
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
        hasFailed: true
      })
    });
  }

  handleClickOnClose() {
    this.props.onCancel()
  }

  render() {
    return (
      <div className="overlaysignup">
        <div className="overlay">
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" required
                  value={this.state.email}
                  onChange={this.handleChangeEmail.bind(this)}
                  name="email" id="myaccount_mail" />
            </FormGroup>
            <FormGroup>
              <Label for="firstname">First name</Label>
              <Input type="text" required
                  value={this.state.firstName}
                  onChange={this.handleChangeFirstName.bind(this)}
                  name="firstname" id="myaccount_firstname" />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Last name</Label>
              <Input type="text" required
                  value={this.state.lastName}
                  onChange={this.handleChangeLastName.bind(this)}
                  name="lastname" id="myaccount_lastname" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" required
                  name="password"
                  id="signUp_password"
                  onChange={this.handleChangePassword.bind(this)}/>
            </FormGroup>
          </Form>
          <Button type="button"
              id="signup_sign_up_button"
              onClick={() => this.handleClickOnSignUp()}>
            Sign up
          </Button>
          <Tooltip
              id="signup_tooltip_error"
              fade={true}
              placement="bottom"
              isOpen={this.state.hasFailed}
              target="signup_sign_up_button">
            {this.state.failureMessage}
          </Tooltip>
          <button
              className="close-btn"
              onClick={() => this.handleClickOnClose()}>
            x
          </button>
        </div>
      </div>
    );
  }
}

export default OverlaySignUp;