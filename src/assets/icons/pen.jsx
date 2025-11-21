import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PenSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 40 30"
    {...props}
  >
    <Path
      stroke="#3B3B3B"
      d="M13.5 26.5c7.18 0 13-5.82 13-13s-5.82-13-13-13-13 5.82-13 13 5.82 13 13 13Z"
    />
    <Path
      stroke="#3B3B3B"
      strokeMiterlimit={13.333}
      d="m9.979 19.378-2.589.23.232-2.588 9.629-9.63 2.358 2.359-9.63 9.629ZM15.106 9.723l2.046 2.046"
    />
  </Svg>
);
export default PenSvg;
