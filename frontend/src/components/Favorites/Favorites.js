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

class Favorite extends Component {
  constructor(props) {
    super(props)
    console.log("TODO: init Favourites with values from database")
    this.state = {
      favorites: [
        {
          name: 'bitcoin',
          isNotCollapsed: true,
          values: generateData(100),
          trendOverall: 0,
          trend48h: 0,
        },
        {
          name: 'megacoin',
          isNotCollapsed: true,
          values: generateData(100),
          trendOverall: 0,
          trend48h: 0,
        },
        {
          name: 'aucoin',
          isNotCollapsed: true,
          values: generateData(100),
          trendOverall: 0,
          trend48h: 0,
        },
      ],
      hoveredDate: null,
      hoveredValue: null,
    }
  }

  componentDidMount() {
    this.calculateTrends()
  }

  calculateTrends() {
    let new_favorites = this.state.favorites.slice()
    new_favorites.forEach((item) => {
      let values = item.values
      // Overall trend
      item.trendOverall = Math.floor(Math.abs(values[values.length-1].value * 10000 / values[0].value - 10000)) / 100.
      item.trendOverall = values[values.length-1].value < values[0].value ?
            item.trendOverall * -1 : item.trendOverall
      // Last 48h
      let index = values.length-1
      let last_date = values[index].datestamp
      while (this.dateDiffInDays(values[index].datestamp, last_date) < 2 && index >= 0) {
        index--;
      }
      if (index >=0) {
        item.trend48h = Math.floor(Math.abs(values[values.length-1].value * 10000 / values[index].value - 10000)) / 100.
        item.trend48h = values[values.length-1].value < values[index].value ?
            item.trend48h * -1 : item.trend48h
          }
    });
    // Save result
    this.setState({
      favorites: new_favorites
    })
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
          this.state.favorites[target.series].values[target.point].value * 100) / 100.
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
