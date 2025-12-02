import React from "react";
import Svg, { Path } from "react-native-svg";

const SlumpGraphSvg = ({ color = "#004E2B", size = 22, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    {/* Bars */}
    <Path d="M6 16V9" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M10 16V6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M14 16V12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M18 16V5" stroke={color} strokeWidth={2} strokeLinecap="round" />

    {/* Baseline */}
    <Path d="M4 16h16" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export default SlumpGraphSvg;
