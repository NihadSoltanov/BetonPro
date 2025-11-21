import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CrossSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <Path
      stroke="#3B3B3B"
      strokeMiterlimit={13.333}
      strokeWidth={2}
      d="M.59.574 19.966 19.95M.59 19.95 19.966.574"
    />
  </Svg>
);
export default CrossSvg;
