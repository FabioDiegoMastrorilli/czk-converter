export type Rate = {
  conversionRate: number;
  countryName: string;
  currencyId: string;
  currencySlug: string;
  quantity: number;
};

export function sortRates(rates: Rate[]) {
  return rates.sort((firstRate, secondRate) =>
    firstRate.currencyId > secondRate.currencyId ? 1 : -1
  );
}

export function parseRawRatesResponse(rawRatesResponse: string) {
  const rawRatesDetails = rawRatesResponse.split(/\r?\n/);

  rawRatesDetails.splice(0, 2);

  const parsedData: Rate[] = rawRatesDetails.reduce(
    (formattedDetails, rawRateDetails) => {
      if (!rawRateDetails.length) {
        return formattedDetails;
      }

      const [
        countryName,
        currencySlug,
        rawQuantity,
        currencyId,
        rawConversionRate,
      ] = rawRateDetails.split("|");

      const quantity = Number(rawQuantity);

      return [
        ...formattedDetails,
        {
          conversionRate:
            Number(rawConversionRate.replace(",", ".")) / quantity,
          countryName,
          currencyId,
          currencySlug,
          quantity,
        },
      ];
    },
    [] as Rate[]
  );

  const sortedData = sortRates(parsedData);

  return sortedData;
}
