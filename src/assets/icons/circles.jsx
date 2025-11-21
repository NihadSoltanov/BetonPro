import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CirclesSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 34 34"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeWidth={1.5}
      d="M17.59 33.825c8.974 0 16.25-7.275 16.25-16.25 0-8.974-7.276-16.25-16.25-16.25-8.975 0-16.25 7.276-16.25 16.25 0 8.975 7.275 16.25 16.25 16.25Z"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeWidth={1.5}
      d="M17.589 22.824a5.249 5.249 0 1 0 0-10.498 5.249 5.249 0 0 0 0 10.498Z"
    />
  </Svg>
);
export default CirclesSvg;
