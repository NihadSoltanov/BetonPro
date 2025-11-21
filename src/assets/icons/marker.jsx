import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MarkerSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M2.197 10.038a5.644 5.644 0 1 1 9.241 0"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M6.817 8.569a2.086 2.086 0 1 1 0-4.172 2.086 2.086 0 0 1 0 4.172ZM2.007 9.748l4.811 7.464 4.816-7.464"
    />
  </Svg>
);
export default MarkerSvg;
