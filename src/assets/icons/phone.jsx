import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PhoneSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      stroke="#3B3B3B"
      strokeLinecap="round"
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M5.271 1.36A3.77 3.77 0 0 0 1.5 5.13 10.37 10.37 0 0 0 11.869 15.5a3.771 3.771 0 0 0 3.771-3.772l-4.714-1.886-.943 2.357A5.184 5.184 0 0 1 4.8 7.015l2.357-.943L5.271 1.36Z"
    />
  </Svg>
);
export default PhoneSvg;
