import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const DotsSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={7}
    fill="none"
    viewBox="0 0 28 10"
    {...props}
  >
    <Path
      fill="#3B3B3B"
      d="M25 .574a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM14 .574a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM3 .574a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
    />
  </Svg>
);
export default DotsSvg;
