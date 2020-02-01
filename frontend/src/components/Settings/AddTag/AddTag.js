import './addtag.css'

import React from 'react';
import { Button } from 'reactstrap'

class AddTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tag: '' }
  }

  handleChangeText = (e) => {
    this.setState({
      tag: e.target.value
    });
  }

  handleAddTag() {
    this.props.onAddTag(this.state.tag)
  }

  handleClickOnClose() {
    this.props.onCancelAddTag()
  }

  render() {
    return (
      <div className="addtag">
        <div className="overlay">
          <input
            type="text"
            onChange={this.handleChangeText.bind(this)}/> 
          <Button type="button"
              onClick={() => this.handleAddTag()}>
            Add
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

export default AddTag;
