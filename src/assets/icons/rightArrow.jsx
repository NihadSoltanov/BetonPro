import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const RightArrowSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="m1 1.5 7.63 7.631L1 16.761"
    />
  </Svg>
);
export default RightArrowSvg;
