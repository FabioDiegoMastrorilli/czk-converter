import { createContext } from "react";
import { RawChartData } from "./utilities/getData";
import { Rate } from "./utilities/parser";

type Context = {
  chartData: RawChartData | null;
  selectedCurrency: Rate | null;
  setSelectedCurrency: (value: Rate | null) => void;
};

export default createContext<Context>({
  chartData: null,
  selectedCurrency: null,
  setSelectedCurrency: () => {},
});
