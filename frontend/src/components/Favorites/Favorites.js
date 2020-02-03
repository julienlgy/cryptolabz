import "./favorites.css";
import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from "react";
import { Col,
  Collapse,
  Row } from 'reactstrap'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleTime } from 'd3-scale';
import { ArgumentScale,
  EventTracker,
  HoverState } from '@devexpress/dx-react-chart';
import ReactTooltip from 'react-tooltip'

const generateData = (n) => {
  const ret = [];
  let value = 0;
  const datestamp = new Date(2020, 0, 0);
  for (let i = 0; i < n; i += 1) {
    datestamp.setDate(datestamp.getDate() + 1);
    value += Math.round(Math.random() * 10 - 5);
    ret.push({ datestamp: new Date(datestamp), value });
  }
  return ret;
};
const ChartRoot = props => (
  <Chart.Root {...props}/>
);

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
        },
        {
          name: 'megacoin',
          isNotCollapsed: true,
          values: generateData(100),
        },
        {
          name: 'aucoin',
          isNotCollapsed: true,
          values: generateData(100),
        },
      ],
      hoveredValue: null,
    }
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
      this.setState({ hoveredValue: null })
      return
    }
    this.setState({ hoveredValue: Math.round(target.distance * 100) / 100.})
  }

  renderHoveredValueInfotip() {
    return(<ReactTooltip place="left" type="dark" effect="float">
      {this.state.hoveredValue}
    </ReactTooltip>)
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
                      xs={{ size: 1}}
                      xm={{ size: 2}}>
                    {currency.name}
                  </Col>
                  <Col
                      xs={{ size: 11}}
                      xm={{ size: 10}}>
                      <Chart
                          className="chart"
                          data={currency.values} rootComponent={ChartRoot}>
                        <ArgumentScale
                            factory={scaleTime} />
                        <ArgumentAxis />
                        <ValueAxis />
              
                        <LineSeries
                            argumentField="datestamp"
                            valueField="value"
                            color="#CD6767" />

                        <ZoomAndPan
                          interactionWithArguments="both"
                          zoomRegionKey="ctrl" />
                        <EventTracker />
                        <HoverState 
                            onHoverChange={(e) => this.handleHoverChange(e)}/>
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
