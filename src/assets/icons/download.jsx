import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const DownloadSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={40}
    viewBox="0 0 24 38"
    fill="none"
    {...props}
  >
    <Path
      stroke="#004E2B"
      strokeMiterlimit={13.333}
      strokeWidth={3}
      d="M23.19 11.34 11.93 21.991 1.28 10.731M12.234 20.888V.574M.18 29.756h24.108"
    />
  </Svg>
);
export default DownloadSvg;
