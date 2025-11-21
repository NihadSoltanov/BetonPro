import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PlusSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={26}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M12.379.575v24.757M0 12.954h24.758"
    />
  </Svg>
);
export default PlusSvg;
