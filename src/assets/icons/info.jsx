import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const InfoSvg = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <G opacity={0.998}>
      <Path
        stroke={color ?? '#3B3B3B'}
        d="M9 17.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z"
      />
      <Path
        fill={color ?? '#3B3B3B'}
        d="M8.54 14V8.52h.91V14h-.91Zm.47-6.37a.61.61 0 0 1-.62-.62.61.61 0 1 1 1.22 0c0 .35-.27.62-.6.62Z"
      />
    </G>
  </Svg>
);
export default InfoSvg;
