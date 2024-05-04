import React from "react";
import Chart from "chart.js";
import { FlexBox } from "~components/atoms";

class BarChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { chart: null };
    this.chartRef = React.createRef();
  }

  getRandomColor() {
    var rint = Math.floor(0x100000000 * Math.random());
    return (
      "rgba(" +
      (rint & 255) +
      "," +
      ((rint >> 8) & 255) +
      "," +
      ((rint >> 16) & 255) +
      "," +
      "0.9" +
      ")"
    );
  }

  renderCanvas() {
    const ctx = this.chartRef.current.getContext("2d");
    const {
      labels,
      data,
      headerLabel,
      chartType,
      fill = true,
      hideLegends,
      hideAxes,
      aspectRatio
    } = this.props;

    const backgroundArr = new Array(labels.length);
    const backgroundColors = [];

    for (let index = 0; index < backgroundArr.length; index++) {
      const color = this.getRandomColor();
      backgroundColors.push(color);
    }

    const chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels.slice(),
        datasets: [
          {
            fill: fill,
            label: headerLabel,
            data: data.slice(),
            backgroundColor: backgroundColors,
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: true,
        aspectRatio: aspectRatio || 2,
        responsive: true,
        legend: {
          display: !hideLegends
        },
        scales: {
          xAxes: [
            {
              display: !hideAxes
            }
          ],
          yAxes: [
            {
              display: !hideAxes,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.setState({ chart });
  }

  componentDidMount() {
    this.renderCanvas();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data) ||
      JSON.stringify(this.props.labels) !== JSON.stringify(prevProps.labels)
    ) {
      this.state.chart && this.state.chart.destroy();
      this.renderCanvas();
    }
  }

  render() {
    return (
      <FlexBox alignItems="center" height="100%" padding="1rem">
        <canvas id="myChart" ref={this.chartRef} />
      </FlexBox>
    );
  }
}

export default BarChart;
