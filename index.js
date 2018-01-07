import { h, render, Component } from "preact";
/** @jsx h */

import data from "./data.json";
import "./style.styl";

const Line = ({ index, dashes, total }) => (
  <g className={`l${index}`}>
    {dashes.map(({ color }, j) => (
      <path
        d={`m 5 ${index * 20 + 5} l ${total} 0`}
        class={["dash", `p${j}`, `c${color}`].join(" ")}
      />
    ))}
  </g>
);

const Svg = ({ data: { total, lines }, active }) => {
  const height = lines.length * 20 + 10;
  const width = total + 20;
  return (
    <svg
      height={height}
      width={width}
      id="logo"
      viewbox={`0 0 ${height} ${width}`}
      class={active ? "" : "initial"}
      version="1.1"
    >
      {lines.map(({ dashes }, index) => (
        <Line total={total} dashes={dashes} index={index} />
      ))}
    </svg>
  );
};

class App extends Component {
  toggle() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const toggle = () => this.toggle();
    return (
      <div id="app">
        <Svg active={this.state.active} data={data} />
        <button onClick={toggle}>Toggle</button>
      </div>
    );
  }
}

render(<App />, document.body);
