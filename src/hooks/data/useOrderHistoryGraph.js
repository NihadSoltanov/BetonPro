import { useMemo } from 'react';

export const useOrderHistoryGraph = (orders, startDate) => {
  return useMemo(() => {
    if (!orders || orders.length === 0) {
      return {
        branchGraph: [],
        isLoadingGraph: false,
      };
    }

    try {
      // orders içinden loadingChartJson geliyor
      const backendData = orders[0]?.loadingChartJson ?? [];

      if (!Array.isArray(backendData)) {
        return { branchGraph: [], isLoadingGraph: false };
      }

      const branchGraph = [];

      backendData.forEach(day => {
        day.rows.forEach(row => {
          const entry = {
            label: row.hour.toString(),
            date: day.date,
          };

          Object.entries(row.branches).forEach(([branchName, values]) => {
            entry[branchName] = values.quantity_per_hour; // sadece per_hour gösteriyoruz
          });

          branchGraph.push(entry);
        });
      });

      return {
        branchGraph,
        isLoadingGraph: false,
      };
    } catch (e) {
      console.log("Graph parse error:", e);
      return { branchGraph: [], isLoadingGraph: false };
    }
  }, [orders, startDate]);
};
