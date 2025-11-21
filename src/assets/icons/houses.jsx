import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const HousesSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={34}
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M20.998 1.573h-20v31h20v-31Z"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={10}
      strokeWidth={2}
      d="m20.963 10.485 13.008 3.252v19.187H20.963M7.998 6.573v3M13.998 6.573v3M7.998 13.573v3M13.998 13.573v3M7.998 19.573v3M13.998 19.573v3M25.998 21.573h8M25.998 26.573h8M10.998 26.573v6"
    />
  </Svg>
);
export default HousesSvg;
