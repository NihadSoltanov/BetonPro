import * as React from 'react';
import Svg, {Defs, LinearGradient, Stop, G, Path} from 'react-native-svg';

const ProductSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={39}
    height={40}
    data-name="Group 1388"
    viewBox="0 0 46 28"
    {...props}
  >
    <Defs>
      <LinearGradient
        id="a"
        x1={0.507}
        x2={0.499}
        y1={1.021}
        y2={0.413}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#005e2f" />
        <Stop offset={1} stopColor="#017a40" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={0.133}
        x2={0.897}
        y1={0.946}
        y2={0.017}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#008040" />
        <Stop offset={1} stopColor="#019b51" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={0.384}
        x2={0.631}
        y1={0.887}
        y2={0.065}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#009c4e" />
        <Stop offset={1} stopColor="#02c45f" />
      </LinearGradient>
    </Defs>
    <G data-name="Group 1387">
      <Path
        fill="url(#a)"
        d="M2775.974-2178.735v2.985l-23.291-13.448v-2.985Z"
        data-name="Path 1000"
        transform="translate(-2752.681 2205.632)"
      />
      <Path
        fill="url(#b)"
        d="M3019.647-2192.184v2.985l-23.29 13.448v-2.985Z"
        data-name="Path 1001"
        transform="translate(-2973.065 2205.632)"
      />
      <Path
        fill="url(#c)"
        d="m2775.973-2332.874 23.292 13.448-23.292 13.448-23.291-13.448Z"
        data-name="Path 1002"
        transform="translate(-2752.681 2332.874)"
      />
    </G>
  </Svg>
);
export default ProductSvg;
