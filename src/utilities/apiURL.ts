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

export async function getData(selectedDate: Date) {
  const formattedURL = buildRatesApiURL(selectedDate);

  const response = await fetch(formattedURL);

  if (!response.ok) {
    const newError = await response.text();

    throw newError;
  }

  const rawRates = await response.text();

  return parseRawRatesResponse(rawRates);
}

function generateDatesArray(max = 7) {
  const dates = [];

  for(let dayCount = 0; dayCount < max; dayCount++) {
    const newDate = new Date();

    newDate.setDate(newDate.getDate() - dayCount);

    dates.push(newDate);
  }

  return dates.reverse()
}

export async function getDataset() {
  const dates = generateDatesArray()

  try {
    const dataset = await Promise.all(dates.map(getData));

    console.log(dataset);
    return dataset;
  } catch (error) {
   return [] 
  }
}