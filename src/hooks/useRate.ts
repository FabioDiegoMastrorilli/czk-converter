import { useEffect, useState } from "react";
import { buildRatesApiURL } from "../utilities/apiURL";
import { parseRawRatesResponse, Rate } from "../utilities/parser";

export default function useRate(selectedDate: Date) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rates, setRates] = useState<Rate[] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setRates(null);

    const formattedURL = buildRatesApiURL(selectedDate);

    fetch(formattedURL).then(async (response) => {
      if (!response.ok) {
        const newError = await response.text();

        setError(newError);
      } else {
        const rawRates = await response.text();

        setRates(parseRawRatesResponse(rawRates));
      }

      setIsLoading(false);
    });
  }, [selectedDate]);

  return {
    error,
    isLoading,
    rates,
  };
}
