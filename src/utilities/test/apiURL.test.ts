import { buildRatesApiURL, formatDateOrMonth } from "../apiURL";

describe("formatDateOrMonth", () => {
  it("must return a 2 characters string that starts with '0' when the first arg is < 10", () => {
    expect(formatDateOrMonth(2)).toBe("02");
  });

  it("must return a 2 characters string when the first arg is >= 10 (2)", () => {
    expect(formatDateOrMonth(11)).toBe("11");
  });
});

describe("buildRatesApiURL", () => {
  it("must return a valid URL", () => {
    const stringURL = buildRatesApiURL(new Date());

    expect(new URL(stringURL)).toBeTruthy();
  });

  it("must return a URL with valid SearchParams", () => {
    const stringURL = buildRatesApiURL(new Date("01-02-2022"));

    const formattedURL = new URL(stringURL);

    expect(formattedURL.searchParams.get("date")).toBe("02.01.2022");
  });

  it("must return a URL with valid SearchParams (2)", () => {
    const stringURL = buildRatesApiURL(new Date("01-31-2001"));

    const formattedURL = new URL(stringURL);

    expect(formattedURL.searchParams.get("date")).toBe("31.01.2001");
  });
});
