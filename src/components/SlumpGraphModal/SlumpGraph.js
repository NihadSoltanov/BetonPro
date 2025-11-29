import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function SlumpGraph({ data, deliveryTime }) {
  if (!data || data.length === 0)
    return <Text>No data...</Text>;

  const labels = data.map(p => p.time.toString());
  const values = data.map(p => p.slump);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
        Slump Graph (Delivery time: {deliveryTime} min)
      </Text>

      <LineChart
        data={{
          labels,
          datasets: [{ data: values }]
        }}
        width={screenWidth - 60}
        height={260}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: () => "#ff7f00",
          strokeWidth: 2
        }}
        bezier
        style={{
          borderRadius: 12
        }}
      />
    </View>
  );
}
