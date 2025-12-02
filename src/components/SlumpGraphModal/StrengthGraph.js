import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function StrengthGraph({ data, f28 }) {
  if (!data || data.length === 0) {
    return <Text>No data...</Text>;
  }

  // backend → [{ time_h, strength_mpa }]
  const labels = data.map(p => p.time_h.toString());
  const values = data.map(p => p.strength_mpa);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 6 }}>
        Strength development (MPa)
      </Text>

      {typeof f28 === "number" && (
        <Text style={{ marginBottom: 8 }}>
          28 days strength (f28): {f28.toFixed(1)} MPa
        </Text>
      )}

      <LineChart
        data={{
          labels,
          datasets: [{ data: values }],
        }}
        width={screenWidth - 60}
        height={260}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: () => "#0066cc",
          strokeWidth: 2,
        }}
        bezier
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}
