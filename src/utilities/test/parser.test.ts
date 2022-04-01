import { parseRawRatesResponse, Rate } from "../parser";

const textResponseExample = `30.03.2022 #63
země|měna|množství|kód|kurz
Austrálie|dolar|1|AUD|16,518
Brazílie|real|1|BRL|4,635
Bulharsko|lev|1|BGN|12,506
Čína|žen-min-pi|1|CNY|3,462

`;

describe("parseRawRatesResponse", () => {
  it("must return an array of Rates", () => {
    const rates: Rate[] = parseRawRatesResponse(textResponseExample);

    expect(rates).toBeTruthy();
  });

  it("must return the expected quantity of rates", () => {
    const rates = parseRawRatesResponse(textResponseExample);

    expect(rates).toHaveLength(4);
  });

  it("must convert the convertionRate to a valid number", () => {
    const { conversionRate } = parseRawRatesResponse(textResponseExample)[0];

    expect(conversionRate).toBe(16.518);
  });

  it("must return coherent data", () => {
    const [firstRateDetails] = parseRawRatesResponse(textResponseExample);

    expect(firstRateDetails).toStrictEqual({
      conversionRate: 16.518,
      countryName: "Austrálie",
      currencyId: "AUD",
      currencySlug: "dolar",
      quantity: 1,
    });
  });
});
