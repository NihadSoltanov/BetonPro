import React, {useMemo, useState} from 'react';
import {Dimensions, View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {Box, Loader} from '../../../../components';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';
import styles from './HistoryAmountGraph.styles';
import {useGraphsData} from '../../../../hooks/data/useGraphsData';

const HistoryAmountGraph = () => {
  const [graphWidth, setGraphWidth] = useState(null);
  const {graphData, isLoadingGraphData} = useGraphsData();

  const maxValue = useMemo(() => {
    if (!graphData?.bars) return {value: 0};
    return graphData.bars.reduce((a, b) => (a.value > b.value ? a : b));
  }, [graphData]);

  const graphScale = useMemo(() => {
    const deviceWidth = Dimensions.get('window').width;
    if (deviceWidth < 375) return 1;
    if (deviceWidth < 500) return 1.3;
    return 2.5;
  }, []);

  return (
    <View style={{marginLeft: SPACING.md, marginRight: SPACING.md}}>
        {isLoadingGraphData && (
          <View style={styles.loadingContainer}>
            <Loader size="large" />
          </View>
        )}
        {!isLoadingGraphData && !graphData && (
          <></>
        )}
        {!isLoadingGraphData && graphData && (
      <Box
        style={{
          marginBottom: SPACING.md,
          paddingHorizontal: SPACING.xs,
        }}
      >
          <View
            onLayout={(event) => {
              const {width} = event.nativeEvent.layout;
              setGraphWidth(width - SPACING.md * 2);
            }}
          >
            <BarChart
              noOfSections={5}
              maxValue={maxValue.value > 0 ? maxValue.value : 10}
              frontColor={COLORS.secondary}
              data={graphData?.bars ?? []}
              yAxisThickness={1}
              yAxisColor={COLORS.lightGrey}
              xAxisThickness={0}
              isAnimated
              barWidth={10 * graphScale}
              lineData={graphData?.line ?? []}
              lineConfig={{
                color: COLORS.primary,
                thickness: 3,
                curved: true,
                hideDataPoints: true,
                shiftY: 2,
                isAnimated: true,
              }}
              showLine
              xAxisLabelTextStyle={{
                fontSize: FONT_SIZE.text.xs,
                color: COLORS.primary,
                fontFamily: FONTS.regular,
              }}
              yAxisTextStyle={{
                fontSize: FONT_SIZE.text.xs,
                color: COLORS.primary,
                fontFamily: FONTS.regular,
              }}
              width={graphWidth}
              initialSpacing={10 * graphScale}
              spacing={10 * graphScale}
              dashGap={0}
            />
          </View>
      </Box>
      )}
    </View>
  );
};

export {HistoryAmountGraph};
