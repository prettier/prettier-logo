import React from "react";
import ReactDOM from "react-dom";

import AnimatedLogo from "./AnimatedLogo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rolling: false };
  }

  render() {
    const { rolling } = this.state;
    return (
      <React.Fragment>
        <AnimatedLogo
          onAnimationEnd={() => this.setState({ rolling: false })}
          rolling={rolling}
          version="wide"
        />
        <AnimatedLogo rolling={rolling} version="icon" />
        <button onClick={() => this.setState({ rolling: true })}>
          Do a barrel roll!
        </button>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
