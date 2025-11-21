import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const LocationPinSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
    viewBox="0 0 36 36"
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={2}
      d="M3.36 20.505a12.023 12.023 0 1 1 19.685 0"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={2}
      d="M13.204 17.375a4.444 4.444 0 1 1 0-8.888 4.444 4.444 0 0 1 0 8.888ZM2.953 19.887l10.25 15.9 10.248-15.9"
    />
  </Svg>
);
export default LocationPinSvg;
