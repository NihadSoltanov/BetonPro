// src/assets/icons/SendSvg.jsx

import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SendSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={40}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M22 2L11 13"
      stroke="#004E2B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="#004E2B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SendSvg;
