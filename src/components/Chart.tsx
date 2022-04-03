import { useContext, useRef } from "react";
import AppContext from "../AppContext";
import { useTheme } from "styled-components";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export default function Chart() {
  const { chartData, selectedCurrency } = useContext(AppContext);
  const wrapperRef = useRef(null);
  const theme = useTheme();

  const selectedCurrencyDatasets = chartData?.allDatasets.find(
    (dataset) => dataset.label === selectedCurrency?.currencyId
  );

  ChartJS.defaults.color = theme.colors.text[2];
  ChartJS.defaults.borderColor = theme.colors.border;

  return (
    <div className="grid-chart" ref={wrapperRef}>
      {selectedCurrency && chartData && (
        <Line
          options={{
            layout: {
              padding: { left: 10, bottom: 10, right: 25 },
            },
            responsive: true,
            maintainAspectRatio: false,
            color: theme.colors.highlight,
            backgroundColor: theme.colors.background,
            plugins: {
              tooltip: {
                backgroundColor: theme.colors.backgroundFocus,
                titleColor: theme.colors.highlight,
              },
            },
          }}
          data={{
            labels: chartData.labels,
            datasets: selectedCurrencyDatasets
              ? [
                  {
                    ...selectedCurrencyDatasets,
                    borderColor: theme.colors.highlight,
                  },
                ]
              : [],
          }}
        />
      )}
    </div>
  );
}
