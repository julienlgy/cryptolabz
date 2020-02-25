import "./settings.css";
import 'bootstrap/dist/css/bootstrap.css';
import AddTag from './AddTag/AddTag';

import React, { Component } from "react";
import { Col,
  Button,
  Row,
  Tooltip } from 'reactstrap'

import axios from "axios";
import API from "./../../API"

class Settings extends Component {
  constructor(props) {
    super(props)
    
    let favorites = []
    for (var index = 0;
        index < this.props.user.favorites.length;
        index++) {
      favorites.push({
        id: this.props.user.favorites[index].id,
        symbol: this.props.user.favorites[index].symbol,
        name: this.props.user.favorites[index].symbol + " " + this.props.user.favorites[index].name,
        favorite: true
      })
    }

    this.state = {
      user: this.props.user,
      favorites: favorites,
      tags: [
        'news',
        'bitecoin',
        'mining'
      ],
      addingTag: false,
      updateFavsFailMessage: '',
      updateFavsOkMessage: '',
    }
  }

  componentDidMount() {
    let that = this
    axios.get(API.url_crypto_all)
    .then(response => {
      let new_favorites = that.state.favorites.slice()

      response.data.data.forEach(function(element) {
        if (!that.state.favorites.some(item => item.symbol === element.symbol)) {
          new_favorites.push({
            id: element.id,
            symbol: element.symbol,
            name: element.name,
            favorite: false
          })
        }
      })

      new_favorites.sort(function(a, b) {
        return a.symbol > b.symbol ? 1 : -1;
      });
      that.setState({ favorites: new_favorites })
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChangeFavorite = (index) => {
    if (index > this.state.favorites.size || index < 0) {
      return
    }
    let new_favorites = this.state.favorites.slice()
    new_favorites[index].favorite = ! new_favorites[index].favorite
    this.setState({favorites: new_favorites})
  }

  handleRemoveTag = (index) => {
    if (index > this.state.tags.size || index < 0) {
      return
    }
    let new_tags = this.state.tags.slice()
    new_tags.splice(index, 1)
    this.setState({tags: new_tags})
  }

  handleAddTag() {
    this.setState({addingTag: true})
  }

  handleCancelAddTag = () => {
    this.setState({addingTag: false})
  }

  handleTagAdded = (tag) => {
    if (this.state.tags.indexOf(tag) !== -1) {
      return
    }
    this.setState({addingTag: false})
    let new_tags = this.state.tags.slice()
    new_tags.push(tag)
    this.setState({tags: new_tags})
  }

  handleUpdateFavorites() {
    const that = this
    let new_favorites = []
    this.state.favorites.forEach(function (element) {
      if (element.favorite) {
        new_favorites.push(element)
      }
    })
    let body_update = {
      favorites: new_favorites,
    }
    axios.put(API.url_favorites, body_update, API.getAuthHeaders())
    .then(() => {
      let new_user = this.state.user
      new_user.favorites = new_favorites
      that.props.onEventUpdate(new_user)
      that.setState({
        updateFavsOkMessage: 'Updated successfully'
      })
    })
    .catch(error => {
      that.setState({
        updateFavsFailMessage: 'Update failed: ' + error
      })
    }); 
  }

  handleUpdateArticles() {
    console.log("TODO update articles")
  }

  renderFavorites() {
    return (<ul className="list-inline">
    {this.state.favorites.map((currency,index) =>
      <li
          className={"list-inline-item " + (currency.favorite ? 'selected' : 'unselected')}
          key={index}
          onClick={() => this.handleChangeFavorite(index)}>
        {currency.name}
      </li>
    )}
  </ul>)
  }

  renderTags() {
    return (<ul className="list-inline">
    {this.state.addingTag && <AddTag
        onAddTag={this.handleTagAdded}
        onCancelAddTag={this.handleCancelAddTag}/>
    }
    {this.state.tags.map((tag,index) =>
      <li
          className="list-inline-item"
          key={index}>
        {tag}
        <button
            className="delete-btn"
            onClick={() => this.handleRemoveTag(index)}>
          x
        </button>
      </li>
    )}
    <li className="list-inline-item add-btn"
            onClick={() => this.handleAddTag()}>
        +
    </li>
  </ul>)
  }

  render() {
    return (
      <div className="settings">
        <Row>
          <Col >
            <h1>Settings</h1>
          </Col>
        </Row>
        <Row>
          <Col
              xs={{ size: 11, offset: 1}}
              md={{ size: 6, offset: 1 }}>
            <h2>Favorites</h2>
            {this.renderFavorites()}
            <Button
                id="settings_update_favs_btn"
                onClick={() => this.handleUpdateFavorites()}>
              Update
            </Button>
              <Tooltip
                  id="settings_update_favs_error"
                  fade={true}
                  placement="bottom"
                  isOpen={this.state.updateFavsFailMessage !== ''}
                  target="settings_update_favs_btn">
                {this.state.updateFavsFailMessage}
              </Tooltip>
              <Tooltip
                  id="settings_update_favs_ok"
                  fade={true}
                  placement="bottom"
                  isOpen={this.state.updateFavsOkMessage !== ''}
                  target="settings_update_favs_btn">
                {this.state.updateFavsOkMessage}
              </Tooltip>
          </Col>
          <Col
              xs={{ size: 11, offset: 1}}
              md={{ size: 4}}>
            <h2>Article tags</h2>
            {this.renderTags()}
            <Button onClick={() => this.handleUpdateArticles()}>
              Update
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Settings;
