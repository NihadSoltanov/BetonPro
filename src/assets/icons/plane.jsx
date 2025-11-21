import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PlaneSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#3B3B3B"
      strokeMiterlimit={22.926}
      strokeWidth={1.5}
      d="M19.531 1.342 3.514 5.657l8.648 3.055 3.16 8.753 4.209-16.123Z"
    />
  </Svg>
);
export default PlaneSvg;
