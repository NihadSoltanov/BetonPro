import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const LeftArrowSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M9.63 16.761 2 9.13 9.63 1.5"
    />
  </Svg>
);
export default LeftArrowSvg;
