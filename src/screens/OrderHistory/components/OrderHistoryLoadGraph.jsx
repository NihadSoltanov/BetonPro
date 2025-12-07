import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { SPACING } from '../../../styles/theme';

const COLOR_PALETTE = [
  '#2e7d32',
  '#f9a825',
  '#1565c0',
  '#d84315',
  '#6a1b9a',
  '#00838f',
  '#c0ca33',
];

const OrderHistoryLoadGraph = ({ branchGraph = [], isLoading }) => {
  if (isLoading) {
    return (
      <View style={{ padding: SPACING.lg }}>
        <Text style={{ color: '#555' }}>Loading graph...</Text>
      </View>
    );
  }

  if (!branchGraph || branchGraph.length === 0) {
    return (
      <View style={{ padding: SPACING.lg }}>
        <Text style={{ color: '#555' }}>No load data</Text>
      </View>
    );
  }

  // 🔹 UNIQUE branch names
  const branchNames = Object.keys(branchGraph[0]).filter(
    k => k !== 'label' && k !== 'date'
  );

  // 🔹 Assign colors dynamically
  const colors = {};
  branchNames.forEach((b, i) => {
    colors[b] = COLOR_PALETTE[i % COLOR_PALETTE.length];
  });

  // 🔹 Convert data for gifted-charts
  const datasets = branchNames.map(branch => ({
    label: branch,
    data: branchGraph.map(item => ({
      value: Number(item[branch]),
      label: item.label,
    })),
    color: colors[branch],
  }));

  return (
    <View
      style={{
        marginHorizontal: SPACING.md,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 18,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 16, marginBottom: 12 }}>Load graph</Text>

      <LineChart
        data={datasets.map(d => d.data)}
        dataSetConfig={datasets.map(d => ({ color: d.color }))}
        height={240}
        spacing={40}
        initialSpacing={30}
        thickness={3}
        curved={false}
        hideRules={false}
        hideDataPoints={false}
        dataPointsWidth={6}
        dataPointsHeight={6}
        dataPointsColor="#000"
        yAxisColor="#999"
        xAxisColor="#999"
        yAxisSide="left"
      />

      {/* Legend */}
      <View style={{ marginTop: 10 }}>
        {datasets.map((d, i) => (
          <View
            key={i}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
          >
            <View
              style={{
                width: 14,
                height: 14,
                backgroundColor: d.color,
                borderRadius: 3,
              }}
            />
            <Text style={{ marginLeft: 6 }}>{d.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryLoadGraph;
