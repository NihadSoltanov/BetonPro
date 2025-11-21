import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PendingSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={40}
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M26.94 38.869a8.351 8.351 0 1 0 0-16.702 8.351 8.351 0 0 0 0 16.702Z"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeMiterlimit={13.333}
      strokeWidth={1.5}
      d="M30.172 30.88H26.94v-4.175M18.953 32.961H1V1.574h25.94v20.593M7.639 10.398h6.335M7.639 15.775H20.3M7.639 21.153H20.3"
    />
  </Svg>
);
export default PendingSvg;
