import "./settings.css";
import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from "react";
import { Col,
  Button,
  Row } from 'reactstrap'

class Settings extends Component {
  constructor(props) {
    super(props)
    console.log("TODO: init Settings with values from database")
    this.state = {
      favorites: [
        { name: 'bitcoin', favorite: true },
        { name: 'coincoin', favorite: false },
        { name: 'megacoin', favorite: true },
        { name: 'coin romantique', favorite: false },
        { name: 'aucoin', favorite: true },
        { name: 'supercoin', favorite: false }
      ],
      tags: [
        'news',
        'bitecoin',
        'mining'
      ],
      addingTag: false
    }
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

  handleUpdateFavorites() {
    console.log("TODO update favorites")
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
            <Button onClick={() => this.handleUpdateFavorites()}>
              Update
            </Button>
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
