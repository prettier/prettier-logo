import { h, render, Component } from "preact";
/** @jsx h */

import lines from "./lines.json";
import "./style.styl";

const Line = ({ index, dashes }) => (
  <g className={`l${index}`}>
    {dashes.map(({ color }, j) => (
      <path
        d={`m 5 ${index * 20 + 5} l 200 0`}
        class={["dash", `p${j}`, `c${color}`].join(" ")}
      />
    ))}
  </g>
);

const Svg = ({ lines, active }) => (
  <svg
    width="210"
    height="210"
    viewbox="0 0 210 210"
    id="logo"
    class={active ? "" : "initial"}
    version="1.1"
  >
    {lines.map(({ dashes }, index) => <Line dashes={dashes} index={index} />)}
  </svg>
);

class App extends Component {
  toggle() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const toggle = () => this.toggle();
    return (
      <div>
        <Svg active={this.state.active} lines={lines} />
        <button onClick={toggle}>Animate</button>
      </div>
    );
  }
}

render(<App />, document.body);
