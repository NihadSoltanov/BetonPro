import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const DrawerArrowSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={8}
    fill="none"
    viewBox="0 0 27 8"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={2.5}
      d="M26.582 1.186 13.5 5.759.419 1.186"
      opacity={0.15}
    />
  </Svg>
);
export default DrawerArrowSvg;
