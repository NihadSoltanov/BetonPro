import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const HistorySvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={39}
    height={36}
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="m9.358 15.42-4.179 4.179L1 15.419M20.744 8.549v10.817h8.116"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M5.18 18.02a16.438 16.438 0 1 1 2.282 8.363"
    />
  </Svg>
);

export default HistorySvg;
