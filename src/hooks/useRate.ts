import { useEffect, useState } from "react";
import { getData } from "../utilities/apiURL";
import { Rate } from "../utilities/parser";

export default function useRate(selectedDate: Date) {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [rates, setRates] = useState<Rate[]>();

  useEffect(() => {
    setLoading(true);

    getData(selectedDate)
      .then((rates) => {
        setRates(rates);
        setFailed(false);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
        setRates(undefined);
        setLoading(false);
      });
  }, [selectedDate]);

  return {
    failed,
    loading,
    rates,
  };
}
