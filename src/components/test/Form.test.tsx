import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import AppContext from "../../AppContext";
import defaultTheme from "../../style/defaultTheme";
import { DEFAULT_INITIAL_CZK_AMOUNT } from "../../utilities/constants";
import { Rate } from "../../utilities/parser";
import Form from "../Form";

const rates = [
  {
    conversionRate: 100,
    countryName: "Zanzibar",
    currencyId: "ZNZ",
    currencySlug: "crown",
    quantity: 1,
  },
  {
    conversionRate: 240,
    countryName: "Europe",
    currencyId: "EUR",
    currencySlug: "",
    quantity: 1,
  },
];

const FormWrapper = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Rate | null>(null);

  return (
    <AppContext.Provider value={{
      selectedCurrency,
      setSelectedCurrency
    }}>
      <ThemeProvider theme={defaultTheme}>
        <Form rates={rates} />
      </ThemeProvider>
    </AppContext.Provider>
  )
};

describe("Form", () => {
  afterEach(() => {
    cleanup();
  });

  it("must render", () => {
    const { baseElement } = render(<FormWrapper />);

    expect(baseElement).toBeInTheDocument();
  });

  it("must have the czk input value initially set to a default value", () => {
    render(<FormWrapper />);

    const czkAmountInput: HTMLInputElement = screen.getByTestId("czk-amount");

    expect(Number(czkAmountInput.value)).toBe(DEFAULT_INITIAL_CZK_AMOUNT);
  });

  it("must have the currencies select box initially unset", () => {
    render(<FormWrapper />);

    const currencySelect: HTMLSelectElement = screen.getByRole("combobox");

    expect(currencySelect.value).toBe("");
  });

  it("must have the second input disabled when no currencies are selected", () => {
    render(<FormWrapper />);

    const selectedCurrencyAmountInput: HTMLInputElement = screen.getByTestId(
      "selected-currency-amount"
    );

    expect(selectedCurrencyAmountInput.disabled).toBe(true);
  });

  it("must enable the second input when a currency is selected", () => {
    render(<FormWrapper />);

    const selectedCurrencyAmountInput: HTMLInputElement = screen.getByTestId(
      "selected-currency-amount"
    );
    const currencySelect: HTMLSelectElement = screen.getByRole("combobox");

    fireEvent.change(currencySelect, { target: { value: "EUR" } });

    expect(selectedCurrencyAmountInput.disabled).toBe(false);
  });

  describe("conversion", () => {
    it("must convert the given value", () => {
      render(<FormWrapper />);

      const selectedCurrencyAmountInput: HTMLInputElement = screen.getByTestId(
        "selected-currency-amount"
      );
      const currencySelect: HTMLSelectElement = screen.getByRole("combobox");

      fireEvent.change(currencySelect, { target: { value: "EUR" } });

      expect(selectedCurrencyAmountInput.value).toBe("0.42");
    });

    it("must convert the given value (2)", () => {
      render(<FormWrapper />);

      const selectedCurrencyAmountInput: HTMLInputElement = screen.getByTestId(
        "selected-currency-amount"
      );
      const currencySelect: HTMLSelectElement = screen.getByRole("combobox");

      fireEvent.change(currencySelect, { target: { value: "ZNZ" } });

      expect(selectedCurrencyAmountInput.value).toBe("1");
    });

    it("must convert czeck crowns when a user updates the second input", () => {
      render(<FormWrapper />);

      const czkAmountInput: HTMLInputElement = screen.getByTestId("czk-amount");
      const selectedCurrencyAmountInput: HTMLInputElement = screen.getByTestId(
        "selected-currency-amount"
      );
      const currencySelect: HTMLSelectElement = screen.getByRole("combobox");

      fireEvent.change(currencySelect, { target: { value: "EUR" } });
      fireEvent.change(selectedCurrencyAmountInput, {
        target: { value: "100" },
      });

      expect(czkAmountInput.value).toBe("24000");
    });
  });
});
