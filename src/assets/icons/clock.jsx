import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ClockSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 37 37"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 35.574c9.389 0 17-7.61 17-17 0-9.389-7.611-17-17-17s-17 7.611-17 17c0 9.39 7.611 17 17 17Z"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={2}
      d="M25.191 19.312H18v-9.287"
    />
  </Svg>
);
export default ClockSvg;
