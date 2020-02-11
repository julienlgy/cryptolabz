import "./myaccount.css";
import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from "react";
import { Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Row } from 'reactstrap'

class MyAccount extends Component {
  constructor(props) {
    super(props)
    console.log("TODO: init MyAccount with values from database")
    this.state = {
      oldPasswordOk: false,
      confirmPasswordOk: false,
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      newPassword: '',
      confirmPassword: ''
    }
  }

  handleClickUpdateProfile() {
    if ((this.state.email === '')
        || (this.state.username === '')
        || (this.state.firstName === '')
        || (this.state.lastName === ''))
      return;
    console.log("TODO update");
  }
  
  handleClickChangePassword() {
    if (!(this.state.newPassword === this.state.confirmPassword)) {
      return;
    }
    console.log("TODO change password");
  }

  handleChangeOldPassword = (e) => {
    console.log("TODO check password " + e.target.value); //TODO check with back
    if (e.target.value === "ok") {
      this.setState({
        ...this.state,
        oldPasswordOk: true
      });
    }
  }

  handleChangePassword = (e) => {
    this.setState({
      newPassword: e.target.value,
      confirmPasswordOk: (e.target.value === this.state.confirmPassword)
    });
  }

  handleChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      confirmPasswordOk: (this.state.newPassword === e.target.value)
    });
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  handleChangeUsername = (e) => {
    this.setState({
      username: e.target.value
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

  renderOldPassword() {
    return(
      <FormGroup>
        <Label for="old_password">Old password</Label>
        <Input type="password" required
            name="old_password"
            id="myaccount_old_password"
            onChange={this.handleChangeOldPassword.bind(this)}/>
      </FormGroup>
    )
  }

  renderNewPassword() {
    return(
      <div>
        <FormGroup>
          <Label for="new_password">New password</Label>
          <Input type="password" required
              name="new_password"
              value={this.state.newPassword}
              onChange={this.handleChangePassword.bind(this)}
              id="myaccount_new_password"/>
        </FormGroup>
        <FormGroup>
          <Label for="confirm_password">Confirm password</Label>
          <Input type="password" required
              name="confirm_password"
              value={this.state.confirmPassword}
              onChange={this.handleChangeConfirmPassword.bind(this)}
              id="myaccount_confirm_password"/>
        </FormGroup>
        <Button
            onClick={() => this.handleClickChangePassword()}
            disabled={!this.state.confirmPasswordOk}>
          Change
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div className="myaccount">
        <Row>
          <Col >
            <h1>My Account</h1>
          </Col>
        </Row>
        <Row>
          <Col
              xs={{ size: 11, offset: 1}}
              md={{ size: 5, offset: 1 }}>
            <h2>My information</h2>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" required
                    value={this.state.email}
                    onChange={this.handleChangeEmail.bind(this)}
                    name="email" id="myaccount_mail" />
              </FormGroup>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" required
                    value={this.state.username}
                    onChange={this.handleChangeUsername.bind(this)}
                    name="username" id="myaccount_username" />
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
              <Button onClick={() => this.handleClickUpdateProfile()}>
                Update
              </Button>
            </Form>
          </Col>
          <Col
              xs={{ size: 11, offset: 1}}
              md={{ size: 5}}>
              <h2>Change password</h2>
              { !this.state.oldPasswordOk && this.renderOldPassword() }
              { this.state.oldPasswordOk && this.renderNewPassword() }
          </Col>
        </Row>
      </div>
    );
  }
}

export default MyAccount;
