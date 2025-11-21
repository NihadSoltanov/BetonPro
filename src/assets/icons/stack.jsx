import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const StackSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={22.926}
      strokeWidth={2}
      d="m34.449 18.802 6.615 4.253-19.442 12.5-19.442-12.5 6.857-4.409"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={22.926}
      strokeWidth={2}
      d="m2.18 14.072 19.442-12.5 19.442 12.5-19.442 12.5-19.442-12.5Z"
    />
  </Svg>
);
export default StackSvg;
