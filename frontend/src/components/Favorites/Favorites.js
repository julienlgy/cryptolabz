import "./favorites.css";
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
import axios from "axios";
import API from "./../../API"

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

class Favorite extends Component {
  constructor(props) {
    super(props)
    
    let favorites = []
    for (var index = 0;
        index < this.props.user.favorites.length;
        index++) {
      favorites.push({
        symbol: this.props.user.favorites[index].symbol,
        name: this.props.user.favorites[index].name,
        values: [],
        trend48h: 0,
        trendOverall: 0,
      })
    }

    this.state = {
      favorites: [],
      favorites_tmp: favorites,
      hoveredDate: null,
      hoveredValue: null,
    }
  }

  componentDidMount() {
    this.state.favorites_tmp.forEach((crypto) => {
      axios.all([
        axios.get(API.url_crypto_histo
          + crypto.symbol
          + API.post_crypto_histo_minute,
          {}, API.getAuthHeaders()),
        axios.get(API.url_crypto_histo
          + crypto.symbol
          + API.post_crypto_histo_hourly,
          {}, API.getAuthHeaders()),
        axios.get(API.url_crypto_histo
          + crypto.symbol
          + API.post_crypto_histo_daily,
          {}, API.getAuthHeaders())
      ])
      .then(axios.spread((minute, hourly, daily) => {

        let values = minute.data.data
        values.concat(hourly.data.data)
        values.concat(daily.data.data)
        for (let index = 0; index < values.length; index++) {
          values[index].datestamp = new Date(values[index].date)
        }
        const trends = this.calculateTrends(values)

        this.setState({
          favorites: this.state.favorites.concat([{
            symbol: crypto.symbol,
            name:crypto.name,
            isNotCollapsed: true,
            values: values,
            trend48h: trends.trend48h,
            trendOverall: trends.trendOverall,
          }])
        })
      }))
      .catch(error => {
        console.log(error);
      })
    })
  }

  calculateTrends(values) {
    // Overall trend
    let trendOverall = Math.floor(Math.abs(values[values.length-1].price * 10000 / values[0].price - 10000)) / 100.
    trendOverall = values[values.length-1].price < values[0].price ?
        trendOverall * -1 : trendOverall

    // Last 48h
    let index = values.length-1
    let last_date = values[index].datestamp
    while (this.dateDiffInDays(values[index].datestamp, last_date) < 2 && index > 0) {
      index --;
    }
    let trend48h = Math.floor(Math.abs(values[values.length-1].price * 10000 / values[index].price - 10000)) / 100.
    trend48h = values[values.length-1].price < values[index].price ?
        trend48h * -1 : trend48h

    return {
      trend48h: trend48h,
      trendOverall: trendOverall,
    }
  }

  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return (utc2 - utc1) / _MS_PER_DAY
  }

  handleToggleFavorite = (index) => {
    if (index > this.state.favorites.size || index < 0) {
      return
    }
    let new_favorites = this.state.favorites.slice()
    new_favorites[index].isNotCollapsed = !new_favorites[index].isNotCollapsed
    this.setState({favorites: new_favorites})
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
      hoveredDate: this.state.favorites[target.series].values[target.point].datestamp,
      hoveredValue: Math.round(
          this.state.favorites[target.series].values[target.point].price * 100) / 100.
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

  renderFavorites() {
    return (<ul className="list-group">
      {this.state.favorites.map((currency,index) =>
        <li
            className="list-group-item"
            id={currency.name + "-list-item"}
            key={index}>
          <div>
            <h2
                onClick={() => this.handleToggleFavorite(index)}>
            {currency.name}

            </h2>
              <Collapse
                    isOpen={currency.isNotCollapsed}>
                <Row>
                  <Col
                      xs={{ size: 2}}
                      xm={{ size: 4}}>
                    <Row>
                      {currency.name}
                    </Row>
                    <Row>
                      {this.renderTrend(currency.trendOverall, 'Overall trend')}
                    </Row>
                    <Row>
                      {this.renderTrend(currency.trend48h, 'Last 48h')}
                    </Row>
                  </Col>
                  <Col
                      xs={{ size: 10}}
                      xm={{ size: 8}}>
                    <Chart 
                        className="chart"
                        data={currency.values}>
                      <ArgumentAxis />
                      <ArgumentScale factory={scaleTime} />
                      <ValueAxis
                          position="left" />
                      <ValueAxis
                          position="right" />

                      <LineSeries
                        name={index}
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
                  </Col>
                </Row>
              </Collapse>
          </div>
        </li>
      )}
    </ul>)
  }

  render() {
    return (
      <div className="favorites" data-tip="data tip">
        {this.state.hoveredValue != null && this.renderHoveredValueInfotip()}
        <Row>
          <Col >
            <h1>Favorites</h1>
          </Col>
        </Row>
        <Row>
          <Col
              xs={{ size: 9, offset: 1}}>
            <h2>Favorites</h2>
            {this.renderFavorites()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Favorite;
