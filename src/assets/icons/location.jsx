import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const LocationSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={38}
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M3.723 36.68h16.133M2.955 18.564a10.79 10.79 0 1 1 17.666 0"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M11.789 15.756a3.988 3.988 0 1 1 0-7.976 3.988 3.988 0 0 1 0 7.976ZM2.59 18.01l9.2 14.268 9.2-14.268"
    />
  </Svg>
);
export default LocationSvg;
