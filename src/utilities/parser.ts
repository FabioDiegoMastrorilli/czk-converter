export type Rate = {
  conversionRate: number,
  countryName: string,
  currencyId: string,
  currencySlug: string,
  quantity: number
}

export function parseRawRatesResponse(rawRatesResponse: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_useless, _rawHeaders, ...rawRatesDetails] = rawRatesResponse.split(/\r?\n/);

  const parsedData: Rate[] = rawRatesDetails.reduce((formattedDetails, rawRateDetails) => {
    if(!rawRateDetails.length) {
      return formattedDetails
    }

    const [countryName, currencySlug, rawQuantity, currencyId, rawConversionRate] = rawRateDetails.split('|');

    return [
      ...formattedDetails,
      {
        conversionRate: Number(rawConversionRate.replace(',', '.')),
        countryName,
        currencyId,
        currencySlug,
        quantity: Number(rawQuantity)
      }
    ]
  }, [] as Rate[]);

  return parsedData;
}