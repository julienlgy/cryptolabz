import "./onecrypto.css";
import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from "react";
import { Col,
  Collapse,
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

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const generateData = (n) => {
  const ret = [];
  let value = 20;
  const datestamp = new Date(2020, 0, 0);
  for (let i = 0; i < n; i += 1) {
    datestamp.setDate(datestamp.getDate() + 1);
    value += Math.round(Math.random() * 10 - 5);
    ret.push({ datestamp: new Date(datestamp), value });
  }
  return ret;
};

class OneCrypto extends Component {
  constructor(props) {
    super(props)
    console.log("TODO: init Favourites with values from database")
    this.state = {
      crypto: {
          name: this.props.cryptoSymbol,
          isNotCollapsed: true,
          values: generateData(100),
          trendOverall: 0,
          trend48h: 0,
      },
      hoveredDate: null,
      hoveredValue: null,
    }
  }

  componentDidMount() {
    this.calculateTrends()
  }

  calculateTrends() {
    let new_crypto = this.state.crypto
    let values = new_crypto.values
    // Overall trend
    new_crypto.trendOverall = Math.floor(Math.abs(values[values.length-1].value * 10000 / values[0].value - 10000)) / 100.
    new_crypto.trendOverall = values[values.length-1].value < values[0].value ?
        new_crypto.trendOverall * -1 : new_crypto.trendOverall
    // Last 48h
    let index = values.length-1
    let last_date = values[index].datestamp
    while (this.dateDiffInDays(values[index].datestamp, last_date) < 2 && index >= 0) {
      index--;
    }
    if (index >=0) {
      new_crypto.trend48h = Math.floor(Math.abs(values[values.length-1].value * 10000 / values[index].value - 10000)) / 100.
      new_crypto.trend48h = values[values.length-1].value < values[index].value ?
          new_crypto.trend48h * -1 : new_crypto.trend48h
    }
    // Save result
    this.setState({
      crypto: new_crypto
    })
  }

  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return (utc2 - utc1) / _MS_PER_DAY
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
      hoveredDate: this.state.crypto.values[target.point].datestamp,
      hoveredValue: Math.round(
          this.state.crypto.values[target.point].value * 100) / 100.
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

  renderTrend(value, label) {
    let classN = "trend-positive"
    let sign = "+"
    if (value < 0) {
      classN = "trend-negative"
      sign = ""
    }
    return(<span className={classN}>
      {label + " : " + sign + value + "%"}
    </span>)
  }

  renderGraph() {
    return (
      <Chart 
          className="chart"
          data={this.state.crypto.values}>
        <ArgumentAxis />
        <ArgumentScale factory={scaleTime} />
        <ValueAxis
            position="left" />
        <ValueAxis
            position="right" />

        <LineSeries
          name={this.state.crypto.symbol}
          valueField="value"
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
          <Col >
            <h1>{this.state.crypto.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col
              xs={{ size: 12 }}>
            {this.renderGraph()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default OneCrypto;
