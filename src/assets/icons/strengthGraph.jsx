import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const StrengthGraphSvg = ({ color = "#004E2B", size = 22, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    {/* Line */}
    <Path
      d="M5 15l4-3 3 2 5-6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Dots */}
    <Circle cx="9" cy="12" r="1.4" fill={color} />
    <Circle cx="12" cy="14" r="1.4" fill={color} />
    <Circle cx="17" cy="8" r="1.4" fill={color} />
  </Svg>
);

export default StrengthGraphSvg;
