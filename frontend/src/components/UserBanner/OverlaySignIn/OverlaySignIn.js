import './overlaysignin.css'

import React from 'react';
import { Button,
  Form,
  FormGroup,
  Input,
  Label } from 'reactstrap'

import axios from "axios";
import API from "./../../../API"

class OverlaySignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleClickOnSignIn() {
    let body_login = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post(API.url_login, body_login)
    .then(response => {
      API.token = response.data.token
      this.props.onEventSignIn(response.data.user)
    })
    .catch(error => {
      console.log(error);
    });
    
  }

  handleClickOnClose() {
    this.props.onCancel()
  }

  render() {
    return (
      <div className="overlaysignin">
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
              <Label for="password">Password</Label>
              <Input type="password" required
                  name="password"
                  id="signin_password"
                  onChange={this.handleChangePassword.bind(this)}/>
            </FormGroup>
          </Form>
          <Button type="button"
              onClick={() => this.handleClickOnSignIn()}>
            Sign in
          </Button>
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

export default OverlaySignIn;
