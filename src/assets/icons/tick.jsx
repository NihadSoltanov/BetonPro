import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const TickSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={11}
    fill="none"
    {...props}
  >
    <Path
      stroke={color ?? '#00843D'}
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m13.611 1.36-8.28 8.28-3.942-3.942"
    />
  </Svg>
);
export default TickSvg;
