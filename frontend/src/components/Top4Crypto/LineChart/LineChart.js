import React, { Component } from "react";
import "./LineChart.css";

class LineChart extends Component {
  // Get min X & max X
  getMinX() {
    const { data } = this.props;
    return data[0].x;
  }
  getMaxX() {
    const { data } = this.props;
    return data[data.length - 1].x;
  }

  // Get min Y & max Y
  getMinY() {
    const { data } = this.props;
    return data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y);
  }
  getMaxY() {
    const { data } = this.props;
    return data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y);
  }

  // Coordinates svg
  getSvgX(x) {
    const { svgWidth } = this.props;
    return (x / this.getMaxX()) * svgWidth;
  }
  getSvgY(y) {
    const { svgHeight } = this.props;
    y = y - this.getMinY();
    return svgHeight - (y / (this.getMaxY() - this.getMinY())) * svgHeight;
  }

  makePath() {
    const { data, color } = this.props;
    let pathD =
      "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
    pathD += data.map((point, i) => {
      return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
    });
    return (
      <path className="linechart_path" d={pathD} style={{ stroke: color }} />
    );
  }

  render() {
    const { svgHeight, svgWidth } = this.props;
    return (
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>{this.makePath()}</svg>
    );
  }
}

LineChart.defaultProps = {
  data: [],
  color: "black",
  svgHeight: 200,
  svgWidth: 700
};

export default LineChart;
