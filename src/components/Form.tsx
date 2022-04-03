import { useCallback, useContext, useEffect, useState } from "react";
import {
  DEFAULT_INITIAL_CZK_AMOUNT,
  DEFAULT_SELECTED_CURRENCY_ID,
} from "../utilities/constants";
import { Rate } from "../utilities/parser";
import StyledInput from "../style/components/Input.styled";
import StyledLabel from "../style/components/Label.styled";
import StyledSelect from "../style/components/Select.styled";
import AppContext from "../AppContext";
import InputGroup from "../style/components/InputGroup.styled";

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

export default function ConversionForm({ rates = [] }: FormProps) {
  const [czkCurrencyInputValue, setCzkCurrencyInputValue] = useState<string>(
    String(DEFAULT_INITIAL_CZK_AMOUNT)
  );
  const [selectedCurrencyInputValue, setSelectedCurrencyInputValue] =
    useState<string>("");

  const { selectedCurrency, setSelectedCurrency } = useContext(AppContext);

  const onCurrencyChanged = useCallback(
    (currencyId: string) => {
      const found = rates.find((rate) => rate.currencyId === currencyId);

      setSelectedCurrency(found || null);

      setSelectedCurrencyInputValue(
        found ? getConvertedValue(Number(czkCurrencyInputValue), found) : ""
      );
    },
    [czkCurrencyInputValue, rates, setSelectedCurrency]
  );

  useEffect(() => {
    if (!selectedCurrency) {
      onCurrencyChanged(DEFAULT_SELECTED_CURRENCY_ID);
    }
  }, [selectedCurrency, onCurrencyChanged]);

  function handleSelectChangeEvent({
    target: { value: currencyId },
  }: React.ChangeEvent<HTMLSelectElement>) {
    onCurrencyChanged(currencyId);
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
      <InputGroup bottomSpace>
        <StyledLabel htmlFor="czk-amount">CZK Amount:</StyledLabel>

        <StyledInput
          id="czk-amount"
          data-testid="czk-amount"
          onChange={(event) => handleInputChangeEvent(event, "first")}
          value={czkCurrencyInputValue}
          type="number"
          required
        />
      </InputGroup>

      <InputGroup bottomSpace>
        <StyledLabel htmlFor="selected-currency">
          Selected Currency:
        </StyledLabel>

        <StyledSelect
          id="selected-currency"
          onChange={handleSelectChangeEvent}
          value={selectedCurrency?.currencyId || ""}
        >
          <option disabled value=""></option>

          {rates.map((rate) => (
            <option key={rate.currencyId} value={rate.currencyId}>
              {`${rate.currencyId} (${rate.countryName})`}
            </option>
          ))}
        </StyledSelect>
      </InputGroup>

      <InputGroup>
        <StyledLabel htmlFor="selected-currency-amount">
          Selected Currency Amount:
        </StyledLabel>

        <StyledInput
          id="selected-currency-amount"
          data-testid="selected-currency-amount"
          disabled={!selectedCurrency}
          onChange={(event) => handleInputChangeEvent(event, "second")}
          value={selectedCurrencyInputValue}
          type="text"
        />
      </InputGroup>
    </>
  );
}
