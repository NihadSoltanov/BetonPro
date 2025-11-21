import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CrossWithCircleSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 40 30"
    fill="none"
    {...props}
  >
    <Path
      stroke="#E50A62"
      strokeWidth={1.5}
      d="M13.5 26.25c7.042 0 12.75-5.708 12.75-12.75S20.542.75 13.5.75.75 6.458.75 13.5 6.458 26.25 13.5 26.25Z"
    />
    <Path
      stroke="#E50A62"
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="m8.829 8.829 9.341 9.341M8.829 18.17l9.341-9.341"
    />
  </Svg>
);
export default CrossWithCircleSvg;
