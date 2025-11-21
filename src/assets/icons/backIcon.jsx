import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BackIconSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    viewBox="0 0 44 44"
    {...props}
  >
    <Path
      stroke={color ?? '#E6E6DF'}
      strokeWidth={1.5}
      d="M22 43.25c11.736 0 21.25-9.514 21.25-21.25S33.736.75 22 .75.75 10.264.75 22 10.264 43.25 22 43.25Z"
    />
    <Path
      stroke={color ?? '#E6E6DF'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M24.325 28.23 18.096 22l6.229-6.227"
    />
  </Svg>
);
export default BackIconSvg;
