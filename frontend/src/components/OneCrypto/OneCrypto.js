import "./onecrypto.css";
import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from "react";
import { Col,
  Row } from 'reactstrap'
import ReactTooltip from 'react-tooltip'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  ZoomAndPan
} from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale ,
  EventTracker,
  HoverState } from '@devexpress/dx-react-chart';
  import { scaleTime } from 'd3-scale';
import axios from "axios";
import API from "./../../API"

class OneCrypto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      symbol: this.props.cryptoSymbol,
      name: '',
      imgUrl: '',
      values: [],
      hoveredDate: null,
      hoveredValue: null,
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.cryptoSymbol !== this.props.cryptoSymbol) {
      this.componentDidMount()
    }
  }

  componentDidMount() {
    let that = this
    axios.all([
      axios.get(API.url_crypto + this.props.cryptoSymbol, {}, API.getAuthHeaders()),
      axios.get(API.url_crypto_histo + this.props.cryptoSymbol + API.post_crypto_histo_minute,
        {}, API.getAuthHeaders()),
      axios.get(API.url_crypto_histo + this.props.cryptoSymbol + API.post_crypto_histo_hourly,
        {}, API.getAuthHeaders()),
      axios.get(API.url_crypto_histo + this.props.cryptoSymbol + API.post_crypto_histo_daily,
        {}, API.getAuthHeaders())
    ])
    .then(axios.spread(function (crypto, minute, hourly, daily) {
      let values = minute.data.data
      values.concat(hourly.data.data)
      values.concat(daily.data.data)
      for (var index = 0; index < values.length; index++) {
        values[index].datestamp = new Date(values[index].date)
      }

      that.setState({
        symbol: crypto.data.data[0].symbol,
        name: crypto.data.data[0].name,
        imgUrl: crypto.data.data[0].imgUrl,
        values: values,
      })
    }))
    .catch(error => {
      console.log(error);
    })
  }

  handleHoverChange = (target) => {
    if (target == null) {
      this.setState({
        hoveredDate: null,
        hoveredValue: null
      })
      return
    }
    this.setState({
      hoveredDate: this.state.values[target.point].datestamp,
      hoveredValue: Math.round(
          this.state.values[target.point].price * 100) / 100.
    })
  }

  renderHoveredValueInfotip() {
    return(<ReactTooltip place="left" type="dark" effect="float">
      {this.state.hoveredDate.getFullYear()
           + "/" + (this.state.hoveredDate.getMonth() + 1)
           + "/" + this.state.hoveredDate.getDate()}
      <br/>
      {this.state.hoveredValue + "€"}
    </ReactTooltip>)
  }

  renderGraph() {
    return (
      <Chart 
          className="chart"
          data={this.state.values}>
        <ArgumentAxis />
        <ArgumentScale factory={scaleTime} />
        <ValueAxis
            position="left" />
        <ValueAxis
            position="right" />

        <LineSeries
          name={this.state.symbol}
          valueField="price"
          argumentField="datestamp"
        />

        <EventTracker />
        <ZoomAndPan
            interactionWithArguments="both"
        />
        <HoverState 
            onHoverChange={this.handleHoverChange}/>
      </Chart>
    )
  }

  render() {
    return (
      <div className="onecrypto" data-tip="data tip">
        {this.state.hoveredValue != null && this.renderHoveredValueInfotip()}
        <Row>
          <Col>
            <h1>{this.state.symbol} - {this.state.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <img
                className="image"
                alt={"image_" + this.state.symbol}
                src={this.state.imgUrl}
            />
          </Col>
        </Row>
        <Row>
          <Col
              xs={{ size: 10, offset: 1 }}>
            {this.renderGraph()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default OneCrypto;
