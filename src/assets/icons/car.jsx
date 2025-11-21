import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CarSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={14}
    fill="none"
    viewBox="0 0 50 32"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={10.002}
      strokeWidth={2}
      d="M27.226 6.258A34.75 34.75 0 0 0 8.372 1.603l-4.246.176L1.59 11.933l3.667 2.15c.037.023.075.043.113.065"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={10.002}
      strokeWidth={2}
      d="M5.326 20.338v-6.214h21.94v10.527h-4.432M41.582 24.652h4.509V12.875A13.509 13.509 0 0 0 41.553 2.76H27.268v21.892h4.509"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={10.002}
      strokeWidth={2}
      d="M8.126 29.137a4.712 4.712 0 1 0 0-9.424 4.712 4.712 0 0 0 0 9.424ZM18.292 29.137a4.712 4.712 0 1 0 0-9.424 4.712 4.712 0 0 0 0 9.424ZM36.198 29.137a4.712 4.712 0 1 0 0-9.424 4.712 4.712 0 0 0 0 9.424Z"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeWidth={2}
      d="M46.09 13.705h-10.6V2.236"
    />
  </Svg>
);
export default CarSvg;
