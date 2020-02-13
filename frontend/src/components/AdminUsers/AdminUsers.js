import React from "react";
import user_icon from './user_icon.svg'
import admin_icon from './admin_icon.svg'
import 'bootstrap/dist/css/bootstrap.css';
import "./adminusers.css";

import Pagination from "react-js-pagination";
import { Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row } from 'reactstrap';

import axios from "axios";
import API from "./../../API"

class AdminUsers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        users: [],
        usersToDisplay: [],
        numberUsersPerPage: 10,
        numberPage: 1,
      }
    }

    componentDidMount() {
      this.updateUsers()
    }

    updateUsers() {
      axios.get(API.url_user_all)
      .then(response => {
        let toDisplay = response.data.data.slice(
            (this.state.numberPage - 1) * this.state.numberUsersPerPage,
            this.state.numberPage * this.state.numberUsersPerPage)
        this.setState({ 
          users: response.data.data,
          usersToDisplay: toDisplay
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

    handleDeleteUser = (index) => {
      if (index > this.state.users.size || index < 0) {
        return
      }
      console.log("TODO delete user" + this.state.users[index].email)
    }

    handleEditUser = (index) => {
      if (index > this.state.users.size || index < 0) {
        return
      }
      console.log("TODO edit user" + this.state.users[index].email)
    }

    handlePageChange = (pageNumber) => {
      let toDisplay = this.state.users.slice(
          (pageNumber - 1) * this.state.numberUersPerPage,
          pageNumber * this.state.numberUsersPerPage)
      this.setState({
        usersToDisplay: toDisplay,
        numberPage: pageNumber
      });
    }

    renderIcon(isAdmin) {
      return(<div>
        {isAdmin && (<span>Admin</span>)}
        {!isAdmin && (<span>nope</span>)}
      </div>)
    }

    render() {
      return (
      <div className="adminusers">
        <h1>Admin Users</h1>
        <ListGroup>
          {this.state.usersToDisplay.map((user,index) =>
          <ListGroupItem
              key={index}>
            <Container>
              <Row>
                <Col
                    xs={{ size: 1}}>
                  <img
                      className="icon"
                      alt={"image_" + user.username}
                      src={user.isAdmin ? admin_icon : user_icon} />
                </Col>
                <Col
                    xs={{ size: 2}}
                    md={{ size: 1}}>
                  {user.username}
                </Col>
                <Col
                    xs={{ size: 3}}>
                  {user.firstname + " " + user.lastname}
                </Col>
                <Col
                    xs={{ size: 3}}>
                  {user.email}
                </Col>
                <Col
                    xs={{ size: 1}}>
                  <Button
                      color="primary"
                      onClick={() => this.handleEditUser(index)}>
                    Edit
                  </Button>
                </Col>
                <Col
                    xs={{ size: 1}}>
                  <Button
                      color="danger"
                      onClick={() => this.handleDeleteUser(index)}>
                    Delete
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroupItem>
          )}
        </ListGroup>
        <Pagination
          activePage={this.state.numberPage}
          itemsCountPerPage={this.state.numberUsersPerPage}
          totalItemsCount={this.state.users.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          innerClass="pagination justify-content-center"
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    );
  }
}

export default AdminUsers;
