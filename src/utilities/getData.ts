import { parseRawRatesResponse } from "./parser";

export const ratesApiBaseURL =
  "/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt";

export function formatDateOrMonth(number: number) {
  return ("0" + number).slice(-2);
}

export function buildRatesApiURL(date: Date) {
  const url = new URL(ratesApiBaseURL, window.location.origin);

  url.searchParams.set(
    "date",
    `${formatDateOrMonth(date.getDate())}.${formatDateOrMonth(
      date.getMonth() + 1
    )}.${date.getFullYear()}`
  );

  return url.toString();
}

export default async function getData(selectedDate: Date) {
  const formattedURL = buildRatesApiURL(selectedDate);

  const response = await fetch(formattedURL);

  if (!response.ok) {
    const newError = await response.text();

    throw newError;
  }

  const rawRates = await response.text();

  return parseRawRatesResponse(rawRates);
}

export function getLastWeekDates() {
  const dates = [] as Date[];

  for (let dayCount = 0; dayCount < 7; dayCount++) {
    const newDate = new Date();

    newDate.setDate(newDate.getDate() - dayCount);

    dates.push(newDate);
  }

  return dates.reverse();
}

export type RawChartData = {
  labels: string[];
  allDatasets: {
    label: string;
    data: number[];
  }[];
};

export async function getChartData(): Promise<RawChartData | null> {
  const dates = getLastWeekDates();

  const labels = dates.map(
    (date) =>
      `${formatDateOrMonth(date.getDate())}/${formatDateOrMonth(
        date.getMonth() + 1
      )}/${date.getFullYear()}`
  );

  try {
    const partialDataset = new Map<string, number[]>();

    const allData = await Promise.all(
      dates.map(async (date) => {
        return await getData(date);
      })
    );

    allData.forEach((dateData) => {
      dateData.forEach((data) => {
        const prevValues = partialDataset.get(data.currencyId);

        partialDataset.set(data.currencyId, [
          ...(prevValues || []),
          1 / data.conversionRate,
        ]);
      });
    });

    return {
      labels,
      allDatasets: Array.from(partialDataset).map(([currencyId, data]) => ({
        label: currencyId,
        data,
      })),
    };
  } catch (error) {
    return null;
  }
}
