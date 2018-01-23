import React from "react";

import wide from "../wide.json";
import icon from "../icon.json";

const versions = { wide, icon };

const noop = () => {};

const Line = ({ index, dashes, total, onAnimationEnd }) => (
  <g className={`l${index}`}>
    {dashes.map(({ color }, j) => (
      <path
        d={`m 5 ${index * 20 + 5} l ${total} 0`}
        key={j}
        className={["dash", `p${j}`, `c${color}`].join(" ")}
        onAnimationEnd={j === 0 ? onAnimationEnd : noop}
      />
    ))}
  </g>
);

const AnimatedLogo = ({ version, rolling, onAnimationEnd, ...props }) => {
  const { lines, total } = versions[version];
  const height = lines.length * 20 - 10;
  const width = total + 20;
  const classes = [`prettier-logo-${version}`, rolling ? "rolling" : null];
  return (
    <svg
      height={height}
      width={width}
      className={classes.join(" ")}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      {...props}
    >
      {lines.map(({ dashes }, index) => (
        <Line
          total={total}
          dashes={dashes}
          index={index}
          key={index}
          onAnimationEnd={index === lines.length - 1 ? onAnimationEnd : noop}
        />
      ))}
    </svg>
  );
};

export default AnimatedLogo;
