import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PaperSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
    viewBox="0 0 36 36"
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeWidth={2}
      d="M29 1.574H1v33h28v-33Z"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={2}
      d="M8.068 10.65h6.745M8.068 16.376H21.55M8.068 22.104H21.55"
    />
  </Svg>
);
export default PaperSvg;
