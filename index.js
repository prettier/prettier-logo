import { h, render, Component } from "preact";
/** @jsx h */

import wide from "./wide.json";
import icon from "./icon.json";

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

const Svg = ({ data: { total, lines }, id }) => {
  const height = lines.length * 20 + 10;
  const width = total + 20;
  return (
    <svg
      id={id}
      height={height}
      width={width}
      viewbox={`0 0 ${height} ${width}`}
      version="1.1"
    >
      {lines.map(({ dashes }, index) => (
        <Line total={total} dashes={dashes} index={index} />
      ))}
    </svg>
  );
};

render(
  <div id="app">
    <Svg id="wide" data={wide} />
    <Svg id="icon" data={icon} />
  </div>,
  document.body
);
