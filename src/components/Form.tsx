import { useContext, useState } from "react";
import { DEFAULT_INITIAL_CZK_AMOUNT } from "../utilities/constants";
import { Rate } from "../utilities/parser";
import StyledInput from "../style/components/Input.styled";
import StyledSelect from "../style/components/Select.styled";
import AppContext from "../AppContext";

function getConvertedValue(
  defaultCurrencyAmount: number,
  targetRate: Rate,
  inverse = false
) {
  const convertedValue = inverse
    ? defaultCurrencyAmount * targetRate.conversionRate
    : defaultCurrencyAmount / targetRate.conversionRate;

  return String(Math.round(convertedValue * 100) / 100);
}

type FormProps = {
  rates?: Rate[];
};

export default function Form({ rates = [] }: FormProps) {
  const [czkCurrencyInputValue, setCzkCurrencyInputValue] = useState<string>(
    String(DEFAULT_INITIAL_CZK_AMOUNT)
  );
  const [selectedCurrencyInputValue, setSelectedCurrencyInputValue] =
    useState<string>();

  const {selectedCurrency, setSelectedCurrency} = useContext(AppContext);

  function handleSelectChangeEvent({
    target: { value: currencyId },
  }: React.ChangeEvent<HTMLSelectElement>) {
    if (!currencyId) {
      setSelectedCurrency(null);

      setSelectedCurrencyInputValue("");
    } else {
      const found = rates.find((rate) => rate.currencyId === currencyId);

      setSelectedCurrency(found || null);

      setSelectedCurrencyInputValue(
        found ? getConvertedValue(Number(czkCurrencyInputValue), found) : ""
      );
    }
  }

  function handleInputChangeEvent(
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
    origin: "first" | "second"
  ) {
    if (origin === "first") {
      setCzkCurrencyInputValue(value);

      if (selectedCurrency) {
        setSelectedCurrencyInputValue(
          getConvertedValue(Number(value), selectedCurrency)
        );
      }
    } else {
      setSelectedCurrencyInputValue(value);

      if (selectedCurrency) {
        setCzkCurrencyInputValue(
          getConvertedValue(Number(value), selectedCurrency, true)
        );
      }
    }
  }

  return (
    <>
      <StyledInput
        aria-label="CZK amount"
        data-testid="czk-amount"
        onChange={(event) => handleInputChangeEvent(event, "first")}
        value={czkCurrencyInputValue}
        type="number"
        required
      />

      <StyledSelect
        aria-label="Selected currency"
        onChange={handleSelectChangeEvent}
        value={selectedCurrency?.currencyId || ""}
      >
        <option value=""></option>

        {rates.map((rate) => (
          <option key={rate.currencyId} value={rate.currencyId}>
            {`${rate.currencyId} (${rate.countryName})`}
          </option>
        ))}
      </StyledSelect>

      <StyledInput
        aria-label="Selected currency amount"
        data-testid="selected-currency-amount"
        disabled={!selectedCurrency}
        onChange={(event) => handleInputChangeEvent(event, "second")}
        value={selectedCurrencyInputValue}
        type="text"
      />
    </>
  );
}
