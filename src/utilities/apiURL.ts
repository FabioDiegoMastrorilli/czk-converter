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