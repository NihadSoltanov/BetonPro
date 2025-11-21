import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CalendarSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 35 35"
    fill="none"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeLinecap="round"
      strokeMiterlimit={13.333}
      strokeWidth={2}
      d="M31.517 11.747H1.357"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={2}
      d="M9.014.574v4.701M23.994.574v4.701M6.793 18.51h3.005M14.793 18.51h3.005M22.793 18.51h3.005"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeLinecap="round"
      strokeMiterlimit={13.333}
      strokeWidth={2}
      d="M31.589 3.117H1v28.457h30.589V3.117Z"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={2}
      d="M6.793 24.77h3.005M14.793 24.77h3.005M22.793 24.77h3.005"
    />
  </Svg>
);
export default CalendarSvg;
