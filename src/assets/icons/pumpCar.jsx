import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const PumpCarSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width={34}
    height={17}
    {...props}
  >
    <Path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M4.6 39.5H.8V26.8h33.7v12.7h-6.3"
    />
    <Path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M51.7 39.5h5.4V25.3c0-4.6-2-9.1-5.5-12.2H34.4v26.3h5.4"
    />
    <Circle
      cx={10.3}
      cy={39.2}
      r={5.7}
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <Circle
      cx={27}
      cy={10.6}
      r={3}
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <Circle
      cx={22.5}
      cy={39.2}
      r={5.7}
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <Circle
      cx={45.2}
      cy={39.2}
      r={5.7}
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <Path
      fill="none"
      stroke="#000"
      strokeWidth={1.5}
      d="M57.1 26.3H44.4V13.1"
    />
    <Path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M21 26.8v-4.6c0-2.4 1.9-4.3 4.3-4.3h.4c2.4 0 4.3 1.9 4.3 4.3v4.6M6.4 21h14.9M25.5 18H11.2M11.8 12.7h13M24.1 9.7H6.4"
    />
    <Circle
      cx={6.4}
      cy={15.3}
      r={5.7}
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <Path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m28.1 7.5 6.5-6.4 2.1 2.1-6.4 6.5"
    />
  </Svg>
);

export default PumpCarSvg;
