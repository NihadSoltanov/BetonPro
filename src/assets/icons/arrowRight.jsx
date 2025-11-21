import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowRightSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={29}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="m1.09 1.074 13.69 13.69L1.09 28.451"
    />
  </Svg>
);
export default ArrowRightSvg;
