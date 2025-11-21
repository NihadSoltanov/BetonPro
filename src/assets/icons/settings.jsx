import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SettingsSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={29}
    fill="none"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M23.013 18.066a3.63 3.63 0 1 0 0-7.26 3.63 3.63 0 0 0 0 7.26ZM26.643 14.435h3.439M0 14.435h19.382M7.07 8.833a3.63 3.63 0 1 0 0-7.26 3.63 3.63 0 0 0 0 7.26ZM3.439 5.204H0M30.081 5.204H10.7M7.07 27.297a3.63 3.63 0 1 0 0-7.26 3.63 3.63 0 0 0 0 7.26ZM3.439 23.667H0M30.081 23.667H10.7"
    />
  </Svg>
);
export default SettingsSvg;
