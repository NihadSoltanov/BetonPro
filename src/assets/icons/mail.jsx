import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MailSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      stroke="#3B3B3B"
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M17.477.75H1v12.749h16.477V.75Z"
    />
    <Path
      stroke="#3B3B3B"
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M13.998 3.744 9.238 8.5l-4.76-4.76M10.562 7.18l3.436 3.437M4.479 10.617l3.493-3.493"
    />
  </Svg>
);
export default MailSvg;
