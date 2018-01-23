import React from "react";
import ReactDOM from "react-dom";

import wide from "./wide.json";
import icon from "./icon.json";

const Line = ({ index, dashes, total }) => (
  <g className={`l${index}`}>
    {dashes.map(({ color }, j) => (
      <path
        d={`m 5 ${index * 20 + 5} l ${total} 0`}
        key={j}
        className={["dash", `p${j}`, `c${color}`].join(" ")}
      />
    ))}
  </g>
);

const Svg = ({ data: { total, lines }, id }) => {
  const height = lines.length * 20 - 10;
  const width = total + 20;
  return (
    <svg
      id={id}
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      {lines.map(({ dashes }, index) => (
        <Line total={total} dashes={dashes} index={index} key={index} />
      ))}
    </svg>
  );
};

ReactDOM.render(
  <React.Fragment>
    <Svg id="wide" data={wide} />
    <Svg id="icon" data={icon} />
  </React.Fragment>,
  document.getElementById("app")
);
