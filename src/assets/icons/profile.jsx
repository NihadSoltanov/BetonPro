import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ProfileSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M1 18.572a17 17 0 1 0 34 0 17 17 0 0 0-34 0Z"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M22.53 15.51a4.535 4.535 0 1 1-9.07 0 4.535 4.535 0 0 1 9.07 0Z"
    />
    <Path
      stroke={color ?? '#3B3B3B'}
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M25.326 26.166a8.436 8.436 0 0 0-6.543-3.1h-1.566a8.436 8.436 0 0 0-6.543 3.1"
    />
  </Svg>
);
export default ProfileSvg;
